import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import LoginSignup from '../screens/LoginSignup';
import Header from '../componnent/Header';
import CheckoutPage from '../screens/CheckoutPage';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    const determineInitialRoute = async () => {
      const loginStatus = await AsyncStorage.getItem('login');
      const isLoggedIn = loginStatus && JSON.parse(loginStatus) === true;
      setInitialRouteName(isLoggedIn ? 'Home' : 'LoginSignup');
    };

    determineInitialRoute();
  }, []);

  if (!initialRouteName) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ header: props => <Header {...props} /> }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginSignup"
          component={LoginSignup}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutPage}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
