import { Avatar, Box, HStack, VStack, Text, Spacer } from 'native-base';
import { UserModel } from '../models/user.model';
import Animated from 'react-native-reanimated';

interface Props {
  navigation: any;
  item: any;
  scale?: any;
  opacity?: any;
}

const ItemList = (props: Props) => {
  const { scale, opacity } = props;
  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <Box flex={1} bg="coolGray.700" rounded={10} p="3" my="1">
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar
            size="48px"
            source={{
              uri: props.item.author.avatar
            }}
          />
          <VStack>
            <Text
              _dark={{
                color: 'warmGray.50'
              }}
              color="coolGray.800"
              bold
            >
              {props.item.author.username}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200'
              }}
            >
              {props.item.text}
            </Text>
          </VStack>
          <Spacer />
          {/* <Text fontSize="xs" _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" alignSelf="flex-start">
                        {props.item.timeStamp}
                      </Text> */}
        </HStack>
      </Box>
    </Animated.View>
  );
};

export default ItemList;
