import os
import time
import requests
from worker_app.celery_app import app
from worker_app.services.image_quality import check_blur
from worker_app.services.masking_engine import mask_aadhaar
from worker_app.db.repository import update_kyc_status, process_kyc_files, get_file_repository_path

def notify_backend(user_uuid, status, reason=""):
    """Helper to send webhook back to Node.js API"""
    try:
        # Calling the Node.js Webhook
        requests.post(
            'http://127.0.0.1:3000/kyc/webhook', 
            json={"uuid": user_uuid, "status": status, "reason": reason},
            timeout=5
        )
    except Exception as e:
        print(f"[{user_uuid}] Failed to notify backend webhook: {e}")

@app.task(name='tasks.process_kyc_documents')
def process_kyc_documents(user_uuid, identity_proof_type, front_image_path, back_image_path=None, pan_image_path=None):
    # Main Celery task triggered by Node.js to process KYC documents async
    print(f"[{user_uuid}] Started processing KYC documents...")
    
    time.sleep(1)
    
    # 1. Quality Check for Front Image
    if not check_blur(front_image_path):
        err = "Identity proof front image failed quality checks (blurry or bad exposure)."
        process_kyc_files(user_uuid, False)
        update_kyc_status(user_uuid, "REJECTED", err)
        notify_backend(user_uuid, "REJECTED", err)
        return {"status": "REJECTED", "reason": err}
        
    # 2. Quality Check for Back Image (if provided)
    if back_image_path and not check_blur(back_image_path):
        err = "Identity proof back image failed quality checks (blurry or bad exposure)."
        process_kyc_files(user_uuid, False)
        update_kyc_status(user_uuid, "REJECTED", err)
        notify_backend(user_uuid, "REJECTED", err)
        return {"status": "REJECTED", "reason": err}
        
    # 3. Quality Check for PAN Image (if provided)
    if pan_image_path and not check_blur(pan_image_path):
        err = "PAN card image failed quality checks (blurry or bad exposure)."
        process_kyc_files(user_uuid, False)
        update_kyc_status(user_uuid, "REJECTED", err)
        notify_backend(user_uuid, "REJECTED", err)
        return {"status": "REJECTED", "reason": err}

    # 4. Masking (Only if the document is Aadhaar)
    if identity_proof_type == "Aadhar Card" or identity_proof_type == "Aadhaar Card":
        success, err = mask_aadhaar(front_image_path)
        if not success:
            process_kyc_files(user_uuid, False)
            update_kyc_status(user_uuid, "REJECTED", err)
            notify_backend(user_uuid, "REJECTED", err)
            return {"status": "REJECTED", "reason": err}
            
    # 5. Finalize and Move Files to Permanent Storage
    move_success = process_kyc_files(user_uuid, True)
    if not move_success:
        err = "Failed to move files to permanent storage."
        update_kyc_status(user_uuid, "REJECTED", err)
        notify_backend(user_uuid, "REJECTED", err)
        return {"status": "REJECTED", "reason": err}
    
    # Calculate new paths in the UserKYC folder
    user_kyc_base = get_file_repository_path('KYC')
    final_user_folder = os.path.join(user_kyc_base, user_uuid) if user_kyc_base else ""
    
    new_front_path = os.path.join(final_user_folder, os.path.basename(front_image_path)) if front_image_path else None
    new_back_path = os.path.join(final_user_folder, os.path.basename(back_image_path)) if back_image_path else None
    new_pan_path = os.path.join(final_user_folder, os.path.basename(pan_image_path)) if pan_image_path else None

    # 6. Update Database Status to Approved with the new permanent paths
    update_kyc_status(user_uuid, "APPROVED", "Documents processed successfully.", new_front_path, new_back_path, new_pan_path)
    notify_backend(user_uuid, "APPROVED", "Documents processed successfully.")
    
    print(f"[{user_uuid}] Finished processing KYC documents.")
    
    return {"status": "APPROVED"}
