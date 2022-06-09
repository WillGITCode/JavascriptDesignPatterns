class View {
  constructor(rootElement = null) {
    this.root = this.getElement(rootElement);
    if (!this.root) {
      throw new Error("View: root element not found");
    }
    this.html = "";
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = this.html;
  }
}
