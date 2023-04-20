import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._imageSrc = popup.querySelector('#imageSrc');
    this._imageName = popup.querySelector('#imageName');
  };

  open(name, link) {
    super.open();
    this._imageSrc.src = link;
    this._imageSrc.alt = name;
    this._imageName.innerText = name;
  };
};