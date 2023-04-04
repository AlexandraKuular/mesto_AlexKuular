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

  geneterateCard(onOpenImage) {
    const cardTemplate = this._getTemplate();

    cardTemplate.querySelector(this._cardImageSelector).src = this.imgLink;
    cardTemplate.querySelector(this._cardImageSelector).alt = this.name;
    cardTemplate.querySelector(this._cardNameSelector).innerText = this.name;

    const btnDelete = cardTemplate.querySelector('.card__delete');
    btnDelete.addEventListener('click', () => {
      btnDelete.closest('.card').remove();
    });

    const btnLike = cardTemplate.querySelector('.card__like');
    btnLike.addEventListener('click', () => {
      if (btnLike.className.includes('card__like_active')) {
        btnLike.classList.remove('card__like_active')
      } else btnLike.classList.add('card__like_active')
      });

    const cardImage = cardTemplate.querySelector('.card__image');

    cardImage.addEventListener('click', () => {
      onOpenImage(this.name, this.imgLink);
    });

    return cardTemplate;
  }
}