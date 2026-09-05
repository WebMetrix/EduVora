import cv2
import json
import os
import numpy as np
from worker_app.utils.logger import logger

RULES_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'services', 'rules.json')

def load_quality_thresholds():
    try:
        with open(RULES_PATH, 'r') as f:
            rules = json.load(f)
            return rules['globalFileRules']['imageQualityThresholds']
    except Exception as e:
        logger.error(f"Failed to load rules.json: {e}")
        # Default fallback if rules.json is unreadable
        return {
            "minLaplacianVariance": 80.0,
            "minWidthPx": 400,
            "minHeightPx": 250,
            "maxDarkPixelRatio": 0.85,
            "maxLightPixelRatio": 0.90
        }

def check_blur(image_path):
    """
    Checks the quality of the image based on rules.json thresholds (blur, size, exposure).
    Returns True if the image is clear enough, False if it fails quality checks.
    """
    logger.info(f"Checking image quality for {image_path}")
    
    if not os.path.exists(image_path):
        logger.error(f"File does not exist: {image_path}")
        return False

    img = cv2.imread(image_path)
    if img is None:
        logger.error(f"Failed to load image: {image_path}. It might be corrupted or a PDF.")
        return False

    thresholds = load_quality_thresholds()

    # 1. Dimensions check
    h, w = img.shape[:2]
    if w < thresholds['minWidthPx'] or h < thresholds['minHeightPx']:
        logger.warning(f"Image resolution too low ({w}x{h}).")
        return False

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 2. Blurriness (Laplacian Variance)
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()
    if variance < thresholds['minLaplacianVariance']:
        logger.warning(f"Image is too blurry. Variance: {variance:.2f}")
        return False

    # 3. Light/Dark Pixel Ratio (Exposure check)
    total_pixels = w * h
    dark_pixels = np.sum(gray < 20)
    light_pixels = np.sum(gray > 240)
    
    if dark_pixels / total_pixels > thresholds['maxDarkPixelRatio']:
        logger.warning("Image is too dark.")
        return False
        
    if light_pixels / total_pixels > thresholds['maxLightPixelRatio']:
        logger.warning("Image is overexposed or too bright.")
        return False

    logger.info(f"Image {image_path} passed all quality checks.")
    return True
