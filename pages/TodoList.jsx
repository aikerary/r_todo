import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, Appbar } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";

// Import layers
import todoRepositoryInstance from "../src/data/repositories/repositoryInstance"; // Correct: Using the shared instance
import GetTodosUseCase from "../src/application/usecases/GetTodosUseCase";
import AddTodoUseCase from "../src/application/usecases/AddTodoUseCase";

// Use the shared repository instance - THIS IS THE CORRECT BLOCK
const todoRepository = todoRepositoryInstance;
const getTodosUseCase = new GetTodosUseCase(todoRepository);
const addTodoUseCase = new AddTodoUseCase(todoRepository);

export default function TodoList() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to detect if the screen is focused
  const [data, setData] = useState([]);

  const loadTodos = useCallback(async () => {
    const todos = await getTodosUseCase.execute(); // Ensure this uses the correctly defined getTodosUseCase
    setData(todos);
  }, []);

  useEffect(() => {
    // Load todos when the screen is focused (e.g., after coming back from edit screen)
    if (isFocused) {
      loadTodos();
    }
  }, [loadTodos, isFocused]);

  const handleEditItem = (itemId) => {
    navigation.navigate("TodoEdit", { itemId });
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleEditItem(item.id)}>
      <View style={[styles.item, item.completed && styles.itemCompleted]}>
        <Text
          style={[styles.itemText, item.completed && styles.itemTextCompleted]}
        >
          {item.name}
        </Text>
      </View>
    </Pressable>
  );

  const addNewItem = () => {
    navigation.navigate("TodoEdit"); // Navigate without itemId for a new item
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Todo List" titleStyle={styles.appBarTitle} />
      </Appbar.Header>
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          extraData={data} // Ensure FlatList re-renders when data changes
        />
        <FAB
          style={styles.fab}
          icon="plus"
          color="white"
          onPress={addNewItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5" // Light gray background for the whole screen
  },
  appBar: {
    backgroundColor: "#6200ee" // Primary color for app bar
  },
  appBarTitle: {
    color: "white",
    fontWeight: "bold"
  },
  content: {
    flex: 1
  },
  listContentContainer: {
    padding: 16
  },
  item: {
    marginVertical: 8,
    padding: 16, // Increased padding
    backgroundColor: "white", // White background for items
    borderRadius: 8, // Rounded corners
    borderWidth: 1,
    borderColor: "#e0e0e0", // Light border color
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41
  },
  itemCompleted: {
    backgroundColor: "#e8eaf6", // Lighter background for completed items
    borderColor: "#c5cae9"
  },
  itemText: {
    fontSize: 16,
    color: "#333"
  },
  itemTextCompleted: {
    textDecorationLine: "line-through",
    color: "#757575" // Grayer text for completed items
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#6200ee"
  }
});
