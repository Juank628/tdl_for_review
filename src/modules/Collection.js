export default class Collection {
  constructor(localStorageItem, items) {
    this.localStorageItem = localStorageItem;
    this.items = items || [];
  }

  addItem = (description) => {
    const completed = false;
    const index = this.items.length + 1;
    this.items.push({
      description,
      completed,
      index,
    });
    this.saveInLocalStorage()
  };

  removeItem = (index) => {
    const arrayIndexToDelete = index - 1;
    this.items.splice(arrayIndexToDelete, 1);
    const newItems = this.items.map((item, index) => ({ ...item, index: index + 1 }));
    this.items = newItems;
    this.saveInLocalStorage()
  };

  updateItem = (index, property, value) => {
    const newItems = this.items.map((item) => {
      if (item.index === parseInt(index, 10)) {
        item[property] = value;
      }
      return item;
    });
    this.items = newItems;
    this.saveInLocalStorage();
  };

  getItems = () => this.items.sort((a, b) => a.index - b.index);

  removeAllCompleted = () => {
    this.items = this.items.filter((item) => item.completed === false);
    const newItems = this.items.map((item, index) => ({ ...item, index: index + 1 }));
    this.items = newItems;
    this.saveInLocalStorage()
  }

  saveInLocalStorage = () => {
    this.items.sort((a, b) => a.index - b.index);
    localStorage.setItem(this.localStorageItem, JSON.stringify(this.items));
  }
}
