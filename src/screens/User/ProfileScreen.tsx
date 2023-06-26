import { VStack, useColorMode } from 'native-base';
import { useContext, useState } from 'react';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { UserContext } from '../../context/AppContext';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import PostsPage from './ProfilePages/PostsPage';
import PhotosPage from './ProfilePages/PhotosPage';
import { useWindowDimensions } from 'react-native';

const renderScene = SceneMap({
  first: PostsPage,
  second: PhotosPage
});

const ProfileScreen = () => {
  const { colorMode } = useColorMode();
  const { user } = useContext(UserContext);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Publicaciones' },
    { key: 'second', title: 'Fotos' }
  ]);

  return (
    <Animated.View style={{ flex: 1 }} entering={ZoomIn.duration(500)}>
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
              indicatorStyle={{ backgroundColor: 'white' }}
              style={{
                backgroundColor:
                  colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'
              }}
            />
          )}
        />
      </VStack>
    </Animated.View>
  );
};

export default ProfileScreen;
