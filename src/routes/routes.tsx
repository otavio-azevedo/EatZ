import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import OffersCatalogScreen from '../screens/OffersCatalog';

export default function Routes() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000000',
        }}
      >
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ title: 'Cadastro' }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='OffersCatalog'
          component={OffersCatalogScreen}
          options={{ title: 'Ofertas disponíveis', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
