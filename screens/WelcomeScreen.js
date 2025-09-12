import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { API_BASE_URL } from '../constants/api';

export default function WelcomeScreen({ route, navigation }) {
    // Pega o objeto do usuário que foi passado pela tela de login
    const { user } = route.params;

    const handleLogout = async () => {
        try {
            // Chamada à API para registrar o logout (mesmo que a rota seja simples)
            await fetch(`${API_BASE_URL}/api/logout`, { method: 'POST' });
            // Navega para a tela de Login
            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Painel de Usuário</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Seja bem-vindo,</Text>
                <Text style={styles.nameText}>{user.name}!</Text>
                <Text style={styles.roleText}>(Você está logado como {user.role})</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#d32f2f',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 28,
        color: '#333',
        marginBottom: 10,
    },
    nameText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    roleText: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },
});