import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa as telas
import UserListScreen from './screens/UserListScreen';
import UserFormScreen from './screens/UserFormScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen'; // Importa a nova tela

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login', headerShown: false }}
        />
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{ title: 'Lista de Usuários' }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserFormScreen}
          options={{ title: 'Formulário de Usuário' }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: 'Bem-vindo', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}