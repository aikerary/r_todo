export default class AddTodoUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(todoName) {
    return this.todoRepository.add(todoName);
  }
}
