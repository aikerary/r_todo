export default class ToggleTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(todoId) {
    return this.todoRepository.toggleComplete(todoId);
  }
}
