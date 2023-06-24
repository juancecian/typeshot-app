import { Avatar, Box, HStack, VStack, Text, Spacer } from 'native-base';
import { UserModel } from '../models/user.model';

interface Props {
  navigation: any;
  item: any;
}

const ItemList = (props: Props) => {
  return (
    <Box
      borderBottomWidth="0.2"
      _dark={{
        borderColor: 'muted.50'
      }}
      borderColor="muted.800"
      p="3"
    >
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
  );
};

export default ItemList;
