import en from '../assets/locales/en.json';

export const t = (key) => {
  const keys = key.split('.');
  let value = en;
  for (const k of keys) {
    if (value === undefined || value[k] === undefined) return key;
    value = value[k];
  }
  return value;
};

export function useTranslation() {
  return { t };
}
