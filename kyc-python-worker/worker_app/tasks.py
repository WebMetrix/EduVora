import time
from worker_app.celery_app import app
from worker_app.services.image_quality import check_blur
from worker_app.services.masking_engine import mask_aadhaar
from worker_app.db.repository import update_kyc_status

@app.task(name='tasks.process_kyc_documents')
def process_kyc_documents(user_uuid, identity_proof_type, front_image_path, back_image_path=None, pan_image_path=None):
    """
    Main Celery task triggered by Node.js to process KYC documents async.
    """
    print(f"[{user_uuid}] Started processing KYC documents...")
    
    # Simulate processing time or loading resources
    time.sleep(1)
    
    # 1. Quality Check (Blur Detection)
    if not check_blur(front_image_path):
        err = "Identity proof front image is too blurry."
        update_kyc_status(user_uuid, "REJECTED", err)
        return {"status": "REJECTED", "reason": err}
        
    if pan_image_path and not check_blur(pan_image_path):
        err = "PAN card image is too blurry."
        update_kyc_status(user_uuid, "REJECTED", err)
        return {"status": "REJECTED", "reason": err}

    # 2. Masking (if Aadhaar)
    if identity_proof_type == "Aadhar Card":
        success, err = mask_aadhaar(front_image_path)
        if not success:
            update_kyc_status(user_uuid, "REJECTED", err)
            return {"status": "REJECTED", "reason": err}
            
    # 3. Finalize
    # TODO: Encryption and uploading to secure blob storage can happen here.
    
    update_kyc_status(user_uuid, "APPROVED", "Documents processed successfully.")
    print(f"[{user_uuid}] Finished processing KYC documents.")
    
    return {"status": "APPROVED"}
