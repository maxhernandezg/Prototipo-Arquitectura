import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Se importan las pantallas
import LoginScreen from './src/screens/LoginScreen';
import BookStoreScreen from './src/screens/BookStoreScreen';
import ReservationsScreen from './src/screens/ReservationsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Agrega más pantallas aquí */}
        <Stack.Screen name="BookStore" component={BookStoreScreen} />
        <Stack.Screen name="Reservations" component={ReservationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
