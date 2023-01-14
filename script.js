document.addEventListener("DOMContentLoaded", () => {
  let edit = document.querySelector('.profile__info-btn');
  let popup = document.getElementById('popup');
  let btnClose = document.querySelector('.popup__btn-close');
  let popupForm = document.getElementById('popup__form');
  let popupName = document.querySelector('.popup__form-fullname');
  let popupIdentity = document.querySelector('.popup__form-identity');
  let profileName = document.querySelector('.profile__info-name');
  let profileIdentity = document.querySelector('.profile__info-identity');

  function showPopup() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupIdentity.value = profileIdentity.textContent;
  }
  edit.addEventListener('click', showPopup);

  function close() {
    popup.classList.remove('popup_opened');
  }
  btnClose.addEventListener('click', close);

 function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileIdentity.textContent = popupIdentity.value;
    close();
  }
  popupForm.addEventListener("submit", handleFormSubmit);
})