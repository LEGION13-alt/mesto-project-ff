//когорта
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: 'df6fec13-ae4a-43c3-99b9-64f48d6fd594',
      'Content-Type': 'application/json'
    }
  };

  //всё ли в порядке с ответом
  const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    };


//получение данных польз
const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(checkResponse)
  };

  //обновить данные польз
  const updateUserInfo = ({name, about}) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about}),
    }).then(checkResponse)
  };

 //изменить аватар
 const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResponse);
}; 

//получение карточки
  const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
      .then(checkResponse)
  };

  //отправить карточку
  const postNewCard = ({name, link}) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link}),
    }).then(checkResponse);
  };

//удалить карточку
const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkResponse);
  };

//поставить лайк
const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId._id}`, {
   method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

//удалить лайк
const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};


export {getUserInfo,updateUserInfo,updateAvatar,getInitialCards,postNewCard,deleteCard,likeCard,deleteLike};

