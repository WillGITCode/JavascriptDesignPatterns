class LocalStorageService {
  constructor() {
    this._cacheKey = "todo-mvc";
  }
  getCachedTodos() {
    const cachedTodos = localStorage.getItem(this._cacheKey);
    if (!cachedTodos) {
      return null;
    }
    return JSON.parse(cachedTodos);
  }

  setCachedTodos(todos) {
    localStorage.setItem(this._cacheKey, JSON.stringify(todos));
  }
}
