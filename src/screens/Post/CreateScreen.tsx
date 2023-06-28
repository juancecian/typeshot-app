import React, { useContext, useRef, useState } from 'react';
import {
  Avatar,
  FormControl,
  HStack,
  Spinner,
  TextArea,
  VStack,
  View,
  useColorMode,
  useToast
} from 'native-base';
import { UserContext } from '../../context/AppContext';
import { FontAwesome } from '@expo/vector-icons';
import Toast from '../../components/Toast';
import { PostModel } from '../../models/post.model';
import { createPost } from '../../core/services/post.service';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

interface Props {
  navigation: any;
}

const CreateScreen = (props: Props) => {
  const { colorMode } = useColorMode();
  const { user } = useContext(UserContext);
  const toast = useToast();
  const textPostRef = useRef<any>();

  const [textPost, setTextPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const goBackWithAnimation = () => {
    props.navigation.goBack();
  };

  const handleCreatePost = async () => {
    try {
      if (user && textPost.length > 0) {
        setIsPosting(true);
        let newPost = new PostModel();
        newPost.text = textPost;
        newPost.images = [];
        newPost.author.id = user.id;

        const postPublished = await createPost(newPost);
        if (postPublished) {
          setTextPost('');
          toast.show({
            placement: 'top',
            render: () => <Toast color="emerald.500" text="Post creado!" />
          });
          props.navigation.navigate('HomeTab');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Animated.View style={{ flex: 1 }}>
      <VStack
        flex={1}
        bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
      >
        <HStack w="100%" px="5" mt={20} justifyContent="space-between">
          <View>
            <FontAwesome
              name={'close'}
              onPress={goBackWithAnimation}
              color={colorMode === 'light' ? 'black' : 'white'}
              size={20}
            />
          </View>
          <View>
            <TouchableOpacity
              disabled={textPost.length === 0}
              onPress={handleCreatePost}
            >
              {!isPosting ? (
                <FontAwesome
                  name={'send'}
                  color={colorMode === 'light' ? 'black' : 'white'}
                  size={20}
                />
              ) : (
                <Spinner size="sm" />
              )}
            </TouchableOpacity>
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
                ref={textPostRef}
                value={textPost}
                autoCompleteType
                placeholder="¿En qué piensas?.."
                borderWidth={0}
                h="80%"
                placeholderTextColor="#737373"
                bgColor="transparent"
                onChangeText={(text) => setTextPost(text)}
              />
            </FormControl>
          </VStack>
        </HStack>
      </VStack>
    </Animated.View>
  );
};

export default CreateScreen;
