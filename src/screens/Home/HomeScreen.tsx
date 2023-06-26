import React, { useContext, useEffect, useRef, useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { UserContext } from '../../context/AppContext';
import ItemList from '../../components/ItemList';
import { getPosts } from '../../core/services/post.service';
import { PostModel } from '../../models/post.model';
import { RefreshControl, StatusBar } from 'react-native';
import {
  FlatList,
  ScrollView,
  Spinner,
  VStack,
  View,
  useColorMode,
  Text,
  Heading,
  HStack
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  navigation: any;
}
const HomeScreen = (props: Props) => {
  const { user } = useContext(UserContext);
  const { colorMode } = useColorMode();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [postsData, setPostsData] = useState<PostModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener(
      'beforeRemove',
      (e: any) => {
        if (!user) {
          return;
        }
        e.preventDefault();
        return true;
      }
    );
    return unsubscribe;
  }, [props.navigation, user]);

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
    <VStack
      flex={1}
      bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
    >
      <HStack w="100%" mt={20} space={10} justifyContent="flex-end" right={10}>
        <View>
          <Ionicons name={'chatbubbles-outline'} color="white" size={25} />
        </View>
        <View>
          <Ionicons name={'notifications-outline'} color="white" size={25} />
        </View>
      </HStack>
      {!isLoadingData ? (
        <Animated.FlatList
          data={postsData}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            padding: 10,
            paddingTop: 10
          }}
          renderItem={({ item, index }) => {
            const inputRange = [-1, 0, 70 * index, 70 * (index + 2)];
            const opacityInputRange = [-1, 0, 70 * index, 70 * (index + 1)];
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

export default HomeScreen;
