let btnEdit = document.querySelector('.profile__info-btn');
let popup = document.getElementById('popup');
let btnClose = document.querySelector('.popup__btn-close');
let popupForm = document.getElementById('popup__form');
let popupName = document.getElementById('fullnameInput');
let popupIdentity = document.getElementById('identityInput');
let profileName = document.querySelector('.profile__info-name');
let profileIdentity = document.querySelector('.profile__info-identity');

function showPopup() {  //открытие попапа
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupIdentity.value = profileIdentity.textContent;
}

function closePopup() {  //закрытие попапа
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileIdentity.textContent = popupIdentity.value;
  closePopup();
}

btnEdit.addEventListener('click', showPopup);
btnClose.addEventListener('click', closePopup);
popupForm.addEventListener("submit", handleFormSubmit);