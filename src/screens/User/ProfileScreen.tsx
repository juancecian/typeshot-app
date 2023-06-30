import { VStack, useColorMode } from 'native-base';
import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import PostsPage from './ProfilePages/PostsPage';
import PhotosPage from './ProfilePages/PhotosPage';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import rootReducer from '../../redux/rootReducer';

interface Props {
  navigation: any;
}

const ProfileScreen = (props: Props) => {
  const { colorMode } = useColorMode();
  const user = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.user
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Publicaciones' },
    { key: 'second', title: 'Fotos' }
  ]);

  const renderScene = SceneMap({
    first: () => <PostsPage navigation={props.navigation} user={user} />,
    second: PhotosPage
  });

  return (
    <>
      <Animated.View style={{ flex: 1 }}>
        <VStack
          flex={1}
          bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
        >
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            style={{ marginTop: '10%' }}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: colorMode === 'light' ? 'black' : 'white'
                }}
                style={{
                  backgroundColor:
                    colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'
                }}
                labelStyle={{
                  color: colorMode === 'light' ? 'black' : 'white'
                }}
              />
            )}
          />
        </VStack>
      </Animated.View>
    </>
  );
};

export default ProfileScreen;
