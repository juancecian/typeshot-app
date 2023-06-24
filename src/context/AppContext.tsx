import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from 'native-base';
import { createContext, useEffect, useState } from 'react';
import { UserModel } from '../models/user.model';

const ThemeContext = createContext<{
  colorMode: string;
  onColorModeChange: (themeMode: string) => void;
}>({
  colorMode: '',
  onColorModeChange: () => {}
});

const UserContext = createContext<{
  user: UserModel | null;
  updateUser: (user: UserModel) => void;
}>({
  user: null,
  updateUser: () => {}
});

export const AppProvider = ({ children }: { children: any }) => {
  const [colorMode, setColorMode] = useState('');
  const [user, setUser] = useState<UserModel>();

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

  const handleUpdateUser = async (user: UserModel) => {
    try {
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const themeContextValue = {
    colorMode: colorMode,
    onColorModeChange: handleColorModeChange
  };

  const userContextValue = {
    user: user || null,
    updateUser: handleUpdateUser
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <UserContext.Provider value={userContextValue}>
        {children}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, UserContext };
