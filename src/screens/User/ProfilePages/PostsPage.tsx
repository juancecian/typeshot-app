import {
  FlatList,
  HStack,
  HamburgerIcon,
  Heading,
  Menu,
  Pressable,
  Spinner,
  Text,
  VStack,
  View,
  useColorMode
} from 'native-base';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PostModel } from '../../../models/post.model';
import { UserContext } from '../../../context/AppContext';
import ItemList from '../../../components/ItemList';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { getPosts } from '../../../core/services/post.service';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { setStatusBarStyle } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheetProfile from '../../../components/BottomSheetProfile';

interface Props {
  navigation: any;
}

const PostsPage = (props: Props) => {
  const { user } = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [postsData, setPostsData] = useState<PostModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isSheetOpened, setIsSheetOpened] = useState(false);

  const getPostData = async () => {
    try {
      if (user) {
        const data = await getPosts([user.id]);
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
        <View style={{ position: 'absolute', right: 30 }}>
          <Ionicons
            name={colorMode === 'light' ? 'ios-moon' : 'sunny'}
            size={20}
            color={colorMode === 'light' ? 'black' : 'white'}
            onPress={toggleColorMode}
          />
        </View>

        <View style={{ position: 'absolute', left: 30 }}>
          <TouchableOpacity onPress={handleSheet}>
            <HamburgerIcon size={18} />
          </TouchableOpacity>
        </View>
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
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
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
