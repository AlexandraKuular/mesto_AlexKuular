export default class UserInfo {
  constructor(profileName, profileIdentity) {
    this._profileName = profileName;
    this._profileIdentity = profileIdentity;
  }

  getUserInfo() {
    this._profileInfo = {};
    this._profileInfo['name'] = this._profileName.textContent;
    this._profileInfo['identity'] = this._profileIdentity.textContent;

    return this._profileInfo;
  }

  setUserInfo(name, identity) {
    this._profileName.textContent = name;
    this._profileIdentity.textContent = identity;
  }
}