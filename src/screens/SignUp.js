import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = props => {
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSignUp = async values => {
    try {
      const id = values.phone;
      const newUser = { [id]: values };
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      const updatedUsers = [...users, newUser];
      console.log(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      props.switchScreen()

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik
      initialValues={{ fullName: '', email: '', phone: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={{ marginTop: 10 }}>
          <View style={styles.inputView}>
            <IconButton
              style={{ paddingHorizontal: 4, width: 30 }}
              icon="account"
              type="font-awesome"
              iconColor="#fff"
              size={22}
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#f1f2f6"
              textContentType="name"
              autoCompleteType="name"
              returnKeyType="next"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
            />
          </View>
          {errors.fullName && touched.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

          <View style={styles.inputView}>
            <IconButton
              style={{ paddingHorizontal: 4, width: 30 }}
              icon="email"
              type="font-awesome"
              iconColor="#fff"
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
          {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.inputView}>
            <IconButton
              style={{ paddingHorizontal: 4, width: 30 }}
              icon="phone"
              type="font-awesome"
              iconColor="#fff"
              size={22}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              placeholderTextColor="#f1f2f6"
              keyboardType="phone-pad"
              returnKeyType="next"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
          </View>
          {errors.phone && touched.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <View style={styles.inputView}>
            <IconButton
              style={{ paddingHorizontal: 4, width: 30 }}
              icon="key"
              type="font-awesome-5"
              iconColor="#fff"
              size={22}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#f1f2f6"
              secureTextEntry={!showRegisterPassword}
              textContentType="password"
              returnKeyType="done"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <TouchableOpacity
              style={{ paddingVertical: 4 }}
              onPress={() => setShowRegisterPassword(!showRegisterPassword)}
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
          {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View>
            <Text style={{ marginHorizontal: 20, marginTop: 30, fontSize: 18, color: '#fff', fontFamily: 'NSBold' }}>
              Or Register with
            </Text>
            <View style={[styles.socialLoginView, { marginTop: 14, justifyContent: 'flex-start' }]}>
              <TouchableOpacity style={[styles.socialLoginTouchable, { marginLeft: 0 }]}>
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
        </View>
      )}
    </Formik>
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
