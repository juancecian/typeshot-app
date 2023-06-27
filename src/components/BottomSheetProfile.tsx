import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { View, Text } from 'native-base';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { auth } from '../config/firebase.config';
import { RedirectContext } from '../context/AppContext';
import { CommonActions } from '@react-navigation/native';

interface Props {
  handleCloseSheet: () => void;
  navigation: any;
}

const BottomSheetProfile = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { onRedirectRouteChange } = useContext(RedirectContext);
  // variables
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  const handleSheetChange = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.close();
      props.handleCloseSheet();
    }
  }, []);

  const resetAction = CommonActions.reset({
    index: 0, // Índice de la ruta que quieres establecer como activa
    routes: [{ name: 'Login' }]
  });

  const logout = async () => {
    try {
      await auth.signOut();
      props.navigation.dispatch(resetAction);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetView>
          <TouchableOpacity onPress={logout}>
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default BottomSheetProfile;
