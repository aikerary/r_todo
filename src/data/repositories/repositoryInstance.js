import InMemoryTodoRepository from "./InMemoryTodoRepository";

// Create a singleton instance to be shared across components
const todoRepositoryInstance = new InMemoryTodoRepository();

export default todoRepositoryInstance;
