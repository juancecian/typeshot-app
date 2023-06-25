import { Heading, Spinner, View, useColorMode } from 'native-base';
import React, { useContext, useEffect } from 'react';
import { RedirectContext } from '../context/AppContext';

interface Props {
  navigation: any;
}
const ScreenLoader = (props: Props) => {
  const { colorMode } = useColorMode();
  const { redirectRoute } = useContext(RedirectContext);

  useEffect(() => {
    if (redirectRoute && redirectRoute.length > 0) {
      props.navigation.navigate(redirectRoute);
    }
  }, [redirectRoute]);

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg={colorMode === 'light' ? 'warmGray.50' : 'coolGray.800'}
    >
      <Heading
        color={colorMode === 'light' ? 'muted.800' : 'muted.200'}
        fontSize="md"
        fontWeight={600}
      >
        Cargando..
      </Heading>
      <Spinner size="lg" mt={5} />
    </View>
  );
};

export default ScreenLoader;
