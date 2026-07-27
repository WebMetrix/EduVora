import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enFilePath = path.join(__dirname, '../App_Data/locales/en.json');
let en = {};

try {
  const fileContent = fs.readFileSync(enFilePath, 'utf8');
  en = JSON.parse(fileContent);
} catch (error) {
  console.error('Failed to load locale file:', error);
}

export const t = (key) => {
  const keys = key.split('.');
  let value = en;
  for (const k of keys) {
    if (value === undefined || value[k] === undefined) return key;
    value = value[k];
  }
  return value;
};
