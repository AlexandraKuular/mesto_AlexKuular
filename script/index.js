import FormValidator from './FormValidator.js';
import Card from './Card.js';

const btnEdit = document.querySelector('.profile__info-btn');
const profilePopup = document.querySelector('#popup-profile');
const popupForm = document.querySelector('#popup__form');
const popupName = document.querySelector('#fullnameInput');
const popupIdentity = document.querySelector('#identityInput');
const profileName = document.querySelector('.profile__info-name');
const profileIdentity = document.querySelector('.profile__info-identity');
const btnAdd = document.querySelector('.profile__button');
const popupAdd = document.querySelector('#popupAdd');
const popupFormAdd = document.querySelector('#popup__formAdd');

const cardsContainer = document.querySelector('#cards');
const popupAddCardName = document.querySelector('#cardNameInput');
const popupAddCardLink = document.querySelector('#cardLinkInput');

const popupImage = document.querySelector('#popupImage');
const imageSrc = document.querySelector('#imageSrc');
const imageName = document.querySelector('#imageName');
const closeButtons = document.querySelectorAll('.popup__btn-close');

const cardTemplateSelector = '#cardTemplate';
const cardImageSelector = '.card__image';
const cardNameSelector = '.card__name';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const selectors = {
  cardTemplateSelector,
  cardImageSelector,
  cardNameSelector
}

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error__active'
}

const validationProfile = new FormValidator(enableValidation, popupForm);
validationProfile.enableValidation();

const validationAdd = new FormValidator(enableValidation, popupFormAdd);
validationAdd.enableValidation();

//открытите попапа с картинкой
function openImage (name, link) {
  if (!link) {
    console.error("Image link is not exist");
    return;
  }
  imageSrc.src = link;
  imageSrc.alt = name;
  imageName.innerText = name;
  openPopup(popupImage);
}

function createCard(name, link, selectors) {
  const card = new Card(name, link, selectors);
  const element = card.geneterateCard(openImage);

  return element;
}

//создаем карточки с данными из массива
function renderCards(cards) {
  cards.forEach(({name, link}) => {
    const newCardElement = createCard(name, link, selectors);
    cardsContainer.appendChild(newCardElement);
  });
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('mousedown', closePopupOverlay);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc); 
};

//открытие попапа profilePopup
function showPopup() {
  popupName.value = profileName.textContent;
  popupIdentity.value = profileIdentity.textContent;

  openPopup(profilePopup);
}

//изменение name и identity
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileIdentity.textContent = popupIdentity.value;
  closePopup(profilePopup);
}

//добавление карочки из данных попапа
function handleFormSubmitAddCart (evt) {
  evt.preventDefault();
  const addCardFormFieldName = popupAddCardName.value;
  const addCardFormFieldLink = popupAddCardLink.value;
  const newCardElement = createCard(addCardFormFieldName, addCardFormFieldLink, selectors);
  cardsContainer.prepend(newCardElement);
  closePopup(popupAdd);
}

//очистка инпута
function clearCardInputs() {
  popupFormAdd.reset();
}

//Закрытие попапа кликом на оверлей
function closePopupOverlay(evt) {
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.target === popupOpen) {
    closePopup(popupOpen);
  }
}

//Закрытие попапа нажатием на Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpenEsc = document.querySelector('.popup_opened');
    closePopup(popupOpenEsc);
  }
}

btnEdit.addEventListener('click', showPopup);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupForm.addEventListener("submit", handleFormSubmit);

btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  clearCardInputs();
});

popupFormAdd.addEventListener("submit", handleFormSubmitAddCart);

document.addEventListener("DOMContentLoaded", () => {
  renderCards(initialCards);
});