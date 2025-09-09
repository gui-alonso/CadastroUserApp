import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, SafeAreaView, Alert } from "react-native";
import { API_BASE_URL } from "../constants/api";

export default function UserFormScreen({ route, navigation }) {
    // Verifica se a tela foi chamada para edição (se um usuário foi passado via parâmetros)
    const isEditing = route.params?.user;
    const initialUser = isEditing ? route.params.user : { id: null, name: '', email: '', password: '' };

    const [name, setName] = useState(initialUser.name);
    const [email, setEmail] = useState(initialUser.email);
    const [password, setPassword] = useState(''); 

    // URL da API. Lembre-se de trocar para o IP do seu computador se estiver usando um dispositivo físico.
    //const API_URL = 'http://192.168.2.19:3000/api/users'; 
    const API_URL = `${API_BASE_URL}/api/users`;

    // Altera o título da tela de acordo com a operação (criar ou editar)
    useEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Editar Usuário' : 'Novo Usuário',
        });
    }, [isEditing]);

    const handleSave = async () => {
        // Validação básica dos campos
        if (name.trim() === "" || email.trim() === "") {
            Alert.alert("Erro", "Nome e email são obrigatórios.");
            return;
        }

        // Monta o objeto com os dados para enviar à API
        const payload = {
            name,
            email,
            // Inclui a senha apenas se o usuário tiver digitado algo
            password: password.trim() ? password : undefined 
        };
        
        try {
            // Decide o endpoint e o método (POST para criar, PUT para editar)
            const endpoint = isEditing ? `${API_URL}/${initialUser.id}` : API_URL;
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Sucesso", isEditing ? "Usuário atualizado com sucesso!" : "Usuário cadastrado com sucesso!");
                navigation.goBack(); // Volta para a tela anterior (a lista)
            } else {
                Alert.alert("Erro", data.error || "Algo deu errado.");
            }
        } catch (error) {
            console.error("Erro ao conectar à API:", error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique se o servidor está rodando e se a URL da API está correta.");
        }
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
                    placeholder="Nova Senha (opcional)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button 
                    title={isEditing ? "Atualizar" : "Salvar"} 
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