export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  //Проверка запроса
  _checkRes(res) {
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
      .then(this._checkRes);
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
  setUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.fullname,
        about: userInfo.identity
      })
    })
    .then(this._checkRes);
  }

  //Добавление новой карточки
  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify({
        name: card.imgName,
        link: card.link
      })
    })
    .then(this._checkRes);
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
      .then(this._checkRes);
    }

  //Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkRes);
  }

  //Постановка лайка
  _putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkRes);
  }

  //Снятие лайка
  _deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkRes);
  }

  likeCard({idCard, isLiked}) {
    if (isLiked()) {
      return this._deleteLike(idCard);
    }
    return this._putLike(idCard);
  }
}