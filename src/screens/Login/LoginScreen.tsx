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
  useColorMode
} from 'native-base';
import Animated, { FadeIn, color } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { setStatusBarStyle } from 'expo-status-bar';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../config/firebase.config';
import { getUserById } from '../../core/services/user.service';
import { UserContext } from '../../context/AppContext';
import { validateEmailData } from '../../config/validations.config';
import { EmailEnum } from '../../enums/email.enum';

interface Props {
  navigation: any;
}

const LoginScreen = (props: Props) => {
  const [email, setEmail] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState(EmailEnum.INITIALIZE_VALUE);
  const [pwd, setPwd] = useState<string | null>(null);

  const [pressedBtn, setPressedBtn] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const { updateUser } = useContext(UserContext);

  const saveColorMode = async () => {
    try {
      if (colorMode) {
        await AsyncStorage.setItem('themeMode', colorMode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      if (validEmail && email && pwd && pwd.length > 0) {
        setPressedBtn(true);
        const auth = getAuth(app);
        const authenticated = await signInWithEmailAndPassword(
          auth,
          email,
          pwd
        );
        if (authenticated) {
          const userData = await getUserById(authenticated.user.uid);
          if (userData) {
            updateUser(userData);
            props.navigation.navigate('Home');
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPressedBtn(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailStatus = validateEmailData(email);
    setValidEmail(emailStatus);
    setEmail(email);
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
              <FormControl
                isInvalid={
                  validEmail === EmailEnum.INVALID_EMAIL ? true : false
                }
              >
                <Input
                  type="text"
                  keyboardType="email-address"
                  size="lg"
                  variant="filled"
                  placeholder="Correo electrónico"
                  onChangeText={(text) => validateEmail(text)}
                />
                <FormControl.ErrorMessage>
                  Tienes algunos errores:
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage>
                  • El Email es requerido
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage>
                  • Introduce un Email válido
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage>
                  • El Email debe tener más de 5 caracteres
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={pwd?.length === 0}>
                <Input
                  type="password"
                  size="lg"
                  variant="filled"
                  placeholder="Contraseña"
                  onChangeText={(text) => setPwd(text)}
                />
                <FormControl.ErrorMessage>
                  Tienes algunos errores:
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage>
                  • La Contraseña es requerida
                </FormControl.ErrorMessage>
              </FormControl>
              <Button
                w="50%"
                mx="auto"
                size="sm"
                variant="solid"
                onPress={handleLogin}
                isDisabled={pressedBtn}
                isLoading={pressedBtn}
                isLoadingText="Cargando"
              >
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
