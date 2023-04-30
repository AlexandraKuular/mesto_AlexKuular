export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  //Проверка запроса
  _checkRes() {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Запрос данных пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(res => {
        return this._checkRes(res);
      });
  }

  //Запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(res => {
        return this._checkRes(res);
      });
  }

  //Редактирование профиля
  setUserInfo({fullname, identity}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: fullname,
        about: identity
      })
    })
      .then(res => {
        return this._checkRes(res);
      });
  }

  //Добавление новой карточки
  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
      .then(res => {
        return this._checkRes(res);
      });
  }

  //Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => {
        return this._checkRes(res);
      });
  }

  //Постановка лайка
  _putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(res => {
        return this._checkRes(res);
      });
  }

  //Снятие лайка
  _deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => {
        return this._checkRes(res);
      });
  }

  likeCard({cardId, isLiked}) {
    if (isLiked) {
      return this._deleteLike(cardId);
    }
    return this._putLike(cardId);
    //return isLiked ? this._deleteLike(cardId) : this._putLike(cardId);
  }


  //Обновление аватара
  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        return this._checkRes(res);
      });
  }
}