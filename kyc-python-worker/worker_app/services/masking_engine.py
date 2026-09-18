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
            full_rules = json.load(f)
            doc_rules = full_rules['documents']['1']
            
            return {
                "maskingRules": doc_rules['maskingRules'],
                "errorMessage": doc_rules['serverSideProcessing']['failClosedBehavior']['userMessage']
            }
    except Exception as e:
        logger.error(f"Failed to load rules.json for masking: {e}. Falling back to env vars.")
        return {
            "maskingRules": {
                "digitPattern": os.getenv("MASKING_DIGIT_PATTERN", r'^\d{4}$'),
                "minDigitGroupsRequired": int(os.getenv("MASKING_MIN_GROUPS", "2")),
                "groupsToMask": int(os.getenv("MASKING_GROUPS_TO_MASK", "2")),
                "maskColorRGB": [int(x) for x in os.getenv("MASKING_COLOR_RGB", "0,0,0").split(',')]
            },
            "errorMessage": "We could not clearly read your Aadhaar card. Please upload a clearer, un-skewed, well-lit photo of your Aadhaar card and try again."
        }

# def mask_aadhaar(image_path):
#     """
#     OCR (Tesseract) and black-out masking for Aadhaar.
#     Returns (True, None) if successful, (False, error_msg) if it fails.
#     """
#     logger.info(f"Masking Aadhaar card at {image_path}")
    
#     if not os.path.exists(image_path):
#         logger.error(f"File does not exist: {image_path}")
#         return False, 4

#     img = cv2.imread(image_path)
#     if img is None:
#         logger.error(f"Failed to load image for masking: {image_path}")
#         return False, 4

#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     loaded_config = load_masking_rules()
#     rules = loaded_config['maskingRules']
#     error_message = loaded_config['errorMessage']
#     color_bgr = tuple(reversed(rules['maskColorRGB'])) # cv2 uses BGR instead of RGB

#     # 1. Find and Mask QR Code using OpenCV
#     qr_detector = cv2.QRCodeDetector()
#     found_qr = False

#     # Try different scales to help OpenCV detect dense/high-res Aadhaar QR codes
#     for scale in [1.0, 0.5, 0.25]:
#         if scale == 1.0:
#             test_img = img
#             test_gray = gray
#         else:
#             test_img = cv2.resize(img, (0, 0), fx=scale, fy=scale)
#             test_gray = cv2.resize(gray, (0, 0), fx=scale, fy=scale)

#         retval, decoded_info, points, straight_qrcode = qr_detector.detectAndDecodeMulti(test_img)
        
#         if not retval or points is None:
#             retval, decoded_info, points, straight_qrcode = qr_detector.detectAndDecodeMulti(test_gray)
            
#         if not retval or points is None:
#             retval, points = qr_detector.detectMulti(test_gray)

#         if retval and points is not None and len(points) > 0:
#             found_qr = True
#             for qr_points in points:
#                 # Scale points back up to original image resolution
#                 pts = (qr_points / scale).astype(int)
#                 cv2.fillPoly(img, [pts], color_bgr)
#             logger.info(f"QR code detected at scale {scale} and successfully masked.")
#             break

#     if not found_qr:
#         logger.info("No QR code detected to mask despite multiple scale attempts.")

#     # 2. OCR text to find 4-digit groups
#     try:
#         data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)
#     except Exception as e:
#         logger.error(f"Tesseract Error during masking: {e}")
#         return False, 4

#     n_boxes = len(data['text'])
#     digit_groups_found = 0
#     masked_groups = 0

#     for i in range(n_boxes):
#         word = data['text'][i].strip()
        
#         # Look for the configured digit pattern
#         if re.fullmatch(rules['digitPattern'], word):
#             digit_groups_found += 1
            
#             # Mask up to the configured number of groups
#             if masked_groups < rules['groupsToMask']:
#                 x, y = data['left'][i], data['top'][i]
#                 w, h = data['width'][i], data['height'][i]
#                 # Draw solid rectangle to mask
#                 cv2.rectangle(img, (x, y), (x + w, y + h), color_bgr, -1)
#                 masked_groups += 1

#     # 3. Validation: Check if we found the minimum required groups
#     if digit_groups_found < rules['minDigitGroupsRequired']:
#         logger.warning(f"Aadhaar scan failed for {image_path}: Found {digit_groups_found} digit groups, required {rules['minDigitGroupsRequired']}.")
#         logger.warning(f"Error Message: {error_message}")
#         return False, 4

#     # 4. Save the masked image, overwriting the original temp image
#     cv2.imwrite(image_path, img)
#     logger.info(f"Successfully masked Aadhaar card and saved to {image_path}")
    
#     return True, None

