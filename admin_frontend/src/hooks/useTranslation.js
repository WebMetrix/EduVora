import en from '../assets/locales/en.json';

export const t = (key, replacements = {}) => {
  const keys = key.split('.');
  let value = en;
  for (const k of keys) {
    if (value === undefined || value[k] === undefined) return key;
    value = value[k];
  }
  
  if (typeof value === 'string') {
    let result = value;
    for (const [k, v] of Object.entries(replacements)) {
      result = result.replace(new RegExp(`{{${k}}}`, 'g'), v);
    }
    return result;
  }
  
  return value;
};

export function useTranslation() {
  return { t };
}
