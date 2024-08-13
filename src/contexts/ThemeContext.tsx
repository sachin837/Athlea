import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isTheme: string;
  setIsTheme: (theme: string) => void;
}
const defaultContextValue: ThemeContextType = {
  isTheme: 'light',
  setIsTheme: () => { }
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const useThemes = () => useContext(ThemeContext);

export const UserThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isTheme, setIsTheme] = useState<string>('light');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          setIsTheme(storedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('theme', isTheme);
      } catch (error) {
        console.error('Failed to save theme to storage', error);
      }
    };

    saveTheme();
  }, [isTheme]);

  return (
    <ThemeContext.Provider value={{ isTheme, setIsTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
