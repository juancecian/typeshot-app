import React, { useState } from 'react';
import { Button, Heading, Spinner, Text, View } from 'native-base';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

const ProfilePhoto = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingImage(false);
    }
  };
  return (
    <View flex={1} w={Dimensions.get('screen').width} p={1} alignItems="center">
      <View mt="10%">
        <Heading fontSize={15} textAlign="center">
          Tu perfil se verá más presentable con una foto, así todos podrán
          conocerte
        </Heading>
        <Heading mt={10} fontWeight={400} fontSize={15} textAlign="center">
          Sube una foto de perfil para conocer más personas
        </Heading>
        <View mt={5}>
          <Button
            leftIcon={<Ionicons name="cloud-upload" size={25} color="white" />}
            size="sm"
            onPress={pickImage}
          >
            Subir foto de perfil
          </Button>
        </View>
        <View mt={5}>
          {isLoadingImage && <Spinner size="sm" />}
          {!isLoadingImage && selectedImage && (
            <>
              <Image
                source={selectedImage}
                style={{
                  width: '100%',
                  height: '80%',
                  borderRadius: 5
                }}
              />
              <Heading
                onPress={() => setSelectedImage('')}
                fontSize={13}
                textAlign="center"
                fontWeight={400}
                underline
              >
                Eliminar foto
              </Heading>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfilePhoto;
