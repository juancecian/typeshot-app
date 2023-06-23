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
import { Platform } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const RegisterScreen = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <KeyboardAvoidingView
      flex={1}
      bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
      mt="10%"
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
              <FormControl>
                <Input
                  type="text"
                  size="lg"
                  variant="filled"
                  placeholder="Nombre"
                />
              </FormControl>
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
              <FormControl>
                <Input
                  type="password"
                  size="lg"
                  variant="filled"
                  placeholder="Confirmar contraseña"
                />
              </FormControl>
              <FormControl>
                <Input
                  type="text"
                  keyboardType="email-address"
                  size="lg"
                  variant="filled"
                  placeholder="Correo electrónico"
                />
              </FormControl>
              <Button w="50%" mx="auto" size="sm" variant="subtle">
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
