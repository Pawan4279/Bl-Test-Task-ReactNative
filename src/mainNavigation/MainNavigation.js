import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import LoginSignup from '../screens/LoginSignup';
import Header from '../componnent/Header';

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginSignup' screenOptions={{header: props => <Header {...props} />}}>
        <Stack.Screen
          options={{headerShown: false}}
          name="LoginSignup"
          component={LoginSignup}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
