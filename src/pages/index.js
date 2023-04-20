import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const btnEdit = document.querySelector('.profile__info-btn');

const popupForm = document.querySelector('#popup__form');
const profileName = document.querySelector('.profile__info-name');
const profileIdentity = document.querySelector('.profile__info-identity');
const btnAdd = document.querySelector('.profile__button');
const profileInputName = document.querySelector('#fullnameInput');
const profileInputIdentity = document.querySelector('#identityInput');

const popupFormAdd = document.querySelector('#popup__formAdd');

const cardsContainer = document.querySelector('#cards');

const profilePopup = document.querySelector('#popup-profile');
const popupAdd = document.querySelector('#popupAdd');
const popupImage = document.querySelector('#popupImage');

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

const imagePopup = new PopupWithImage (popupImage);
imagePopup.setEventListeners();

//открывает попап с картинкой при клике на карточку
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

//Создание карточки
const createCard = (name, link, selectors) => {
  const card = new Card(name, link, selectors, handleCardClick);
  const element = card.geneterateCard();

  return element;
}

//добавление первых 6 карточек
const section = new Section({
  renderer: (item) => {
    section.addItem(createCard(item.name, item.link, selectors));
  }
},
  cardsContainer
);
section.render(initialCards);

const userInfo = new UserInfo(profileName, profileIdentity);
userInfo.getUserInfo();

const popupWithForm = new PopupWithForm(profilePopup, handleFormSubmit);
popupWithForm.setEventListeners();
btnEdit.addEventListener('click',() => {
  const { name, identity } = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputIdentity.value = identity;
  popupWithForm.open();
});

//изменение name и identity
function handleFormSubmit (values) {
  userInfo.setUserInfo(values.fullname, values.identity);
}

const popupWithFormAdd = new PopupWithForm(popupAdd, handleFormSubmitAddCard);
popupWithFormAdd.setEventListeners();

btnAdd.addEventListener('click', () => {
  popupWithFormAdd.open();
});

//добавление карочки из данных попапа
function handleFormSubmitAddCard (values) {
  section.addItem(createCard(values.imgName, values.link, selectors));
}