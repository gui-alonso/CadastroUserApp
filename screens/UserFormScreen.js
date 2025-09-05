import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, SafeAreaView } from "react-native";

export default function UserFormScreen({ route, navigation }) {
  const { setUsers } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    
    setUsers((prev) => [
      ...prev,
      { id: Date.now().toString(), name, email, password }
    ]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button 
          title="Salvar" 
          onPress={handleSave} 
        />
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
    padding: 20,
    justifyContent: 'center', 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});