export default class Card {
  constructor({ name, imgLink, _id, owner, likes }, userId, selectorsCard, handleCardClick) {
    this.name = name;
    this.imgLink = imgLink;
    this._userId = userId;
    this._idCard = _id;
    this._idOwner = owner._id;
    this._likesLenght = likes.lenght;
    this._templateSelector = selectorsCard.cardTemplateSelector;
    this._cardImageSelector = selectorsCard.cardImageSelector;
    this._cardNameSelector = selectorsCard.cardNameSelector;
    this.cardTemplate = this._getTemplate();
    this._cardImage = this.cardTemplate.querySelector('.card__image');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateSelector);
    const element = card.cloneNode(true).content;

    return element;
  }

  geneterateCard() {
    this._btnDelete = this.cardTemplate.querySelector('.card__delete');
    this._btnLike = this.cardTemplate.querySelector('.card__like');
    this._likeNumber = this.cardTemplate.querySelector('.card__like-number');

    this.cardTemplate.querySelector(this._cardImageSelector).src = this.imgLink;
    this.cardTemplate.querySelector(this._cardImageSelector).alt = this.name;
    this.cardTemplate.querySelector(this._cardNameSelector).innerText = this.name;
    this._likeNumber.textContent = this._likesLenght;

    //удаление урны с карточки
    if (this._idOwner !== this._userId) {
      this._btnDelete.remove();
    }
    

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
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this.name, this.imgLink);
    });
  }
}