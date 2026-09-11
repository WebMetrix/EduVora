import os
import time
import requests
from worker_app.celery_app import app
from worker_app.services.image_quality import check_blur
from worker_app.services.masking_engine import mask_aadhaar
from worker_app.db.repository import update_kyc_status, process_kyc_files, get_file_repository_path

def notify_backend(user_uuid, status_id, reason=""):
    """Helper to send webhook back to Node.js API. status_id: 2 (Verified), 3 (Rejected)"""
    try:
        webhook_url = os.getenv('BACKEND_WEBHOOK_URL')
        if not webhook_url:
            raise ValueError("BACKEND_WEBHOOK_URL is not set in .env file.")
            
        requests.post(
            webhook_url, 
            json={"uuid": user_uuid, "status": status_id, "reasonId": reason},
            timeout=5
        )
    except Exception as e:
        print(f"[{user_uuid}] Failed to notify backend webhook: {e}")

@app.task(name='tasks.process_kyc_documents')
def process_kyc_documents(user_uuid, identity_type_id, front_image_path, back_image_path=None, pan_image_path=None):
    # Main Celery task triggered by Node.js to process KYC documents async
    print(f"[{user_uuid}] Started processing KYC documents...")
    
    time.sleep(1)
    
    # 1. Quality Check for Front Image
    if not check_blur(front_image_path):
        err_id = 1
        process_kyc_files(user_uuid, False, front_image_path)
        update_kyc_status(user_uuid, 3, err_id)
        notify_backend(user_uuid, 3, err_id)
        return {"status": 3, "reasonId": err_id}
        
    # 2. Quality Check for Back Image (if provided)
    if back_image_path and not check_blur(back_image_path):
        err_id = 2
        process_kyc_files(user_uuid, False, front_image_path)
        update_kyc_status(user_uuid, 3, err_id)
        notify_backend(user_uuid, 3, err_id)
        return {"status": 3, "reasonId": err_id}
        
    # 3. Quality Check for PAN Image (if provided)
    if pan_image_path and not check_blur(pan_image_path):
        err_id = 3
        process_kyc_files(user_uuid, False, front_image_path)
        update_kyc_status(user_uuid, 3, err_id)
        notify_backend(user_uuid, 3, err_id)
        return {"status": 3, "reasonId": err_id}

    # 4. Masking (Only if the document is Aadhaar)
    if identity_type_id == 1:
        success, err_id = mask_aadhaar(front_image_path)
        if not success:
            process_kyc_files(user_uuid, False, front_image_path)
            update_kyc_status(user_uuid, 3, err_id)
            notify_backend(user_uuid, 3, err_id)
            return {"status": 3, "reasonId": err_id}
            
    # 5. Finalize and Move Files to Permanent Storage
    move_success = process_kyc_files(user_uuid, True, front_image_path)
    if not move_success:
        err_id = 5
        update_kyc_status(user_uuid, 3, err_id)
        notify_backend(user_uuid, 3, err_id)
        return {"status": 3, "reasonId": err_id}
    
    # Calculate new paths in the UserKYC folder
    user_kyc_base = get_file_repository_path('KYC')
    final_user_folder = os.path.join(user_kyc_base, user_uuid) if user_kyc_base else ""
    
    new_front_path = os.path.join(final_user_folder, os.path.basename(front_image_path)) if front_image_path else None
    new_back_path = os.path.join(final_user_folder, os.path.basename(back_image_path)) if back_image_path else None
    new_pan_path = os.path.join(final_user_folder, os.path.basename(pan_image_path)) if pan_image_path else None

    # 6. Update Database Status to Approved (2) with the new permanent paths
    update_kyc_status(user_uuid, 2, None, new_front_path, new_back_path, new_pan_path)
    notify_backend(user_uuid, 2, None)
    
    print(f"[{user_uuid}] Finished processing KYC documents.")
    
    return {"status": 2}
