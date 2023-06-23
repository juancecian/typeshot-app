import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from 'native-base';
import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext<{
  colorMode: string;
  onColorModeChange: (themeMode: string) => void;
}>({
  colorMode: '',
  onColorModeChange: () => {}
});

export const AppProvider = ({ children }: { children: any }) => {
  const [colorMode, setColorMode] = useState('');

  useEffect(() => {
    loadThemeMode();
  }, []);

  const loadThemeMode = async () => {
    try {
      const themeMode = await AsyncStorage.getItem('themeMode');
      if (themeMode) {
        setColorMode(themeMode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorModeChange = async (themeMode: string) => {
    try {
      await AsyncStorage.setItem('themeMode', themeMode);
      setColorMode(themeMode);
    } catch (error) {
      console.log(error);
    }
  };

  const themeContextValue = {
    colorMode: colorMode,
    onColorModeChange: handleColorModeChange
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
