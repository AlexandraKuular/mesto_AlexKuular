const btnEdit = document.querySelector('.profile__info-btn');
const popup = document.querySelector('#popup-profile');
const btnClose = document.querySelector('#popup__btn-closeProfile');
const popupForm = document.querySelector('#popup__form');
const popupName = document.querySelector('#fullnameInput');
const popupIdentity = document.querySelector('#identityInput');
const profileName = document.querySelector('.profile__info-name');
const profileIdentity = document.querySelector('.profile__info-identity');
const btnAdd = document.querySelector('.profile__button');
const popupAdd = document.querySelector('#popupAdd');
const popupFormAdd = document.querySelector('#popup__formAdd');
const btnCloseAdd = document.querySelector('#popup__btn-closeAdd');

const cardsContainer = document.querySelector('#cards');
const popupAddCardName = document.querySelector('#cardNameInput');
const popupAddCardLink = document.querySelector('#cardLinkInput');

const popupImage = document.querySelector('#popupImage');
const imageSrc = document.querySelector('#imageSrc');
const imageName = document.querySelector('#imageName');
const btnCloseImage = document.querySelector('#popup__btn-closeImage');

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

//создание карточки
const createCard = ({name, link}) => {
  const card = document.querySelector('#cardTemplate');
  const element = card.cloneNode(true).content;
  const cardImage = element.querySelector('.card__image');
  const cardName = element.querySelector('.card__name');
  cardImage.src = link;
  cardName.innerText = name;

  const btnDelete = element.querySelector('.card__delete');
  btnDelete.addEventListener('click', () => {
    btnDelete.closest('.card').remove();
  });

  const btnLike = element.querySelector('.card__like');
  btnLike.addEventListener('click', () => {
    if (btnLike.className.includes('card__like_active')) {
      btnLike.classList.remove('card__like_active')
    } else btnLike.classList.add('card__like_active')
    });

  cardImage.addEventListener('click', () => {
    openImage(name, link);
  });
  return element;
}

//открытите попапа с картинкой
function openImage (name, link) {
  if (!link) {
    console.error("Image link is not exist");
    return;
  }
  imageSrc.src = link;
  imageName.innerText = name;
  popupImage.classList.add('popup_opened');
}

//создаем карточки с данными из массива
function renderCards(cards) {
  cards.forEach(({name, link}) => {
    cardsContainer.appendChild(createCard({name, link}));
  });
}

//открытие попапа
function showPopup() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupIdentity.value = profileIdentity.textContent;
}

//закрытие попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

//изменение name и identity
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileIdentity.textContent = popupIdentity.value;
  closePopup();
}

//добавление карочки из данных попапа
function handleFormSubmitAddCart (evt) {
  evt.preventDefault();
  const addCardFormFieldName = popupAddCardName.value;
  const addCardFormFieldLink = popupAddCardLink.value;
  const firstElement = cardsContainer.children[0];
  cardsContainer.insertBefore(createCard({name: addCardFormFieldName, link: addCardFormFieldLink}), firstElement);
  closePopupAdd();
}

//открытие попапа добавления карточки
function showPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

//закрытие попапа добавления карточки
function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
  clearCardInputs();
}

//очистка инпута
function clearCardInputs() {
  popupAddCardName.value = '';
  popupAddCardLink.value = '';
}

function closePopupImage() {
  popupImage.classList.remove('popup_opened');
}

btnEdit.addEventListener('click', showPopup);
btnClose.addEventListener('click', closePopup);
popupForm.addEventListener("submit", handleFormSubmit);
btnAdd.addEventListener('click', showPopupAdd);
btnCloseAdd.addEventListener('click', closePopupAdd);
btnCloseImage.addEventListener('click', closePopupImage);
popupFormAdd.addEventListener("submit", handleFormSubmitAddCart);
document.addEventListener("DOMContentLoaded", () => {
  renderCards(initialCards);
});