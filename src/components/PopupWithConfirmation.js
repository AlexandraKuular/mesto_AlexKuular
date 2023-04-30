import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._formPopup = this._popup.querySelector('.popup__form');
  }
  
  _handlerSubmit = (event) => {
    this._handleFormSubmit(event, this._cardId, this._card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener('submit', this._handlerSubmit);
  }

  open(idCard, card) {
    super.open();
    this._idCard = idCard;
    this._card = card;
  }
}