import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { API_BASE_URL } from "../constants/api";

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Endpoint da API de listagem de usuários
  const API_URL = `${API_BASE_URL}/api/users`;

  // Função para buscar os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.error("Erro ao buscar usuários:", data.error);
        Alert.alert("Erro", "Não foi possível carregar a lista de usuários.");
      }
    } catch (error) {
      console.error("Erro ao conectar à API:", error);
      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor. Verifique se o servidor está rodando."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Busca os usuários quando a tela é carregada
    const unsubscribe = navigation.addListener("focus", () => {
      fetchUsers();
    });

    return unsubscribe;
  }, [navigation]);

  // Função para lidar com a exclusão de um usuário
  const handleDelete = async (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja deletar este usuário?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
              });
              const data = await response.json();

              if (response.ok) {
                Alert.alert("Sucesso", data.message);
                fetchUsers(); // Atualiza a lista
              } else {
                Alert.alert("Erro", data.error || "Algo deu errado ao deletar.");
              }
            } catch (error) {
              console.error("Erro ao deletar usuário:", error);
              Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/logout`, { method: "POST" });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Não foi possível fazer logout. Tente novamente.");
    }
  };

  // Renderiza um item da lista
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTextBold}>Nome: {item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>ID: {item.id}</Text>
        <Text>Role: {item.role}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("UserForm", { user: item })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Painel de Admin</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("UserForm")}
      >
        <Text style={styles.addButtonText}>Adicionar Novo Usuário</Text>
      </TouchableOpacity>

      {isLoading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemTextBold: {
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});