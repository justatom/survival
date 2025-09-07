// กำหนด type ที่ชัดเจนแทน any
type LocalStorageValue = string | number | boolean | object | null;

export const saveToLocalStorage = (key: string, data: LocalStorageValue) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
};

export const getFromLocalStorage = <T = LocalStorageValue>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};
