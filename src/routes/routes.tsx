import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import OffersCatalogScreen from '../screens/OffersCatalog';
import OfferRegisterScreen from '../screens/OfferRegister';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthentication } from '../contexts/authentication';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RoleEnum } from '../types/roles/roleEnum';
import ConsumerProfileScreen from '../screens/ConsumerProfile';
import MyOrdersScreen from '../screens/MyOrders';
import CompanyProfileScreen from '../screens/CompanyProfile';
import SignOutHeader from '../components/SignOutHeader';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LoginRoutes() {
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='StoreRegister'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ConsumerAppTabRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: '#2E8494',
          tabBarInactiveTintColor: '#C7C7C7',
          tabBarLabelStyle: { marginBottom: 2 },
          headerStyle: {
            backgroundColor: '#fff',
          },
        })}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <Icon
                name='globe'
                size={26}
                color={focused ? '#2E8494' : '#C7C7C7'}
              />
            ),
          }}
        />
        <Tab.Screen
          name='OffersCatalog'
          component={OffersCatalogScreen}
          options={{
            title: 'Ofertas disponíveis',
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <Icon
                name='search'
                size={26}
                color={focused ? '#2E8494' : '#C7C7C7'}
              />
            ),
          }}
        />

        <Tab.Screen
          name='MyOrdersScreen'
          component={MyOrdersScreen}
          options={{
            title: 'Meus Pedidos',
            headerShown: true,
            tabBarLabel: 'Pedidos',
            tabBarIcon: ({ focused }) => (
              <Icon
                name='list-alt'
                size={26}
                color={focused ? '#2E8494' : '#C7C7C7'}
              />
            ),
          }}
        />

        <Tab.Screen
          name='ConsumerProfile'
          component={ConsumerProfileScreen}
          options={{
            title: 'Perfil',
            headerShown: true,
            headerRight: () => <SignOutHeader />,
            tabBarIcon: ({ focused }) => (
              <Icon
                name='user'
                size={26}
                color={focused ? '#2E8494' : '#C7C7C7'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function CompanyAppTabRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: '#2E8494',
          tabBarInactiveTintColor: '#C7C7C7',
          tabBarLabelStyle: { marginBottom: 2 },
          headerStyle: {
            backgroundColor: '#fff',
          },
        })}
      >
        <Tab.Screen
          name='OfferRegister'
          component={OfferRegisterScreen}
          options={{
            headerShown: true,
            title: 'Gestão de Ofertas',
            tabBarLabel: 'Ofertas',
            tabBarIcon: ({ focused }) => (
              <Icon
                name='list'
                size={26}
                color={focused ? '#2E8494' : '#C7C7C7'}
              />
            ),
          }}
        />

        <Tab.Screen
          name='MyOrdersScreen'
          component={MyOrdersScreen}
          options={{
            title: 'Meus Pedidos',
            headerShown: true,
            tabBarLabel: 'Pedidos',
            tabBarIcon: ({ focused }) => (
              <Icon
                name='list-alt'
                size={26}
                color={focused ? '#2E8494' : '#C7C7C7'}
              />
            ),
          }}
        />

        <Tab.Screen
          name='CompanyProfile'
          component={CompanyProfileScreen}
          options={{
            title: 'Perfil',
            headerShown: true,
            headerRight: () => <SignOutHeader />,
            tabBarIcon: ({ focused }) => (
              <Icon
                name='user'
                size={26}
                color={focused ? '#2E8494' : '#C7C7C7'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function Routes() {
  const { authenticated, userRole } = useAuthentication();

  return authenticated ? (
    userRole == RoleEnum.Consumer ? (
      <ConsumerAppTabRoutes />
    ) : (
      <CompanyAppTabRoutes />
    )
  ) : (
    <LoginRoutes />
  );
}
