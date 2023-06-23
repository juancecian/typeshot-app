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
  KeyboardAvoidingView
} from 'native-base';
import { Platform } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Props {
  navigation: any;
}

const LoginScreen = (props: Props) => {
  return (
    <KeyboardAvoidingView
      flex={1}
      mt="10%"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <Animated.View entering={FadeIn.duration(1000)} style={{ flex: 1 }}>
        <ScrollView
          flex={1}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
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
