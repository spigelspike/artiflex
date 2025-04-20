
import { useState, useEffect } from "react";
import { GeneratedImage } from "@/types";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

export const useImageHistory = () => {
  const [images, setImages] = useLocalStorage<GeneratedImage[]>("generatedImages", []);

  const addImage = (image: GeneratedImage) => {
    setImages(prev => [image, ...prev]);
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const clearHistory = () => {
    setImages([]);
  };

  return {
    images,
    addImage,
    removeImage,
    clearHistory,
  };
};
