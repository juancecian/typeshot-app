import React, { useContext, useEffect, useRef, useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { UserContext } from '../../context/AppContext';
import ItemList from '../../components/ItemList';
import { getPosts } from '../../core/services/post.service';
import { PostModel } from '../../models/post.model';
import { RefreshControl } from 'react-native';
import {
  Spinner,
  VStack,
  View,
  useColorMode,
  Text,
  Heading,
  HStack,
  Badge,
  Avatar
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { app } from '../../config/firebase.config';

interface Props {
  navigation: any;
}
const db = getFirestore(app);

const HomeScreen = (props: Props) => {
  const { user } = useContext(UserContext);
  const { colorMode } = useColorMode();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [postsData, setPostsData] = useState<PostModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [haveNotifications, setHaveNotifications] = useState(false);

  useEffect(() => {
    setIsLoadingData(true);
    getPostData();
    getPermissions();
    listenNotificationEvent();
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

  const getPermissions = async () => {
    try {
      const settings = await Notifications.getPermissionsAsync();

      const permission =
        settings.granted ||
        settings.ios?.status ===
          Notifications.IosAuthorizationStatus.PROVISIONAL;

      if (!permission) {
        await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listenNotificationEvent = async () => {
    try {
      onSnapshot(
        query(
          collection(db, `Users/${user?.id}/notifications`),
          where('read', '==', false)
        ),
        (snapshot) => {
          if (snapshot.docs.length > 0) {
            setHaveNotifications(true);
          } else {
            setHaveNotifications(false);
          }
        }
      );
    } catch (error) {}
  };

  return (
    <VStack
      flex={1}
      bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
    >
      {!isLoadingData ? (
        <>
          <HStack
            w="100%"
            mt={20}
            py={3}
            space={10}
            justifyContent="flex-end"
            right={10}
          >
            <View>
              <Avatar.Badge
                position="absolute"
                bg="red.500"
                top={0}
                zIndex={1}
              />
              <Ionicons
                name={'chatbubbles-outline'}
                color={colorMode === 'light' ? 'black' : 'white'}
                size={25}
              />
            </View>
            <View>
              {haveNotifications && (
                <Animated.View
                  entering={FadeIn}
                  exiting={FadeOut}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 10,
                    zIndex: 1
                  }}
                >
                  <Avatar.Badge bg="red.500" />
                </Animated.View>
              )}
              <Ionicons
                name={'notifications-outline'}
                color={colorMode === 'light' ? 'black' : 'white'}
                size={25}
              />
            </View>
          </HStack>
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
              return <ItemList item={item} navigation={props.navigation} />;
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </>
      ) : (
        <VStack flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" mt={5} />
          <Heading
            color={colorMode === 'light' ? 'muted.800' : 'muted.200'}
            fontSize="md"
            fontWeight={600}
          >
            Cargando información..
          </Heading>
        </VStack>
      )}
    </VStack>
  );
};

export default HomeScreen;
