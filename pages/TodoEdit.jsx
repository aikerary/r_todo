import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { TextInput, Button, Appbar, Text, Card } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import layers & entities
import todoRepositoryInstance from "../src/data/repositories/repositoryInstance";
import AddTodoUseCase from "../src/application/usecases/AddTodoUseCase";
import GetTodoByIdUseCase from "../src/application/usecases/GetTodoByIdUseCase";
import UpdateTodoUseCase from "../src/application/usecases/UpdateTodoUseCase";
import Todo from "../src/domain/entities/Todo";

// Use the shared repository instance
const todoRepository = todoRepositoryInstance;
const addTodoUseCase = new AddTodoUseCase(todoRepository);
const getTodoByIdUseCase = new GetTodoByIdUseCase(todoRepository);
const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);

export default function TodoEditScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params || {};

  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (itemId) {
      setIsNew(false);
      const fetchTodo = async () => {
        const todo = await getTodoByIdUseCase.execute(itemId);
        if (todo) {
          setName(todo.name);
          setCompleted(todo.completed);
        }
      };
      fetchTodo();
    }
  }, [itemId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNew ? "Add New Todo" : "Edit Todo"
    });
  }, [navigation, isNew]);

  const handleSave = async () => {
    if (name.trim() === "") {
      // Simple validation
      alert("Todo name cannot be empty.");
      return;
    }

    if (isNew) {
      await addTodoUseCase.execute(name); // Assuming AddTodoUseCase now just takes name and InMemoryTodoRepository handles ID and default completion
    } else {
      const updatedTodo = new Todo(itemId, name, completed);
      await updateTodoUseCase.execute(updatedTodo);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isNew ? "Add Todo" : "Edit Todo"} />
        <Appbar.Action icon="content-save" onPress={handleSave} />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Todo Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          {!isNew && (
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Completed</Text>
              <Switch value={completed} onValueChange={setCompleted} />
            </View>
          )}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleSave} style={styles.button}>
            Save Todo
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  card: {
    margin: 16
  },
  input: {
    marginBottom: 16
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginBottom: 16
  },
  switchLabel: {
    fontSize: 16
  },
  button: {
    marginTop: 8
  }
});
