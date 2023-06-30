import React from 'react';
import { Heading, Text, View } from 'native-base';
import { Dimensions } from 'react-native';

const Brithday = () => {
  return (
    <View flex={1} w={Dimensions.get('screen').width} alignItems="center">
      <View mt="10%">
        <Heading fontSize={15} textAlign="center">
          Tu perfil se verá más presentable con una foto, así todos podrán
          conocerte
        </Heading>
        <Heading mt={10} fontWeight={400} fontSize={15} textAlign="center">
          Sube una foto de perfil para conocer más personas
        </Heading>
      </View>
    </View>
  );
};

export default Brithday;
