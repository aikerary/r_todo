export default class TodoRepository {
  async getAll() {
    throw new Error("Method 'getAll()' must be implemented.");
  }

  async add(todo) {
    throw new Error("Method 'add()' must be implemented.");
  }

  async toggleComplete(todoId) {
    throw new Error("Method 'toggleComplete()' must be implemented.");
  }

  async getById(todoId) {
    throw new Error("Method 'getById()' must be implemented.");
  }

  async update(todo) {
    throw new Error("Method 'update()' must be implemented.");
  }
}
