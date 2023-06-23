import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, extendTheme, useColorMode } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login/LoginScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import { AppProvider } from './src/context/AppContext';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialMode, setInitialMode] = useState('');

  useEffect(() => {
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
  return (
    initialMode && (
      <>
        <StatusBar style="inverted" />
        <AppProvider>
          <NativeBaseProvider
            theme={extendTheme({
              config: {
                initialColorMode: initialMode
              }
            })}
          >
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </AppProvider>
      </>
    )
  );
}
