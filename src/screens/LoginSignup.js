import React, { useState } from 'react';
import commonStyle from '../themes/commonstyle';
import Login from './Login';
import SignUp from './SignUp';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginSignup = props => {
    const [activeTab, setActiveTab] = useState('Login');
    function switchTab() {
        if (activeTab === 'Login') {
          setActiveTab('Register');
        } else {
          setActiveTab('Login');
        }
      }
  return (
    <LinearGradient
      colors={['#E44D26', '#F16529']}
      style={commonStyle.container}>
        <Text style={styles.welcomeText}>
          {activeTab === 'Login' ? 'Welcome Back' : 'Register Now'}
        </Text>
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab === 'Login' ? 4 : 0,
              borderBottomColor: '#fff',
              paddingHorizontal: 4,
              marginRight: 14,
            }}
            onPress={() => switchTab()}
          >
            <Text style={styles.switchText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab === 'Register' ? 4 : 0,
              borderBottomColor: '#fff',
              paddingHorizontal: 4,
              marginRight: 14,
            }}
            onPress={() => switchTab()}
          >
            <Text style={styles.switchText}>Register</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'Login' ? <Login navigation={props.navigation} /> : <SignUp switchScreen={()=>switchTab()}/>}
      </LinearGradient>
  );
};

export default LoginSignup;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
    },
    welcomeText: {
      alignSelf: 'center',
      fontSize: 40,
      fontFamily: 'NSLight',
      marginTop: 10,
      color: '#fff',
    },
    switchTabsView: {
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    switchText: {
      padding: 2,
      fontSize: 20,
      color: '#fff',
      fontFamily: 'NSExtraBold',
    },
    inputView: {
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
      marginTop: 10,
      marginHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      fontFamily: 'NSLight',
      paddingHorizontal: 4,
      color: '#fff',
    },
    button: {
      marginHorizontal: 20,
      backgroundColor: '#fafafa',
      marginTop: 12,
      paddingVertical: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: { fontFamily: 'NSRegular', fontSize: 16, color: '#E44D26' },
    forgotPasswordText: {
      marginHorizontal: 20,
      marginTop: 20,
      alignSelf: 'flex-end',
      color: '#fff',
      fontSize: 18,
      fontFamily: 'NSBold',
    },
    socialLoginView: {
      marginTop: 40,
      marginHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    socialLoginTouchable: {
      backgroundColor: '#fff',
      width: 40,
      height: 40,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 8,
    },
  });