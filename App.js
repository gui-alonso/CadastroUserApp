import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa as telas
import UserListScreen from './screens/UserListScreen';
import UserFormScreen from './screens/UserFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}