import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';

const btnEdit = document.querySelector('.profile__info-btn');

const popupForm = document.querySelector('#popup__form');
const profileName = document.querySelector('.profile__info-name');
const profileIdentity = document.querySelector('.profile__info-identity');

const profileAvatar = document.querySelector('.profile__avatarimg');

const btnAdd = document.querySelector('.profile__button');
const profileInputName = document.querySelector('#fullnameInput');
const profileInputIdentity = document.querySelector('#identityInput');

const popupFormAdd = document.querySelector('#popup__formAdd');
const popupFormAvatar = document.querySelector('#popup__formAvatar');
const popupDeleteCard = document.querySelector('#popupDeleteCard');
const popupEditAvatar = document.querySelector('#popupEditAvatar');
const cardsContainer = document.querySelector('#cards');

const profilePopup = document.querySelector('#popup-profile');
const popupAdd = document.querySelector('#popupAdd');
const popupImage = document.querySelector('#popupImage');

const btnEditAvatar = document.querySelector('.profile__avatar-btnedit');

const cardTemplateSelector = '#cardTemplate';
const cardImageSelector = '.card__image';
const cardNameSelector = '.card__name';
let userId;

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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '4f420279-59a6-4255-a181-2980d0015b09',
    'Content-Type': 'application/json'
  }
});

const popupWithForm = new PopupWithForm(profilePopup, handleFormSubmit);
popupWithForm.setEventListeners();
const popupWithFormAdd = new PopupWithForm(popupAdd, handleFormSubmitAddCard);
popupWithFormAdd.setEventListeners();
const popupWithFormAvatar = new PopupWithForm(popupEditAvatar, handleFormSubmitAvatar);
popupWithFormAvatar.setEventListeners();

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

const popupWithConfirmationDelete = new PopupWithConfirmation(popupDeleteCard, cardRemove);
popupWithConfirmationDelete.setEventListeners();
const userInfo = new UserInfo(profileName, profileIdentity, profileAvatar);

const section = new Section({
  renderer: (item) => {
    section.addItem(createCard(item));
  }
},
  cardsContainer
);

const createCard = (item) => {
  const card = new Card(
    {
      name: item.name,
      imgLink: item.link,
      _id: item._id,
      owner: item.owner._id,
      likes: item.likes
    },
    userId,
    selectors,
    () => popupWithConfirmationDelete.open(item._id, card),
    handleCardClick,
    handleLikeClick
    );
  const element = card.geneterateCard();

  return element;
}

//открывает попап с картинкой при клике на карточку
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

function handleLikeClick(card) {
  api
    .likeCard(card.elementInfo())
    .then((res) => card.statusLike(res))
    .catch((err) => console.log(err));
}

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([card, user]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    section.render(card.reverse());
  })
  .catch(err => {
    console.log(err);
  });


function handleFormSubmit(inputItems) {
  popupWithForm.loading(true);
  api
    .setUserInfo(inputItems)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithForm.loading(false);
    });
}

function handleFormSubmitAddCard(inputItems) {
  popupWithFormAdd.loading(true);
  api
    .addCard(inputItems)
    .then((data) => {
      section.addItem(createCard(data));
      popupWithFormAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithFormAdd.loading(false);
    });
}

function handleFormSubmitAvatar({ link }) {
  popupWithFormAvatar.loading(true);
  api
    .changeAvatar(link)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithFormAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithFormAvatar.loading(false);
    });
}

function cardRemove({ idCard, card }) {
  api
    .deleteCard(idCard)
    .then(() => {
      card.deleteCard();
      popupWithConfirmationDelete.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const validationProfile = new FormValidator(enableValidation, popupForm);
validationProfile.enableValidation();
const validationAdd = new FormValidator(enableValidation, popupFormAdd);
validationAdd.enableValidation();
const validationAvatar = new FormValidator(enableValidation, popupFormAvatar);
validationAvatar.enableValidation();


btnEdit.addEventListener('click',() => {
  const { name, identity } = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputIdentity.value = identity;
  popupWithForm.open();
});

btnAdd.addEventListener('click', () => {
  popupWithFormAdd.open();
});

btnEditAvatar.addEventListener('click', () => {
  popupWithFormAvatar.open();
});