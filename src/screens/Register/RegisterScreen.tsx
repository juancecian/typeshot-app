import {
  Button,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Stack,
  VStack,
  useColorMode
} from 'native-base';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  validateEmailData,
  validatePassword
} from '../../config/validations.config';
import { EmailEnum } from '../../enums/email.enum';
import { PasswordEnum } from '../../enums/password.enum';

const RegisterScreen = () => {
  const { colorMode } = useColorMode();

  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [pwd, setPwd] = useState<string | null>(null);
  const [validPwd, setValidPwd] = useState(PasswordEnum.INITIALIZE_VALUE);
  const [email, setEmail] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState(EmailEnum.INITIALIZE_VALUE);
  const [pressedBtn, setPressedBtn] = useState(false);

  const validateEmail = (email: string) => {
    const emailStatus = validateEmailData(email);
    setValidEmail(emailStatus);
    setEmail(email);
  };

  const validatePwd = (text: string) => {
    if (pwd) {
      const pwdStatus = validatePassword(pwd, text);
      setValidPwd(pwdStatus);
    }
  };

  return (
    <KeyboardAvoidingView
      flex={1}
      bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <Animated.View entering={FadeIn.duration(1000)} style={{ flex: 1 }}>
        <ScrollView
          flex={1}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack flex={1} mt="10%" alignItems="center">
            <Heading fontSize={15} p="5">
              Te pediremos algunos datos básicos para registrarte en nuestro
              sistema, luego podrás completar tu perfil
            </Heading>
            <Stack w="90%" p={10} space={5}>
              <FormControl isInvalid={name?.length === 0}>
                <Input
                  type="text"
                  size="lg"
                  variant="filled"
                  placeholder="Nombre"
                  onChangeText={(text) => setName(text)}
                />
                <FormControl.ErrorMessage>
                  Tienes algunos errores:
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage>
                  • El Nombre es requerido
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={username?.length === 0}>
                <Input
                  type="text"
                  size="lg"
                  variant="filled"
                  placeholder="Nombre de usuario"
                  onChangeText={(text) => setUsername(text)}
                />
                <FormControl.ErrorMessage>
                  Tienes algunos errores:
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage>
                  • El Nombre de Usuario es requerido
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
              <FormControl
                isInvalid={
                  validPwd === PasswordEnum.INVALID_PASS ? true : false
                }
              >
                <Input
                  type="password"
                  size="lg"
                  variant="filled"
                  placeholder="Confirmar contraseña"
                  onChangeText={(text) => validatePwd(text)}
                />
                <FormControl.ErrorMessage>
                  Tienes algunos errores:
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage>
                  • Las contraseñas no pueden estar vacías
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage>
                  • La contraseña principal no coincide con la de confirmación
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage>
                  • La contraseña debe tener más de 5 caracteres
                </FormControl.ErrorMessage>
              </FormControl>
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
              </FormControl>
              <Button
                w="50%"
                mx="auto"
                size="sm"
                variant="solid"
                isDisabled={pressedBtn}
                isLoading={pressedBtn}
                isLoadingText="Cargando"
              >
                CREAR CUENTA
              </Button>
            </Stack>
          </VStack>
        </ScrollView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