def mask_aadhaar(image_path, require_digits=True):
    """
    OCR (Tesseract) and black-out masking for Aadhaar.
    Returns (True, None) if successful, (False, error_msg) if it fails.
    """
    logger.info(f"Masking Aadhaar card at {image_path}")
    
    if not os.path.exists(image_path):
        logger.error(f"File does not exist: {image_path}")
        return False, 4

    img = cv2.imread(image_path)
    if img is None:
        logger.error(f"Failed to load image for masking: {image_path}")
        return False, 4

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    loaded_config = load_masking_rules()
    rules = loaded_config['maskingRules']
    error_message = loaded_config['errorMessage']
    color_bgr = tuple(reversed(rules['maskColorRGB'])) # cv2 uses BGR instead of RGB
    
    img_h, img_w = gray.shape
    img_area = img_h * img_w

    # ==========================================
    # 1. Find and Mask QR Code using OpenCV
    # ==========================================
    qr_detector = cv2.QRCodeDetector()
    found_qr = False

    # Attempt A: OpenCV Built-in Detector with Scaling
    for scale in [1.0, 0.5, 0.25]:
        if scale == 1.0:
            test_img = img
            test_gray = gray
        else:
            test_img = cv2.resize(img, (0, 0), fx=scale, fy=scale)
            test_gray = cv2.resize(gray, (0, 0), fx=scale, fy=scale)

        retval, decoded_info, points, straight_qrcode = qr_detector.detectAndDecodeMulti(test_img)
        
        if not retval or points is None:
            retval, decoded_info, points, straight_qrcode = qr_detector.detectAndDecodeMulti(test_gray)
            
        if not retval or points is None:
            retval, points = qr_detector.detectMulti(test_gray)

        if retval and points is not None and len(points) > 0:
            found_qr = True
            for qr_points in points:
                pts = (qr_points / scale).astype(int)
                cv2.fillPoly(img, [pts], color_bgr)
            logger.info(f"QR code detected at scale {scale} and successfully masked.")
            break

    # Attempt B: Canny Edge Density Blob Detection (Immune to background lighting)
    if not found_qr:
        logger.info("Built-in detector failed. Falling back to Canny Edge Blob Detection...")
        
        # 1. Blur and isolate high-contrast edges
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blur, 50, 150)
        
        # 2. Use MORPH_CLOSE to merge the dense grid of the QR code into a solid block.
        # CLOSE bridges the gaps inside the QR code but doesn't aggressively expand 
        # its outer walls, preventing it from merging with the text below it.
        k_size = max(11, int(img_w * 0.015)) 
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (k_size, k_size))
        closed = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel)
        
        # 3. Small dilate to ensure the block is a perfectly solid white square
        small_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
        dilated = cv2.dilate(closed, small_kernel, iterations=1)
              
        # Find contours of the white blocks on the black background
        contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        for cnt in contours:
            area = cv2.contourArea(cnt)
            
            # QR codes usually occupy between 1.5% and 30% of the image area
            if img_area * 0.015 < area < img_area * 0.30:
                x, y, w, h = cv2.boundingRect(cnt)
                aspect_ratio = float(w) / h
                
                # Allow for skew/perspective distortion (0.6 to 1.7 aspect ratio)
                if 0.6 <= aspect_ratio <= 1.7:
                    
                    # Ensure the block is relatively solid, not just a wireframe
                    hull = cv2.convexHull(cnt)
                    hull_area = cv2.contourArea(hull)
                    extent = area / hull_area if hull_area > 0 else 0
                    
                    if extent > 0.4:
                        pad = max(15, int(img_w * 0.02))
                        cv2.rectangle(img, 
                                      (max(0, x - pad), max(0, y - pad)), 
                                      (min(img_w, x + w + pad), min(img_h, y + h + pad)), 
                                      color_bgr, -1)
                        found_qr = True
                        logger.info("QR code successfully masked using Canny Blob Detection.")
                        break

    if not found_qr:
        logger.warning("No QR code detected to mask despite all attempts.")

    # ==========================================
    # 2. OCR text to find 4-digit groups
    # ==========================================
    try:
        data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)
    except Exception as e:
        logger.error(f"Tesseract Error during masking: {e}")
        return False, 4

    n_boxes = len(data['text'])
    digit_groups_found = 0
    masked_groups = 0
    
    max_groups_to_mask = rules['groupsToMask']

    for i in range(n_boxes):
        word = data['text'][i].strip()
        
        # Clean any stray punctuation that Tesseract appended (e.g. "6393." -> "6393")
        clean_word = re.sub(r'^[^0-9]+|[^0-9]+$', '', word)
        
        if re.fullmatch(rules['digitPattern'], clean_word):
            digit_groups_found += 1
            
            if masked_groups < max_groups_to_mask:
                x, y = data['left'][i], data['top'][i]
                w, h = data['width'][i], data['height'][i]
                
                pad = 3
                cv2.rectangle(img, 
                              (max(0, x - pad), max(0, y - pad)), 
                              (min(img_w, x + w + pad), min(img_h, y + h + pad)), 
                              color_bgr, -1)
                masked_groups += 1

    # ==========================================
    # 3. Save the masked image
    # ==========================================
    # We save it now so that if validation fails, the masked image is still on disk.
    cv2.imwrite(image_path, img)
    logger.info(f"Successfully applied masking and saved to {image_path}")

    # ==========================================
    # 4. Validation: Check if we successfully processed the card
    # ==========================================
    if require_digits and digit_groups_found < rules['minDigitGroupsRequired']:
        logger.warning(f"Scan failed for {image_path}: Found {digit_groups_found} digit groups, required {rules['minDigitGroupsRequired']}.")
        logger.warning(f"Error Message: {error_message}")
        return False, 4
        
    if not require_digits and digit_groups_found == 0 and not found_qr:
        # For back image, we must find AT LEAST the QR code or the VID digits. 
        # If both failed, the image is unreadable or not an Aadhaar card.
        logger.warning(f"Back scan failed for {image_path}: No QR code or VID digits found.")
        logger.warning(f"Error Message: {error_message}")
        return False, 4

    return True, None
