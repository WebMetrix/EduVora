import os
import shutil
from sqlalchemy import text
from worker_app.config import engine

def get_file_repository_path(document_type):
    """Fetches the repository path from the database using the stored procedure."""
    try:
        with engine.connect() as conn:
            result = conn.execute(text("EXEC dbo.EV_GetFileRepositoryPath @DocumentType=:doc_type"), {"doc_type": document_type})
            row = result.fetchone()
            if row:
                return row.path
            return None
    except Exception as e:
        print(f"Error fetching repository path for {document_type}: {e}")
        return None

def process_kyc_files(user_uuid, is_passed):
    """
    If passed, moves files from TempKYC to UserKYC.
    If failed, deletes the TempKYC folder.
    """
    temp_kyc_base = get_file_repository_path('TempKYC')
    user_kyc_base = get_file_repository_path('KYC')
    
    if not temp_kyc_base or not user_kyc_base:
        print("Error: Could not retrieve repository paths from DB.")
        return False
        
    temp_user_folder = os.path.join(temp_kyc_base, user_uuid)
    final_user_folder = os.path.join(user_kyc_base, user_uuid)
    
    if not os.path.exists(temp_user_folder):
        print(f"No TempKYC folder found for user {user_uuid} at {temp_user_folder}")
        return False

    if is_passed:
        try:
            # Move files from TempKYC to UserKYC
            os.makedirs(final_user_folder, exist_ok=True)
                
            for filename in os.listdir(temp_user_folder):
                source_file = os.path.join(temp_user_folder, filename)
                dest_file = os.path.join(final_user_folder, filename)
                
                if os.path.exists(dest_file):
                    os.remove(dest_file)
                    
                shutil.move(source_file, dest_file)
                
            shutil.rmtree(temp_user_folder)
            print(f"Successfully moved KYC documents for user {user_uuid} to {final_user_folder}")
            return True
        except Exception as e:
            print(f"Error moving files for user {user_uuid}: {e}")
            return False
    else:
        # Validation failed, delete the temp documents
        try:
            shutil.rmtree(temp_user_folder)
            print(f"Deleted TempKYC documents for user {user_uuid} due to failed validation.")
            return True
        except Exception as e:
            print(f"Error deleting temp files for user {user_uuid}: {e}")
            return False

def update_kyc_status(user_uuid, status, message=None, front_path=None, back_path=None, pan_path=None):
    # Update the KYC status in the database and optionally update file paths
    # status should be 'APPROVED' or 'REJECTED'
    print(f"Updating DB for {user_uuid}: STATUS={status}, MESSAGE={message}")
    
    try:
        with engine.begin() as conn:
            # 1: Pending, 2: Verified, 3: Rejected
            status_id = 2 if status.upper() == 'APPROVED' else 3
            
            query = text("""
                EXEC dbo.EV_ManageUserKYC 
                    @Action='UPDATE_STATUS', 
                    @UUID=:uuid, 
                    @KYCStatusId=:status_id, 
                    @RejectionReason=:msg,
                    @IdentityProofFrontPath=:front_path,
                    @IdentityProofBackPath=:back_path,
                    @PanCardPath=:pan_path
            """)
            
            conn.execute(query, {
                "uuid": user_uuid, 
                "status_id": status_id, 
                "msg": message,
                "front_path": front_path,
                "back_path": back_path,
                "pan_path": pan_path
            })
            print(f"Updated KYC status for user {user_uuid} to {status} (Status ID: {status_id}).")
    except Exception as e:
        print(f"Error updating KYC status for {user_uuid}: {e}")
