export default class Card {
  constructor(name, imgLink, selectorsCard) {
    this.name = name;
    this.imgLink = imgLink;
    this._templateSelector = selectorsCard.cardTemplateSelector;
    this._cardImageSelector = selectorsCard.cardImageSelector;
    this._cardNameSelector = selectorsCard.cardNameSelector;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateSelector);
    const element = card.cloneNode(true).content;

    return element;
  }

  geneterateCard() {
    const cardTemplate = this._getTemplate();

    cardTemplate.querySelector(this._cardImageSelector).src = this.imgLink;
    cardTemplate.querySelector(this._cardImageSelector).alt = this.name;
    cardTemplate.querySelector(this._cardNameSelector).innerText = this.name;

    return cardTemplate;
  }
}