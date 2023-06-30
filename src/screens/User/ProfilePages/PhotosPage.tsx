import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
  View
} from 'native-base';
import { Dimensions, RefreshControl } from 'react-native';
import { getPosts } from '../../../core/services/post.service';
import { PostModel } from '../../../models/post.model';
import { UserModel } from '../../../models/user.model';

interface Props {
  user: UserModel;
}

const PhotosPage = (props: Props) => {
  const { width, height } = Dimensions.get('window');

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [postsData, setPostsData] = useState<PostModel[]>([]);

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = async () => {
    try {
      if (props.user) {
        const data = await getPosts([props.user.id]);
        let filterPosts = data.filter((post) => post.images.length > 0);
        setPostsData(filterPosts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingData(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await getPostData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View flex={1} justifyContent="center">
      {!isLoadingData && (
        <FlatList
          data={postsData}
          ListEmptyComponent={
            <VStack flex={1} justifyContent="center" alignItems="center">
              <Heading mt="50%" fontSize="15">
                No hay información para mostrar.
              </Heading>
            </VStack>
          }
          contentContainerStyle={{ padding: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderItem={({ item }) => (
            <Box flex={1} bg="coolGray.700" rounded={10} p="3" my="1">
              <Image
                source={item.images[0]}
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
                    uri: props.user.avatar
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
                    {props.user.username}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200'
                    }}
                  >
                    {item.text}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )}
        />
      )}
      {isLoadingData && (
        <VStack flex={1} justifyContent="center" alignItems="center">
          <Spinner size="sm" />
          <Heading mt="5" fontSize="15">
            Cargando información..
          </Heading>
        </VStack>
      )}
    </View>
  );
};

export default PhotosPage;
