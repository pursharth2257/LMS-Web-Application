import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    console.log('ThemeProvider: Initial theme from localStorage:', savedTheme);
    return savedTheme || 'light';
  });
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  useEffect(() => {
    console.log('ThemeProvider: Theme changed to', theme, 'Document classes:', document.documentElement.classList.toString());
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('ThemeProvider: Added dark class');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('ThemeProvider: Removed dark class');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.error('useTheme must be used within a ThemeProvider');
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};