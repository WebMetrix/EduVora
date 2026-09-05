import cv2
import pytesseract
import re
import os
from worker_app.utils.logger import logger

def mask_aadhaar(image_path):
    """
    OCR (Tesseract) and black-out masking for Aadhaar.
    Returns (True, None) if successful, (False, error_msg) if it fails.
    """
    logger.info(f"Masking Aadhaar card at {image_path}")
    
    if not os.path.exists(image_path):
        logger.error(f"File does not exist: {image_path}")
        return False, "File does not exist."

    img = cv2.imread(image_path)
    if img is None:
        logger.error(f"Failed to load image for masking: {image_path}")
        return False, "Failed to load image."

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 1. Find and Mask QR Code using OpenCV
    qr_detector = cv2.QRCodeDetector()
    retval, decoded_info, points, straight_qrcode = qr_detector.detectAndDecodeMulti(img)
    if retval and points is not None:
        for qr_points in points:
            pts = qr_points.astype(int)
            cv2.fillPoly(img, [pts], (0, 0, 0))
            logger.info("QR code detected and successfully masked.")
    else:
        logger.info("No QR code detected to mask.")

    # 2. OCR text to find 4-digit groups
    try:
        data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)
    except Exception as e:
        logger.error(f"Tesseract Error during masking: {e}")
        return False, "OCR Engine failed to initialize. Please check Tesseract configuration."

    n_boxes = len(data['text'])
    digit_groups_found = 0
    masked_groups = 0

    for i in range(n_boxes):
        word = data['text'][i].strip()
        
        # Look for exactly 4 digits without letters
        if re.fullmatch(r'\d{4}', word):
            digit_groups_found += 1
            
            # Mask only the first 2 groups (8 digits)
            if masked_groups < 2:
                x, y = data['left'][i], data['top'][i]
                w, h = data['width'][i], data['height'][i]
                # Draw black rectangle to mask
                cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 0), -1)
                masked_groups += 1

    # 3. Validation: If < 2 groups found, OCR failed to read
    if digit_groups_found < 2:
        logger.warning(f"Aadhaar scan failed for {image_path}: Found {digit_groups_found} digit groups.")
        return False, "We could not clearly read your Aadhaar card. Please upload a clearer, un-skewed, well-lit photo of your Aadhaar card and try again."

    # 4. Save the masked image, overwriting the original temp image
    cv2.imwrite(image_path, img)
    logger.info(f"Successfully masked Aadhaar card and saved to {image_path}")
    
    return True, None
