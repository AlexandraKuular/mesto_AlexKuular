const btnEdit = document.querySelector('.profile__info-btn');
const profilePopup = document.querySelector('#popup-profile');
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
  cardImage.alt = name;
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
  imageSrc.alt = name;
  imageName.innerText = name;
  openPopup(popupImage);
}

//создаем карточки с данными из массива
function renderCards(cards) {
  cards.forEach(({name, link}) => {
    cardsContainer.appendChild(createCard({name, link}));
  });
}

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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
  const firstElement = cardsContainer.children[0];
  cardsContainer.insertBefore(createCard({name: addCardFormFieldName, link: addCardFormFieldLink}), firstElement);
  closePopup(popupAdd);
}

//очистка инпута
function clearCardInputs() {
  popupAddCardName.value = '';
  popupAddCardLink.value = '';
}

btnEdit.addEventListener('click', showPopup);
btnClose.addEventListener('click', () => {
  closePopup(profilePopup);
});
popupForm.addEventListener("submit", handleFormSubmit);
btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});
btnCloseAdd.addEventListener('click', () => {
  closePopup(popupAdd);
  clearCardInputs();
});
btnCloseImage.addEventListener('click', () => {
  closePopup(popupImage);
});
popupFormAdd.addEventListener("submit", handleFormSubmitAddCart);
document.addEventListener("DOMContentLoaded", () => {
  renderCards(initialCards);
});