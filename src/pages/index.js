import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Popup from '../components/Popup.js';
import './index.css';

const btnEdit = document.querySelector('.profile__info-btn');

const popupForm = document.querySelector('#popup__form');
const profileName = document.querySelector('.profile__info-name');
const profileIdentity = document.querySelector('.profile__info-identity');
const profileAvatar = document.querySelector('.profile__avatar-edit');

const btnAdd = document.querySelector('.profile__button');
const profileInputName = document.querySelector('#fullnameInput');
const profileInputIdentity = document.querySelector('#identityInput');

const popupFormAdd = document.querySelector('#popup__formAdd');
const popupEditAvatar = document.querySelector('#popupEditAvatar');
const popupDeleteCard = document.querySelector('#popupDeleteCard');

const cardsContainer = document.querySelector('#cards');

const profilePopup = document.querySelector('#popup-profile');
const popupAdd = document.querySelector('#popupAdd');
const popupImage = document.querySelector('#popupImage');

const btnEditAvatar = document.querySelector('.profile__avatar-btnedit');

const cardTemplateSelector = '#cardTemplate';
const cardImageSelector = '.card__image';
const cardNameSelector = '.card__name';

/*
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
*/

//нужно!
const selectors = {
  cardTemplateSelector,
  cardImageSelector,
  cardNameSelector
}

//нужно!!
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

const validationProfile = new FormValidator(enableValidation, popupForm);
validationProfile.enableValidation();
const validationAdd = new FormValidator(enableValidation, popupFormAdd);
validationAdd.enableValidation();
const validationAvatar = new FormValidator(enableValidation, popupEditAvatar);
validationAvatar.enableValidation();


const popupWithForm = new PopupWithForm(profilePopup, handleFormSubmit);
popupWithForm.setEventListeners();
const popupWithFormAdd = new PopupWithForm(popupAdd, handleFormSubmitAddCard);
popupWithFormAdd.setEventListeners();
const popupWithFormAvatar = new PopupWithForm(popupImage, handleFormSubmitAvatar);

//норм
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

const popupWithConfirmationDelete = new PopupWithConfirmation(popupDeleteCard, cardDelete);
popupWithConfirmationDelete.setEventListeners();

//нужно
const userInfo = new UserInfo(profileName, profileIdentity, profileAvatar);
//userInfo.getUserInfo(); //под вопросом







const section = new Section({
  renderer: (item) => {
    section.addItem(createCard({ name: item.name, imgLink: item.link }, selectors));
  }
},
  cardsContainer
);

const createCard = ({ name, link }, selectors) => {
  const card = new Card({ name, link }, selectors, handleCardClick);
  const element = card.geneterateCard();

  return element;
}

//открывает попап с картинкой при клике на карточку
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}





Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([user, card]) => {
    userInfo.setUserInfo(user);
    section.render(card.reverse());  //reverse???
  })
  .catch(err => {
    console.log(err);
  });


function handleFormSubmit(evt, inputItems) {
  evt.preventDefault();
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

function handleFormSubmitAddCard(evt, inputItems) {
  evt.preventDefault();
  popupWithFormAdd.loading(true);
  api
    .addCard(inputItems)
    .then((data) => {
      section.addItem(data);
      popupWithFormAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithFormAdd.loading(false);
    });
}

function handleFormSubmitAvatar(evt, { link }) {
  evt.preventDefault();
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

function cardDelete(event, { cardId, card }) {
  event.preventDefault();
  api
    .deleteCard(cardId)
    .then(() => {
      card.remove();
      popupWithConfirmationDelete.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

btnEdit.addEventListener('click',() => {
  const { name, identity } = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputIdentity.value = identity;
  popupWithForm.open();
});

btnAdd.addEventListener('click', () => {
  popupWithFormAdd.open();
});

profileAvatar.addEventListener('click', () => {
  popupWithFormAvatar.open();
})

/*const popupWithFormAdd = new PopupWithForm(popupAdd, handleFormSubmitAddCard);
popupWithFormAdd.setEventListeners();


//добавление первых 6 карточек
const section = new Section({
  renderer: (item) => {
    section.addItem(createCard({ name: item.name, imgLink: item.link }, selectors));
  }
},
  cardsContainer
);
//section.render(initialCards);

//Создание карточки
const createCard = ({ name, link }, selectors) => {
  const card = new Card({ name, link }, selectors, handleCardClick);
  const element = card.geneterateCard();

  return element;
}

//открывает попап с картинкой при клике на карточку
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

function cardDelete(event, { cardId, card }) {
  event.preventDefault();
  api
    .deleteCard(cardId)
    .then(() => {
      card.remove();
      popupWithConfirmationDelete.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupWithForm = new PopupWithForm(profilePopup, handleFormSubmit);
popupWithForm.setEventListeners();

//изменение name и identity
function handleFormSubmit (values) {
  userInfo.setUserInfo(values.fullname, values.identity);
}

btnEdit.addEventListener('click',() => {
  const { name, identity } = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputIdentity.value = identity;
  popupWithForm.open();
});

btnAdd.addEventListener('click', () => {
  popupWithFormAdd.open();
});

profileAvatar.addEventListener('click', () => {
  popupWithFormAvatar.open();
})

const popupWithFormEditAvatar = new Popup(popupEditAvatar);
popupWithFormEditAvatar.setEventListeners();

btnEditAvatar.addEventListener('click', () => {
  popupWithFormEditAvatar.open();
}); 

//добавление карочки из данных попапа
function handleFormSubmitAddCard (values) {
  section.addItem(createCard(values.imgName, values.link, selectors));
}*/