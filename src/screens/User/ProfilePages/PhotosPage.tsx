import React, { useContext, useState } from 'react';
import { Image } from 'expo-image';
import { Avatar, Box, FlatList, HStack, Text, VStack, View } from 'native-base';
import Animated from 'react-native-reanimated';
import { Dimensions, useWindowDimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { UserContext } from '../../../context/AppContext';

const PhotosPage = () => {
  const { user } = useContext(UserContext);
  const { width, height } = Dimensions.get('window');

  const [images, setImages] = useState([
    'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2FmDENoF9xUKRYgXzSz2s3wO4HA823%2Favatar.jpg?alt=media&token=b8f6a4c3-a0d2-4c3a-af83-b4de458851a1',
    'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2FmDENoF9xUKRYgXzSz2s3wO4HA823%2Favatar.jpg?alt=media&token=b8f6a4c3-a0d2-4c3a-af83-b4de458851a1',
    'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2FmDENoF9xUKRYgXzSz2s3wO4HA823%2Favatar.jpg?alt=media&token=b8f6a4c3-a0d2-4c3a-af83-b4de458851a1',
    'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2FmDENoF9xUKRYgXzSz2s3wO4HA823%2Favatar.jpg?alt=media&token=b8f6a4c3-a0d2-4c3a-af83-b4de458851a1',
    'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2FoZMzVSBQpIYPaqHLCi9wkhuz9Ck2%2Favatar.jpg?alt=media&token=b3cf44be-e616-4777-8e35-3f347410ef01',
    'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2FoZMzVSBQpIYPaqHLCi9wkhuz9Ck2%2Favatar.jpg?alt=media&token=b3cf44be-e616-4777-8e35-3f347410ef01',
    'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2FoZMzVSBQpIYPaqHLCi9wkhuz9Ck2%2Favatar.jpg?alt=media&token=b3cf44be-e616-4777-8e35-3f347410ef01',
    'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2FoZMzVSBQpIYPaqHLCi9wkhuz9Ck2%2Favatar.jpg?alt=media&token=b3cf44be-e616-4777-8e35-3f347410ef01',
    'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2FoZMzVSBQpIYPaqHLCi9wkhuz9Ck2%2Favatar.jpg?alt=media&token=b3cf44be-e616-4777-8e35-3f347410ef01'
  ]);
  return (
    <View flex={1} justifyContent="center">
      <FlatList
        data={images}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <Box flex={1} bg="coolGray.700" rounded={10} p="3" my="1">
            <Image
              source={item}
              style={{
                width: width - 40,
                height: height / 2,
                borderRadius: 5
              }}
            />
            <HStack space={[2, 3]} pt={3}>
              <Avatar
                size="48px"
                source={{
                  uri: user?.avatar
                }}
              />
              <VStack w="80%">
                <Text
                  _dark={{
                    color: 'warmGray.50'
                  }}
                  color="coolGray.800"
                  bold
                  isTruncated={true}
                >
                  {user?.username}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200'
                  }}
                >
                  Nana miren lo que era
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}
      />
    </View>
  );
};

export default PhotosPage;
