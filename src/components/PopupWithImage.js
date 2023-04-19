import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageSrc = document.querySelector('#imageSrc');
    this._imageName = document.querySelector('#imageName');
  };

  open(name, link) {
    super.open();
    this._imageSrc.src = link;
    this._imageSrc.alt = name;
    this._imageName.innerText = name;
  };
};