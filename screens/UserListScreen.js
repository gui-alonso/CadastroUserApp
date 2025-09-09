import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import UserItem from '../components/UserItem';
import { useIsFocused } from '@react-navigation/native';

export default function UserListScreen({ navigation }) {
    const [users, setUsers] = useState([
        {id: 1, name: "João Silva", email: "joao@example.com", password: "123456"},
        {id: 2, name: "Guilherme", email: "guilherme@example.com", password: "12345678"},
    ]);

    const isFocused = useIsFocused();

    // Este useEffect é acionado quando a tela ganha foco
    // Ele verifica se há um novo usuário a ser adicionado
    useEffect(() => {
        if (isFocused && navigation.getState().routes[1]?.params?.newUser) {
            const newUser = navigation.getState().routes[1].params.newUser;
            setUsers(prevUsers => [...prevUsers, newUser]);
            // Limpa o parâmetro para não adicionar o mesmo usuário novamente
            delete navigation.getState().routes[1].params.newUser;
        }
    }, [isFocused]);

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <UserItem name={item.name} email={item.email} password={item.password} />
                    )}
                />

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
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
    }
});