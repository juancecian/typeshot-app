import { Spinner, View, useColorMode } from 'native-base';
import React from 'react';

const ScreenLoader = () => {
  const { colorMode } = useColorMode();

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
    >
      <Spinner size="lg" mt={5} />
    </View>
  );
};

export default ScreenLoader;
