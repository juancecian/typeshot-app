import React, { useContext, useEffect, useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { UserContext } from '../../context/AppContext';
import ItemList from '../../components/ItemList';
import { getPosts } from '../../core/services/post.service';
import { PostModel } from '../../models/post.model';
import { RefreshControl } from 'react-native';
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
      justifyContent="center"
      alignItems="center"
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
        <FlatList
          data={postsData}
          w="100%"
          mt="10%"
          renderItem={({ item }) => (
            <ItemList item={item} navigation={props.navigation} />
          )}
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
