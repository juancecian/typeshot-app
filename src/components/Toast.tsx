import { Box } from 'native-base';
import React from 'react';

interface Props {
  color: string;
  text: string;
}

const Toast = (props: Props) => {
  return (
    <Box bg={props.color} px="2" py="1" rounded="sm" mb={5}>
      {props.text}
    </Box>
  );
};

export default Toast;
