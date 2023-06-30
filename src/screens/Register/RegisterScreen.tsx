import {
  Button,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Stack,
  VStack,
  useColorMode,
  useToast
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
import { UserModel } from '../../models/user.model';
import { createAccount } from '../../core/services/user.service';
import Toast from '../../components/Toast';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../../config/firebase.config';

interface Props {
  navigation: any;
}

const RegisterScreen = (props: Props) => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [pwd, setPwd] = useState<string | null>(null);
  const [validPwd, setValidPwd] = useState(PasswordEnum.INITIALIZE_VALUE);
  const [email, setEmail] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState(EmailEnum.INITIALIZE_VALUE);
  const [pressedBtn, setPressedBtn] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);

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

  const validateForm = () => {
    name &&
    name.length &&
    username &&
    username.length &&
    validPwd === PasswordEnum.VALID_PASS &&
    validEmail === EmailEnum.VALID_EMAIL
      ? setIsValidForm(true)
      : setIsValidForm(false);
  };

  const handleCreateAccount = async () => {
    if (name && pwd && username && email && isValidForm) {
      try {
        setPressedBtn(true);
        const createFirebaseAcc = await createUserWithEmailAndPassword(
          auth,
          email,
          pwd
        );
        if (createFirebaseAcc.user) {
          let usernew = new UserModel();
          usernew.id = createFirebaseAcc.user.uid;
          usernew.name = name;
          usernew.username = username;
          usernew.email = email;
          const accountCreated = await createAccount(usernew);
          if (accountCreated) {
            await sendEmailVerification(createFirebaseAcc.user);
            props.navigation.navigate('Login');
            toast.show({
              placement: 'top',
              duration: 5000,
              render: () => (
                <Toast
                  color="emerald.500"
                  text="Cuenta creada con éxito, sin embargo, necesitamos que valides tu correo electrónico. Te hemos enviado un mail con los pasos a seguir."
                  textColor="white"
                />
              )
            });
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setPressedBtn(false);
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [name, username, validPwd, validEmail]);

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
                isDisabled={pressedBtn || !isValidForm}
                isLoading={pressedBtn}
                isLoadingText="Cargando"
                onPress={handleCreateAccount}
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
