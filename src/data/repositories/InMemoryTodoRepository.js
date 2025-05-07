import TodoRepository from "../../domain/repositories/TodoRepository";
import Todo from "../../domain/entities/Todo";

export default class InMemoryTodoRepository extends TodoRepository {
  constructor() {
    super();
    this.todos = [new Todo(1, "Item 1 (from repo)")];
    this.nextId = 2;
  }

  async getAll() {
    return [...this.todos];
  }

  async add(todoName) {
    const newTodo = new Todo(this.nextId++, todoName);
    this.todos.push(newTodo);
    return newTodo;
  }

  async toggleComplete(todoId) {
    const todo = this.todos.find((t) => t.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
      return todo;
    }
    return null; // Or throw an error if todo not found
  }

  async getById(todoId) {
    const todo = this.todos.find((t) => t.id === todoId);
    return todo ? { ...todo } : null; // Return a copy
  }

  async update(updatedTodo) {
    const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...updatedTodo };
      return { ...this.todos[index] }; // Return a copy
    }
    return null; // Or throw an error
  }
}
