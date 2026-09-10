import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const rulesPath = path.join(__dirname, 'kyc_document_rules.json');
const rulesPath = path.join(__dirname, '../App_Data/kyc_document_rules.json');
const RULES = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));

/**
 * Basic validator for KYC submission.
 * Validates the input against the rules defined in kyc_document_rules.json.
 * 
 * TODO: In the future, this can be expanded to call a Python microservice 
 * for advanced image validation (e.g., checking for blurriness, glare, OCR mismatches).
 */

export async function validateKycSubmission(body, files) {
  const errors = [];
  const { panNumber, identityTypeId, identityProofNumber } = body || {};

  let identityProofType = '';
  const id = parseInt(identityTypeId);
  if (id === 1) identityProofType = 'Aadhar Card';
  else if (id === 3) identityProofType = 'Driving License';
  else if (id === 2) identityProofType = 'Passport';
  else if (id === 4) identityProofType = 'Voter ID';


  // 1. PAN Validation
  const panRules = RULES.documents['PAN Card']?.numberField;
  if (!panNumber) {
    errors.push('PAN number is required.');
  } else if (panRules && !new RegExp(panRules.pattern).test(panNumber)) {
    errors.push('Invalid PAN format.');
  }

  // 2. Identity Proof Validation
  const idDocRules = RULES.documents[identityProofType];
  if (!idDocRules) {
    errors.push(`Invalid identity proof type: ${identityProofType}`);
  } else if (!identityProofNumber) {
    errors.push(`${identityProofType} number is required.`);
  }

  // 3. Basic File Upload Checks
  const frontFile = files?.IdentityProofFrontPath?.[0];
  const panFile = files?.PanCardPath?.[0];
  const fileRules = RULES.globalFileRules;

  const hasExistingFront = !!body?.IdentityProofFrontPath;
  const hasExistingPan = !!body?.PanCardPath;

  // Validate Identity Proof image size and presence
  if (!frontFile && !hasExistingFront) {
    errors.push('Identity proof front image is required.');
  } else if (frontFile) {
    if (frontFile.size > fileRules.maxFileSizeBytes) {
      errors.push(`Identity proof image exceeds maximum size of ${fileRules.maxFileSizeMB}MB.`);
    } else if (frontFile.size < fileRules.minFileSizeBytes) {
      errors.push(`Identity proof image is too small (minimum ${fileRules.minFileSizeKB}KB).`);
    }
  }
  
  // Validate PAN Card image size and presence
  if (!panFile && !hasExistingPan) {
    errors.push('PAN card image is required.');
  } else if (panFile) {
    if (panFile.size > fileRules.maxFileSizeBytes) {
      errors.push(`PAN card image exceeds maximum size of ${fileRules.maxFileSizeMB}MB.`);
    } else if (panFile.size < fileRules.minFileSizeBytes) {
      errors.push(`PAN card image is too small (minimum ${fileRules.minFileSizeKB}KB).`);
    }
  }


  return {
    valid: errors.length === 0,
    errors
  };
}
