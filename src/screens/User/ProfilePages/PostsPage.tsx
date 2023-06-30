import {
  FlatList,
  HStack,
  HamburgerIcon,
  Heading,
  Menu,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
  useColorMode
} from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { PostModel } from '../../../models/post.model';
import ItemList from '../../../components/ItemList';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { getPosts } from '../../../core/services/post.service';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import { setStatusBarStyle } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheetProfile from '../../../components/BottomSheetProfile';
import { UserModel } from '../../../models/user.model';
import ScreenLoader from '../../../components/ScreenLoader';

interface Props {
  navigation: any;
  user: UserModel;
}

const PostsPage = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [postsData, setPostsData] = useState<PostModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isSheetOpened, setIsSheetOpened] = useState(false);

  const getPostData = async () => {
    try {
      if (props.user) {
        const data = await getPosts([props.user.id]);
        setPostsData(data);
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

  const saveColorMode = async () => {
    try {
      if (colorMode) {
        await AsyncStorage.setItem('themeMode', colorMode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseSheet = () => {
    setIsSheetOpened(false);
  };

  const handleSheet = () => {
    setIsSheetOpened(!isSheetOpened);
  };
  useEffect(() => {
    if (colorMode) {
      saveColorMode();
      setStatusBarStyle(colorMode === 'light' ? 'dark' : 'light');
    }
  }, [colorMode]);

  useEffect(() => {
    setIsLoadingData(true);
    getPostData();
  }, []);

  return (
    <>
      <View flex={1} mt="10">
        <View style={{ position: 'absolute', right: 30, zIndex: 1 }}>
          <FontAwesome5
            name="user-plus"
            size={20}
            color={colorMode === 'light' ? 'black' : 'white'}
            onPress={toggleColorMode}
          />
        </View>

        <View style={{ position: 'absolute', left: 30, zIndex: 1 }}>
          <TouchableOpacity onPress={handleSheet}>
            <HamburgerIcon size={18} />
          </TouchableOpacity>
        </View>
        <View w="100%" alignItems="center">
          <Image
            style={{ width: '50%', height: 200, borderRadius: 100 }}
            source={props.user.avatar}
            contentFit="cover"
          />
          <Heading mt={5}>{props.user.name}</Heading>
          <Heading color="gray.500" size="xs">
            @{props.user.username}
          </Heading>
        </View>
        <HStack w="100%" px="20" py={5} justifyContent="space-between">
          <View>
            <Heading textAlign="center" fontSize={15}>
              {props.user.following}
            </Heading>
            <Text color="gray.500">siguiendo</Text>
          </View>
          <View>
            <Heading textAlign="center" fontSize={15}>
              {props.user.followers}
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
              return <ItemList item={item} navigation={props.navigation} />;
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        ) : (
          <ScreenLoader />
        )}
        {isSheetOpened && (
          <BottomSheetProfile
            handleCloseSheet={onCloseSheet}
            navigation={props.navigation}
          />
        )}
      </View>
    </>
  );
};

export default PostsPage;
