import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';

const Header = props => {

  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: 5,
          top: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          width: 70,
          height: 35,
          borderRadius: 10,
        }}>
        <Appbar.Content
          color="white"
          title={props?.route?.name ? props?.route?.name : ''}
          style={{}}
          titleStyle={{
            fontSize: 16,
            marginLeft: 10,
            textAlignVertical: 'center',
          }}
        />
      </View>
      <View style={{position: 'absolute', right: 5, top: 5}}>
        <Appbar.Action icon="cart" iconColor="white" onPress={()=>{}} />
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent black
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
