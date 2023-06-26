import {
  FlatList,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
  View
} from 'native-base';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PostModel } from '../../../models/post.model';
import { UserContext } from '../../../context/AppContext';
import ItemList from '../../../components/ItemList';
import { RefreshControl } from 'react-native';
import { getPosts } from '../../../core/services/post.service';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';

interface Props {
  navigation: any;
}

const PostsPage = (props: Props) => {
  const { user } = useContext(UserContext);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [postsData, setPostsData] = useState<PostModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setIsLoadingData(true);
    getPostData();
  }, []);

  const getPostData = async () => {
    try {
      const data = await getPosts([
        'kHeFgCTO4ZQezSDoCo3jjlRA66V2',
        'mDENoF9xUKRYgXzSz2s3wO4HA823'
      ]);
      setPostsData(data);
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
    <VStack flex={1} mt="10">
      <View w="100%" alignItems="center" mt={5}>
        <Image
          style={{ width: '50%', height: 200, borderRadius: 100 }}
          source={user?.avatar}
          contentFit="cover"
          transition={1000}
        />
        <Heading mt={5}>{user?.name}</Heading>
        <Heading color="gray.500" size="xs">
          @{user?.username}
        </Heading>
      </View>
      <HStack w="100%" px="20" py={5} justifyContent="space-between">
        <View>
          <Heading textAlign="center" fontSize={15}>
            {user?.following}
          </Heading>
          <Text color="gray.500">siguiendo</Text>
        </View>
        <View>
          <Heading textAlign="center" fontSize={15}>
            {user?.followers}
          </Heading>
          <Text color="gray.500">seguidores</Text>
        </View>
      </HStack>
      {!isLoadingData ? (
        <Animated.FlatList
          data={postsData}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            padding: 10,
            paddingTop: 10
          }}
          renderItem={({ item, index }) => {
            const inputRange = [-1, 0, 80 * index, 80 * (index + 2)];
            const opacityInputRange = [-1, 0, 80 * index, 80 * (index + 1)];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0]
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0]
            });
            return (
              <ItemList
                item={item}
                navigation={props.navigation}
                scale={scale}
                opacity={opacity}
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      ) : (
        <VStack flex={1} justifyContent="center" alignItems="center">
          <Spinner size="sm" />
          <Heading mt="5" fontSize="15">
            Cargando información..
          </Heading>
        </VStack>
      )}
    </VStack>
  );
};

export default PostsPage;
