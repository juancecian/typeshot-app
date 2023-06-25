import React, { useContext } from 'react';
import {
  Avatar,
  FormControl,
  HStack,
  Text,
  TextArea,
  VStack,
  View,
  useColorMode
} from 'native-base';
import Animated, { FadeIn } from 'react-native-reanimated';
import { UserContext } from '../../context/AppContext';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  navigation: any;
}

const CreateScreen = (props: Props) => {
  const { colorMode } = useColorMode();
  const { user } = useContext(UserContext);

  const goBackWithAnimation = () => {
    props.navigation.goBack();
  };

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(500)}>
      <VStack
        flex={1}
        bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
      >
        <HStack w="100%" px="5" mt={20} justifyContent="space-between">
          <View>
            <FontAwesome
              name={'close'}
              onPress={goBackWithAnimation}
              color="white"
              size={20}
            />
          </View>
          <View>
            <FontAwesome name={'send'} color="white" size={20} />
          </View>
        </HStack>
        <HStack mt="10%" ml="3">
          <Avatar
            size="48px"
            source={{
              uri: user?.avatar
            }}
          />
          <VStack w="90%">
            <FormControl>
              <TextArea
                autoCompleteType
                placeholder="¿En qué piensas?.."
                borderWidth={0}
                h="80%"
                color="white"
                placeholderTextColor="#737373"
                bgColor="transparent"
              />
            </FormControl>
          </VStack>
        </HStack>
      </VStack>
    </Animated.View>
  );
};

export default CreateScreen;
