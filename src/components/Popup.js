export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeButton = popup.querySelector('.popup__btn-close');
  }

  //Закрытие попапа нажатием на Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };
  
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); 
  };

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    //Закрытие попапа кликом на оверлей
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}