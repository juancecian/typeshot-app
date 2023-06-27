import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { UserModel } from '../models/user.model';
import { auth } from '../config/firebase.config';
import { useNavigation } from '@react-navigation/native';
import { getUserById } from '../core/services/user.service';

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

const RedirectContext = createContext<{
  redirectRoute: string;
  onRedirectRouteChange: (route: string) => void;
}>({
  redirectRoute: '',
  onRedirectRouteChange: () => {}
});

interface Props {
  children: any;
}
export const AppProvider = (props: Props) => {
  const [colorMode, setColorMode] = useState('');
  const [user, setUser] = useState<UserModel>();
  const [redirectRoute, setRedirectRoute] = useState('');

  useEffect(() => {
    loadThemeMode();

    const unsubcribe = auth.onAuthStateChanged(async (idToken) => {
      try {
        if (idToken) {
          const tokenResult = await idToken.getIdTokenResult();
          if (tokenResult && auth.currentUser) {
            const findedUser = await getUserById(auth.currentUser.uid);
            setUser(findedUser);
            setRedirectRoute('Tabs');
          } else {
            setUser(undefined);
            setRedirectRoute('Login');
          }
        } else {
          setUser(undefined);
          setRedirectRoute('Login');
        }
      } catch (error) {
        setUser(undefined);
        console.log(error);
        setRedirectRoute('Login');
      }
    });
    return () => unsubcribe();
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

  const handleRedirectRouteChange = (route: string) => {
    setRedirectRoute(route);
  };

  const themeContextValue = {
    colorMode: colorMode,
    onColorModeChange: handleColorModeChange
  };

  const userContextValue = {
    user: user || null,
    updateUser: handleUpdateUser
  };

  const redirectContextValue = {
    redirectRoute: redirectRoute,
    onRedirectRouteChange: handleRedirectRouteChange
  };

  return (
    <RedirectContext.Provider value={redirectContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <UserContext.Provider value={userContextValue}>
          {props.children}
        </UserContext.Provider>
      </ThemeContext.Provider>
    </RedirectContext.Provider>
  );
};

export { ThemeContext, UserContext, RedirectContext };
