import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = popup.querySelector('.popup__form');
    this._inputList = popup.querySelectorAll('.popup__input');
    this._btnLoading = popup.querySelector('.popup__btn-save');
  }

  _getInputValues() {
    this._inputFormValue = {};
    this._inputList.forEach(input => {
      this._inputFormValue[ input.name ] = input.value;
    });

    return this._inputFormValue;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) =>{
      event.preventDefault();

      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  open(inputValues) {
    super.open();
    if (inputValues) {
      this._inputList.forEach((input) => {
        input.value = inputValues[input.name] || "";
      });
    }
  }

  loading(isLoading) {
    if (isLoading) {
      this._btnLoading.textContent = "Сохранение...";
    } else {
      this._btnLoading.textContent = "Сохранить";
    }
  }
}