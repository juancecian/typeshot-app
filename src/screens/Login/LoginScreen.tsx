import React, { Platform, TouchableOpacity } from 'react-native';
import {
  Button,
  FormControl,
  Heading,
  Input,
  Link,
  ScrollView,
  Stack,
  VStack,
  View,
  KeyboardAvoidingView,
  useColorMode,
  useColorModeValue
} from 'native-base';
import Animated, { FadeIn, color } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  StatusBar,
  setStatusBarBackgroundColor,
  setStatusBarStyle
} from 'expo-status-bar';

interface Props {
  navigation: any;
}

const LoginScreen = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [pressedBtn, setPressedBtn] = useState(false);

  const handleThemeMode = async () => {
    toggleColorMode();
  };

  const saveColorMode = async () => {
    try {
      if (colorMode) {
        await AsyncStorage.setItem('themeMode', colorMode);
      }
      const mode = await AsyncStorage.getItem('themeMode');
      console.log('saveColorMode: ', mode);
    } catch (error) {
      console.log(error);
    } finally {
      setPressedBtn(false);
    }
  };

  useEffect(() => {
    if (colorMode) {
      saveColorMode();
      setStatusBarStyle(colorMode === 'light' ? 'dark' : 'light');
    }
  }, [colorMode]);

  return (
    <KeyboardAvoidingView
      flex={1}
      bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View entering={FadeIn.duration(1000)} style={{ flex: 1 }}>
        <ScrollView
          flex={1}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View style={{ position: 'absolute', right: 50, top: '10%' }}>
            <Ionicons
              name={colorMode === 'light' ? 'ios-moon' : 'sunny'}
              size={20}
              color={colorMode === 'light' ? 'black' : 'white'}
              onPress={toggleColorMode}
            />
          </View>
          <VStack justifyContent="center" alignItems="center">
            <Heading>SocialMedia</Heading>
            <View mt={10}>
              <Heading fontSize={17}>Inicia sesión con tus datos</Heading>
              <Heading
                fontSize={17}
                underline
                textAlign="center"
                onPress={() => props.navigation.navigate('Register')}
              >
                o crea una nueva cuenta
              </Heading>
            </View>
            <Stack w="90%" p={10} space={5}>
              <FormControl>
                <Input
                  type="text"
                  size="lg"
                  variant="filled"
                  placeholder="Nombre de usuario"
                />
              </FormControl>
              <FormControl>
                <Input
                  type="password"
                  size="lg"
                  variant="filled"
                  placeholder="Contraseña"
                />
              </FormControl>
              <Button w="50%" mx="auto" size="sm" variant="subtle">
                INICIAR SESIÓN
              </Button>
              <Link>Olvidé mi contraseña</Link>
              <Link>Olvidé mi usuario</Link>
            </Stack>
          </VStack>
        </ScrollView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
