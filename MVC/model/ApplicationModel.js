class ApplicationModel {
  constructor(todos = []) {
    this.localStorageService = new LocalStorageService();
    this.todos = this.localStorageService.getCachedTodos();
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      title: todoText,
      completed: false,
    };

    this.todos.push(todo);
    this.localStorageService.setCachedTodos(this.todos);
    this.onTodoListChanged(this.todos);
  }

  editTodo(todoId, todoText) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.title = todoText;
      }
      return todo;
    });
    this.localStorageService.setCachedTodos(this.todos);
    this.onTodoListChanged(this.todos);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.localStorageService.setCachedTodos(this.todos);
    this.onTodoListChanged(this.todos);
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: todo.text, completed: !todo.completed }
        : todo
    );
    this.localStorageService.setCachedTodos(this.todos);
    this.onTodoListChanged(this.todos);
  }
}
