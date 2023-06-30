import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, extendTheme, useColorMode } from 'native-base';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login/LoginScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/Home/HomeScreen';
import Tabs from './src/screens/Tabs/Tabs';
import CompleteProfileScreen from './src/screens/User/CompleteProfile/CompleteProfileScreen';
import * as NavigationBar from 'expo-navigation-bar';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import { auth } from './src/config/firebase.config';
import { updateUser } from './src/redux/reducers/user.reducer';
import { getUserById } from './src/core/services/user.service';
import ScreenLoader from './src/components/ScreenLoader';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialMode, setInitialMode] = useState('');
  const [initialRoute, setInitialRoute] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
    }
    loadThemeMode();
  }, []);

  const loadThemeMode = async () => {
    try {
      const colorMode = await AsyncStorage.getItem('themeMode');
      if (colorMode) {
        setInitialMode(colorMode);
      } else {
        setInitialMode('light');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuthentication = async () => {
    try {
      auth.onAuthStateChanged(async (idToken) => {
        if (idToken) {
          if (!idToken.emailVerified) {
            return;
          }
          console.log(
            'Se salta la verificacion del coreo, ',
            idToken.emailVerified
          );
          const tokenResult = await idToken.getIdTokenResult();
          if (tokenResult.token) {
            const user = await getUserById(idToken.uid);
            store.dispatch(updateUser(user));
            setInitialRoute('Tabs');
          }
        } else {
          setInitialRoute('Login');
        }
      });
    } catch (error) {
      console.log(error);
      setInitialRoute('Login');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    initialMode && (
      <>
        <StatusBar style="inverted" />
        <NavigationContainer>
          <Provider store={store}>
            <NativeBaseProvider
              theme={extendTheme({
                config: {
                  initialColorMode: initialMode
                }
              })}
            >
              {!isLoading && initialRoute.length ? (
                <Stack.Navigator initialRouteName={initialRoute}>
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CompleteProfile"
                    component={CompleteProfileScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false, gestureEnabled: false }}
                  />
                </Stack.Navigator>
              ) : (
                <ScreenLoader />
              )}
            </NativeBaseProvider>
          </Provider>
        </NavigationContainer>
      </>
    )
  );
}
