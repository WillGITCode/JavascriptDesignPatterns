class ApplicationController {
  constructor(model = null, view = null) {
    this.logger = Logger.getInstance();
    this.model = model;
    this.view = view;
    // render initial view + bind events
    this.onTodoListChanged(this.model.todos);
    // register model handlers
    this.model.bindTodoListChanged(todos=>this.onTodoListChanged(todos))
  }

  onTodoListChanged(todos) {
    this.view.render(todos);
    // register view handlers
    this.view.onAddTodo(todo=>this.model.addTodo(todo));
    this.view.onEditTodo((id, todo)=>this.model.editTodo(id, todo));
    this.view.onDeleteTodo(id=>this.model.deleteTodo(id));
    this.view.onToggleTodo(id=>this.model.toggleTodo(id));
  }
}

// Init MVC
const appController = new ApplicationController(
  new ApplicationModel(),
  new ApplicationView("#root")
);
