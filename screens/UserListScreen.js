import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import UserItem from "../components/UserItem";

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([
    { id: "1", name: "João Silva", email: "joao@email.com" },
    { id: "2", name: "Maria Souza", email: "maria@email.com" },
    { id: "3", name: "Guilherme", email: "guilherme@test.com", password: "123" },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserItem name={item.name} email={item.email} password={item.password} />
          )}
        />
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate("UserForm", { setUsers })}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 20,
    paddingBottom: 20, 
  },
  userItem: { 
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
