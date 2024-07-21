import React, {useState} from 'react';

import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text, IconButton} from 'react-native-paper';

const SignUp = props => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  return (
    <View style={{marginTop: 10}}>
      <View style={styles.inputView}>
        <IconButton
          style={{paddingHorizontal: 4}}
          icon="email"
          // type="font-awesome"
          iconColor="white"
          size={22}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#f1f2f6"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize={false}
          autoCompleteType="email"
          returnKeyType="next"
        />
      </View>
      <View style={styles.inputView}>
        <IconButton
          style={{paddingHorizontal: 4}}
          icon="key"
          type="font-awesome-5"
          iconColor="white"
          size={22}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#f1f2f6"
          secureTextEntry={!showLoginPassword}
          textContentType="password"
          returnKeyType="done"
        />
        <TouchableOpacity
          style={{paddingVertical: 4}}
          onPress={() => {
            setShowLoginPassword(!showLoginPassword);
          }}>
          <IconButton
            style={{paddingHorizontal: 4}}
            name="eye"
            type="font-awesome"
            color="#fff"
            size={22}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.socialLoginView}>
        <TouchableOpacity style={styles.socialLoginTouchable}>
          <IconButton icon="google" type="font-awesome" iconColor="#F16529" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginTouchable}>
          <IconButton icon="facebook" type="font-awesome" iconColor="#F16529" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginTouchable}>
          <IconButton icon="apple" type="font-awesome" iconColor="#F16529" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

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
  buttonText: {fontFamily: 'NSRegular', fontSize: 16, color: '#E44D26'},
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
