import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListScreen from "./screens/UserListScreen";
import UserFormScreen from "./screens/UserFormScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: "Usuários" }} />
        <Stack.Screen name="UserForm" component={UserFormScreen} options={{ title: "Cadastro" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}