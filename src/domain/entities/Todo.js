export default class Todo {
  constructor(id, name, completed = false) {
    this.id = id;
    this.name = name;
    this.completed = completed;
  }
}
