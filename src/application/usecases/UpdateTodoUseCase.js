export default class UpdateTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(todo) {
    return this.todoRepository.update(todo);
  }
}
