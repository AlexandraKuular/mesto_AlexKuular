export default class UserInfo {
  constructor(profileName, profileIdentity, profileAvatar) {
    this._profileName = profileName;
    this._profileIdentity = profileIdentity;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    this._profileInfo = {};
    this._profileInfo['name'] = this._profileName.textContent;
    this._profileInfo['identity'] = this._profileIdentity.textContent;
    //this._profileInfo['avatar'] = this._profileAvatar;
    //this._profileInfo['userId'] = '';

    return this._profileInfo;
  }

  setUserInfo(name, identity, avatar, _id) {
    this._profileName.textContent = name;
    this._profileIdentity.textContent = identity;
    this._profileAvatar.src = avatar;
    this._id = id;
  }
}