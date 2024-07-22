import React, {useEffect, useState} from 'react';
import {BackHandler, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../themes/commonstyle';
import ProductCard from '../mainNavigation/productCard';
import {Modal, Portal} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = props => {
  const [exitDialogVisible, setExitDialogVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const backAction = () => {
        setExitDialogVisible(true);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      // Cleanup function
      return () => backHandler.remove();
    }
  }, [isFocused]);

  const handleCancel = () => {
    setExitDialogVisible(false);
  };

  const handleExit = () => {
    BackHandler.exitApp();
  };
  return (
    <>
      <Portal>
        <Modal
          visible={exitDialogVisible}
          onDismiss={() => {
            setExitDialogVisible(false);
          }}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            height: 150,
            marginHorizontal: 30,
            borderWidth: 0.5,
            borderColor: '#E44D26',
            borderRadius: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, textAlign: 'center', marginBottom: 20}}>
            Do you want to exit the app?
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={handleExit} style={{padding: 10}}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={{padding: 10}}>
              <Text style={{color: 'green', fontWeight: 'bold'}}>No</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      <LinearGradient
        colors={['#E44D26', '#F16529']}
        style={commonStyle.pageContainer}>
        <ProductCard />
      </LinearGradient>
    </>
  );
};

export default HomeScreen;
