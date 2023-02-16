function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    validationForm (form, config);
  });
};

function disableSubmit(event) {
  event.preventDefault();
};

function validationForm (form, config) {
  form.addEventListener('submit', disableSubmit);
  form.addEventListener('input', () => {
    toggleButton(form, config);
  });
  addInputListeners(form, config);
  toggleButton(form, config);

  form.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButton(form, config), 0 });
  });
};

function handleFormInput(event, config) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  
  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
  };
};

function toggleButton(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  button.disabled = !isFormValid;
  button.classList.toggle(config.inactiveButtonClass, !isFormValid);
};

function addInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      handleFormInput(event, config);
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error__active'
});