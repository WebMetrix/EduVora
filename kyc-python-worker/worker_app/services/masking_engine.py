import cv2
import pytesseract
import re
import os
import json
from worker_app.utils.logger import logger

RULES_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'services', 'rules.json')

def load_masking_rules():
    try:
        with open(RULES_PATH, 'r') as f:
            rules = json.load(f)
            return rules['documents']['Aadhar Card']['maskingRules']
    except Exception as e:
        logger.error(f"Failed to load rules.json for masking: {e}. Falling back to env vars.")
        return {
            "digitPattern": os.getenv("MASKING_DIGIT_PATTERN", r'^\d{4}$'),
            "minDigitGroupsRequired": int(os.getenv("MASKING_MIN_GROUPS", "2")),
            "groupsToMask": int(os.getenv("MASKING_GROUPS_TO_MASK", "2")),
            "maskColorRGB": [int(x) for x in os.getenv("MASKING_COLOR_RGB", "0,0,0").split(',')]
        }

def mask_aadhaar(image_path):
    """
    OCR (Tesseract) and black-out masking for Aadhaar.
    Returns (True, None) if successful, (False, error_msg) if it fails.
    """
    logger.info(f"Masking Aadhaar card at {image_path}")
    
    if not os.path.exists(image_path):
        logger.error(f"File does not exist: {image_path}")
        return False, 5

    img = cv2.imread(image_path)
    if img is None:
        logger.error(f"Failed to load image for masking: {image_path}")
        return False, 5

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    rules = load_masking_rules()
    color_bgr = tuple(reversed(rules['maskColorRGB'])) # cv2 uses BGR instead of RGB

    # 1. Find and Mask QR Code using OpenCV
    qr_detector = cv2.QRCodeDetector()
    retval, decoded_info, points, straight_qrcode = qr_detector.detectAndDecodeMulti(img)
    if retval and points is not None:
        for qr_points in points:
            pts = qr_points.astype(int)
            cv2.fillPoly(img, [pts], color_bgr)
            logger.info("QR code detected and successfully masked.")
    else:
        logger.info("No QR code detected to mask.")

    # 2. OCR text to find 4-digit groups
    try:
        data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)
    except Exception as e:
        logger.error(f"Tesseract Error during masking: {e}")
        return False, 5

    n_boxes = len(data['text'])
    digit_groups_found = 0
    masked_groups = 0

    for i in range(n_boxes):
        word = data['text'][i].strip()
        
        # Look for the configured digit pattern
        if re.fullmatch(rules['digitPattern'], word):
            digit_groups_found += 1
            
            # Mask up to the configured number of groups
            if masked_groups < rules['groupsToMask']:
                x, y = data['left'][i], data['top'][i]
                w, h = data['width'][i], data['height'][i]
                # Draw solid rectangle to mask
                cv2.rectangle(img, (x, y), (x + w, y + h), color_bgr, -1)
                masked_groups += 1

    # 3. Validation: Check if we found the minimum required groups
    if digit_groups_found < rules['minDigitGroupsRequired']:
        logger.warning(f"Aadhaar scan failed for {image_path}: Found {digit_groups_found} digit groups, required {rules['minDigitGroupsRequired']}.")
        return False, 4

    # 4. Save the masked image, overwriting the original temp image
    cv2.imwrite(image_path, img)
    logger.info(f"Successfully masked Aadhaar card and saved to {image_path}")
    
    return True, None
