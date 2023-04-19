export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    console.log(popupSelector);
    this._closeButtonProfile = document.querySelector('#popup__btn-closeProfile');
    this._closeButtonAdd = document.querySelector('#popup__btn-closeAdd');
    this._closeButtonImage = document.querySelector('#popup__btn-closeImage');
  }

  //Закрытие попапа нажатием на Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  };
  
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); 
  };

  setEventListeners() {
    //Закрытие попапа
    this._closeButtonProfile.addEventListener('click', () => {
      this.close();
    });

    this._closeButtonAdd.addEventListener('click', () => {
      this.close();
    });

    this._closeButtonImage.addEventListener('click', () => {
      this.close();
    });

    //Закрытие попапа кликом на оверлей
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}