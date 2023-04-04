export default class FormValidator {
  constructor(selectorsValidation, formElement) {
    this._selectorsValidation = selectorsValidation;
    this._form = formElement;
    this._button = this._form.querySelector(this._selectorsValidation.submitButtonSelector);
  }

  _handleFormInput(event) {
    this._input = event.target;
    this._inputId = this._input.id;
    this._errorElement = document.querySelector(`#${this._inputId}-error`);
    
    if (this._input.validity.valid) {
      this._input.classList.remove(this._selectorsValidation.inputErrorClass);
      this._errorElement.classList.remove(this._selectorsValidation.errorClass);
      this._errorElement.textContent = '';
    } else {
      this._input.classList.add(this._selectorsValidation.inputErrorClass);
      this._errorElement.classList.add(this._selectorsValidation.errorClass);
      this._errorElement.textContent = this._input.validationMessage;
    };
  };

  _toggleButton() {
    this._isFormValid = this._form.checkValidity();

    this._button.disabled = !this._isFormValid;
    this._button.classList.toggle(this._selectorsValidation.inactiveButtonClass, !this._isFormValid);
  };

  _addInputListeners() {
    this._inputList = this._form.querySelectorAll(this._selectorsValidation.inputSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (event) => {
        this._handleFormInput(event);
      });
    });
  };

  enableValidation () {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._form.addEventListener('input', () => {
      this._toggleButton();
    });
    this._addInputListeners();
    this._toggleButton();
    this._form.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButton(), 0 });
    });
  };
};