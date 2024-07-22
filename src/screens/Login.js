import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = props => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async values => {
    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      
      let isValidUser = false;
      
      users.forEach(user => {
        const userId = Object.keys(user)[0];
        const userData = user[userId];
        
        if (userData.email === values.email && userData.password === values.password) {
          isValidUser = true;
        }
      });

      if (isValidUser) {
        await AsyncStorage.setItem('login', JSON.stringify(true));
        props.navigation.navigate("Home")
      } else {
        alert('Invalid email or password');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={{ marginTop: 10 }}>
          <View style={styles.inputView}>
            <IconButton
              style={{ paddingHorizontal: 4 }}
              icon="email"
              iconColor="white"
              size={22}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#f1f2f6"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCompleteType="email"
              returnKeyType="next"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
          </View>
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <View style={styles.inputView}>
            <IconButton
              style={{ paddingHorizontal: 4 }}
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
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <TouchableOpacity
              style={{ paddingVertical: 4 }}
              onPress={() => {
                setShowLoginPassword(!showLoginPassword);
              }}
            >
              <IconButton
                style={{ paddingHorizontal: 4 }}
                icon="eye"
                type="font-awesome"
                iconColor="#fff"
                size={22}
              />
            </TouchableOpacity>
          </View>
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
      )}
    </Formik>
  );
};

export default Login;

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
  buttonText: {
    fontFamily: 'NSRegular',
    fontSize: 16,
    color: '#E44D26',
  },
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
  errorText: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 20,
    marginTop: 5,
  },
});
