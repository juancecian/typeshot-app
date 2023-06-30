import { Box, Text } from 'native-base';
import React from 'react';

interface Props {
  color: string;
  text: string;
  textColor?: string;
}

const Toast = (props: Props) => {
  return (
    <Box bg={props.color} px="2" py="1" rounded="sm" mb={5}>
      <Text color={props.textColor ? props.textColor : 'white'}>
        {props.text}
      </Text>
    </Box>
  );
};

export default Toast;
