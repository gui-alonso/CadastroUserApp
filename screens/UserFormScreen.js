import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, SafeAreaView, Alert } from "react-native";

export default function UserFormScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = () => {
        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        // CORREÇÃO: Navegando de volta para a tela de lista com o novo usuário como parâmetro
        navigation.navigate('UserList', { newUser });
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