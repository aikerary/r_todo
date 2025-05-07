export default class GetTodosUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute() {
    return this.todoRepository.getAll();
  }
}
