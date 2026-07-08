import en from '../assets/locales/en.json';

export function useTranslation() {
  // Simple implementation for standalone requirements
  const t = (key) => {
    const keys = key.split('.');
    let value = en;
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    return value;
  };
  return { t };
}
