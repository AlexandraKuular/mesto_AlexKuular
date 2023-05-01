import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handlerSubmit = handleFormSubmit;
    this._formPopup = this._popup.querySelector('.popup__form');
  }
  

  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmit({idCard: this._idCard, card: this._card});
    });
  }

  open(idCard, card) {
    super.open();
    this._idCard = idCard;
    this._card = card;
  }
}