import {
  Button,
  FormControl,
  Heading,
  Input,
  Link,
  Stack,
  VStack,
  View
} from 'native-base';
import Animated, { FadeIn } from 'react-native-reanimated';

const LoginScreen = () => {
  return (
    <Animated.View entering={FadeIn} style={{ flex: 1 }}>
      <VStack
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Heading>SocialMedia</Heading>
        <View mt={10}>
          <Heading fontSize={17}>Inicia sesión con tus datos</Heading>
          <Heading fontSize={17} underline textAlign="center">
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
    </Animated.View>
  );
};

export default LoginScreen;
