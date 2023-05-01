export default class Section {
  constructor({renderer}, containerElement){
    this._renderer = renderer;
    this._containerElement = containerElement;
  }

  render(items) {
    items.forEach(item => {
      this._renderer(item);
    }); 
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}