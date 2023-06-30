import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'native-base';
import React, { useRef } from 'react';
import Animated from 'react-native-reanimated';
import ProfilePhoto from './steps/ProfilePhoto';
import Brithday from './steps/Brithday';
import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('screen');

const DATA = [
  { index: '0', component: <ProfilePhoto /> },
  { index: '1', component: <Brithday /> }
];

const Indicator = ({ scrollX }: { scrollX: any }) => {
  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
        alignSelf: 'center'
      }}
    >
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp'
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp'
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#333',
              margin: 5,
              transform: [{ scale }],
              opacity
            }}
          />
        );
      })}
    </View>
  );
};

const CompleteProfileScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar hidden={Platform.OS === 'ios'} style="inverted" />
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.index}
          horizontal
          pagingEnabled
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => item.component}
        />
        <Indicator scrollX={scrollX} />
      </View>
    </>
  );
};

export default CompleteProfileScreen;
