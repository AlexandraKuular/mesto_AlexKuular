export default class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  render(items) {
    items.forEach(item => {
      this._renderer(item);
    }); 
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}