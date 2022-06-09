class ApplicationView extends View {
  constructor(root) {
    super(root);
    this._fieldChangedDebounceId = null;
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  _getControlledElements() {
    this.form = this.getElement("#addTodoForm");
    this.input = this.getElement("#addTodoInput");
    this.todoList = this.getElement("#todoList");
  }

  onAddTodo(handler) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  onEditTodo(handler) {
    this.todoList.addEventListener("input", (event) => {
      if (event.target.className.indexOf("editable") > -1) {
        // cancel previous timeout if there is one
        if (this._fieldChangedDebounceId) {
          clearTimeout(this._fieldChangedDebounceId);
        }
        this._fieldChangedDebounceId = setTimeout(() => {
          const id = parseInt(event.target.parentElement.parentElement.id);
          handler(id, event.target.innerText);
        }, 750);
      }
    });
  }

  onDeleteTodo(handler) {
    this.todoList.addEventListener("click", (event) => {
      if (event.target.className.indexOf("delete") > -1) {
        const id = parseInt(event.target.parentElement.id);
        handler(id);
      }
    });
  }

  onToggleTodo(handler) {
    this.todoList.addEventListener("change", (event) => {
      if (event.target.type === "checkbox") {
        const id = parseInt(event.target.parentElement.parentElement.id);
        handler(id);
      }
    });
  }

  render(model) {
    this.root.innerHTML = this.generateHtml(model);
    this._getControlledElements();
  }

  generateHtml(model) {
    return `
    <section class="vh-100" style="background-color: #e2d5de;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
  
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
  
              <h6 class="mb-3">Awesome Todo List</h6>
  
              <form id="addTodoForm" class="d-flex justify-content-center align-items-center mb-4">
                <div class="form-outline flex-fill">
                  <input type="text" id="addTodoInput" class="form-control form-control-lg" />
                  <label class="form-label" for="addTodoInput">What do you need to do today?</label>
                </div>
                <button type="submit" class="btn btn-primary btn-lg ms-2">Add</button>
              </form>
  
              <ul id="todoList" class="list-group mb-0">
                ${model
                  .map(
                    (todo) => `
                    <li id="${
                      todo.id
                    }" class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                        <div class="d-flex align-items-center">
                            <input class="form-check-input me-2" type="checkbox" value="" ${
                              todo.completed ? 'checked="true"' : null
                            } aria-label="..." />
                            <span contenteditable="true" class="form-check-label editable">${
                              todo.title
                            }</span>
                        </div>
                        <button type="submit" class="btn btn-danger delete">Delete</button>
                    </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </section>  
      `;
  }
}
