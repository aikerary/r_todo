import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TodoListScreen from "./pages/TodoList";
import TodoEditScreen from "./pages/TodoEdit"; // We will create this next

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoList">
          <Stack.Screen
            name="TodoList"
            component={TodoListScreen}
            options={{ headerShown: false }} // Hide header as TodoList has its own Appbar
          />
          <Stack.Screen
            name="TodoEdit"
            component={TodoEditScreen}
            options={{ title: "Edit Todo" }} // Title for the edit screen
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
