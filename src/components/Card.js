export default class Card {
  constructor({ name, imgLink, _id, owner, likes }, userId, selectorsCard, beforeDelete, handleCardClick, handleLikeClick) {
    this.name = name;
    this.imgLink = imgLink;
    this._userId = userId;
    this._idCard = _id;
    this._idOwner = owner;
    this._likes = likes;
    this._likesLength = likes.length;
    this._templateSelector = selectorsCard.cardTemplateSelector;
    this._cardImageSelector = selectorsCard.cardImageSelector;
    this._cardNameSelector = selectorsCard.cardNameSelector;
    this.cardTemplate = this._getTemplate();
    this._cardImage = this.cardTemplate.querySelector('.card__image');
    this._handleCardClick = handleCardClick;
    this._userCard = this._idOwner === this._userId;
    this._handleLikeClick = handleLikeClick;
    this._beforeDelete = beforeDelete;
    this._likeNumber = this.cardTemplate.querySelector('.card__like-number');
  }

  _getTemplate() {
    const cardElement = document
       .querySelector(this._templateSelector)
       .content
       .querySelector('.card')
       .cloneNode(true);

    return cardElement;
  }

  _beforeDeleteCard = () => {
    this._beforeDelete(this._idCard, this._card);
  }

  _isLiked() {
    return this._likes.some((like) => this._userId === like._id);
  }

  geneterateCard() {
    this._btnDelete = this.cardTemplate.querySelector('.card__delete');
    this._btnLike = this.cardTemplate.querySelector('.card__like');

    this.cardTemplate.querySelector(this._cardImageSelector).src = this.imgLink;
    this.cardTemplate.querySelector(this._cardImageSelector).alt = this.name;
    this.cardTemplate.querySelector(this._cardNameSelector).innerText = this.name;
    this._likeNumber.textContent = this._likesLength;
    
    this._addEventListener();

    return this.cardTemplate;
  }

  elementInfo() {
    return { idCard: this._idCard, isLiked: () => this._isLiked() };
  }

  setStatusLike(data) {
    if (this._isLiked()) {
      this._deleteLikeCard(data);
    } else {
      this._likeCard(data);
    }
  }

  _likeCard(data) {
    this._likes = data.likes;
    this._btnLike.classList.add('card__like_active');
    this._likeNumber.textContent = data.likes.length;
  }

  _deleteLikeCard(data) {
    this._likes = data.likes;
    this._btnLike.classList.remove('card__like_active');
    this._likeNumber.textContent = data.likes.length;
  }

  deleteCard() {
    this.cardTemplate.remove();
  }

  _addEventListener() {
    this._btnLike.addEventListener('click', () => this._handleLikeClick(this));
    
    if (this._userCard) {
      this._btnDelete.addEventListener("click", this._beforeDeleteCard);
    } else {
      this._btnDelete.remove();
    }
    
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this.name, this.imgLink);
    });
  }
}