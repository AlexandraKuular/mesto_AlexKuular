export default class Card {
  constructor(name, imgLink, selectorsCard, onOpenImage) {
    this.name = name;
    this.imgLink = imgLink;
    this._templateSelector = selectorsCard.cardTemplateSelector;
    this._cardImageSelector = selectorsCard.cardImageSelector;
    this._cardNameSelector = selectorsCard.cardNameSelector;

    this.cardTemplate = this._getTemplate();
    this.cardImage = this.cardTemplate.querySelector('.card__image');

    this.cardImage.addEventListener('click', () => {
      onOpenImage(this.name, this.imgLink);
    });
    
  }

  _getTemplate() {
    const card = document.querySelector(this._templateSelector);
    const element = card.cloneNode(true).content;

    return element;
  }

  geneterateCard() {

    this._btnDelete = this.cardTemplate.querySelector('.card__delete');
    this._btnLike = this.cardTemplate.querySelector('.card__like');

    this.cardTemplate.querySelector(this._cardImageSelector).src = this.imgLink;
    this.cardTemplate.querySelector(this._cardImageSelector).alt = this.name;
    this.cardTemplate.querySelector(this._cardNameSelector).innerText = this.name;

    this._addEventListener();

    return this.cardTemplate;
  }

  _likeCard() {
    this._btnLike.classList.toggle('card__like_active');
  }
  _deleteCard() {
    this._btnDelete.closest('.card').remove();
  }

  _addEventListener() {
    this._btnLike.addEventListener('click', () => this._likeCard());
    this._btnDelete.addEventListener('click', () => this._deleteCard());
  }
}