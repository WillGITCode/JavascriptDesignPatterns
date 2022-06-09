class Iterator {
  constructor(items) {
    if (!items) {
      throw new Error("Iterator accepts only valid items");
    }
    this.index = 0;
    this.items = items;
  }
  next() {
    return this.items[this.index++];
  }

  hasNext() {
    return this.index < this.items.length;
  }
}
