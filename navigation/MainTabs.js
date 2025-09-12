import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserListScreen from '../screens/UserListScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const LogoutButton = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    // Apenas navega de volta para a tela de login
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Sair</Text>
    </TouchableOpacity>
  );
};

export default function MainTabs({ route }) {
  const { user } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Usuários') {
            iconName = focused ? 'people' : 'people-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerRight: () => <LogoutButton />,
        headerTitleAlign: 'left',
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        },
      })}
    >
      <Tab.Screen
        name="Início"
        component={WelcomeScreen}
        initialParams={{ user }}
        options={{ title: 'Bem-vindo' }}
      />
      {user.role === 'admin' && (
        <Tab.Screen
          name="Usuários"
          component={UserListScreen}
          options={{ title: 'Painel de Admin' }}
        />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    backgroundColor: '#d32f2f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});