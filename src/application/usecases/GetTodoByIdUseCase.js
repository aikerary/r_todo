export default class GetTodoByIdUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(todoId) {
    return this.todoRepository.getById(todoId);
  }
}
