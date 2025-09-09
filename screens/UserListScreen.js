import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import UserItem from '../components/UserItem';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../constants/api';

export default function UserListScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //const API_URL = 'http://192.168.2.19:3000/api/users'; // Altere para o IP do seu computador
    const API_URL = `${API_BASE_URL}/api/users`;

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
                setError(null);
            } else {
                setError('Erro ao carregar usuários: ' + (data.error || data.message));
                console.error(data);
            }
        } catch (err) {
            setError('Não foi possível conectar ao servidor. Verifique a sua conexão.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza de que deseja deletar este usuário?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Deletar", 
                    onPress: async () => {
                        try {
                            const response = await fetch(`${API_URL}/${id}`, {
                                method: 'DELETE',
                            });

                            if (response.ok) {
                                Alert.alert("Sucesso", "Usuário deletado com sucesso!");
                                fetchUsers(); // Recarrega a lista
                            } else {
                                const data = await response.json();
                                Alert.alert("Erro", data.error || "Não foi possível deletar o usuário.");
                            }
                        } catch (err) {
                            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
                        }
                    }
                }
            ]
        );
    };

    useFocusEffect(
        useCallback(() => {
            fetchUsers();
        }, [])
    );

    const renderUserItem = ({ item }) => (
        <View style={styles.userItemContainer}>
            <UserItem 
                name={item.name} 
                email={item.email} 
                onPress={() => navigation.navigate('UserForm', { user: item })}
            />
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteUser(item.id)}
            >
                <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
        }
        if (error) {
            return <Text style={styles.errorText}>{error}</Text>;
        }
        if (users.length === 0) {
            return <Text style={styles.emptyListText}>Nenhum usuário cadastrado.</Text>;
        }
        
        return (
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUserItem}
            />
        );
    };

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {renderContent()}
                <TouchableOpacity 
                    style={styles.fab} 
                    onPress={() => navigation.navigate('UserForm')}
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
        justifyContent: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    deleteButton: {
        padding: 10,
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        elevation: 8,
    },
    fabText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
    },
});