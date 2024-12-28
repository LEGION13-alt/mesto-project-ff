import { deleteCard,deleteLike,likeCard } from "../scripts/api.js";

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;


function createCard(name,
  link,
  likes,
  ownerId,
  cardId,
  openPopupImage,
  userId) {
  const cardElement = cardTemplate
    .querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-counter");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  //likeCount.textContent = likes.length;
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  //likeCount.textContent = likes.length;
  
    if (ownerId !== userId) {
      cardDeleteBtn.classList.add("card__delete-button-hidden");//видимость корзины
  }

  //if (likes.some((like) => like._id === userId)) {
    //cardLikeBtn.classList.add("card__like-button_is-active");//видимость лайка
  //}

  cardLikeBtn.addEventListener("click",() =>{//клик лайк
    onLike(cardLikeBtn,likeCount,cardId)
  });


  cardDeleteBtn.addEventListener("click", () =>//клик удалить
      removeCard(cardElement,cardId)
    );
  

  cardImage.addEventListener("click", () => //клик попап картинки
    openPopupImage(cardImage)
  );

  return cardElement;

};

//Функция удаления карточки
function removeCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    })
}

//Функция лайка карточки
const renderLikes = (cardLikeBtn,likeCount,userId) => {
  if (likes) {
    if (likes.some((like) => like._id === userId._id)) {
      cardLikeBtn.classList.add("card__like-button_is-active");
    } else {
      cardLikeBtn.classList.remove("card__like-button_is-active");
    }
    likeCount.textContent = likes.length;
  }
}
const onLike = (cardLikeBtn,likeCount,userId,status) => {
  if (status) {
    if (!cardLikeBtn.classList.contains("card__like-button_is-active")) {
      likeCard((cardId))
        .then((cardInfo) => renderLikes(cardLikeBtn, likeCount, cardInfo, userId))
        .catch(() => console.log("Не удалось лайкнуть карточку"));
    } else {
      deleteLike((cardId))
        .then((cardInfo) => renderLikes(cardLikeBtn, likeCount, cardInfo,userId))
        .catch(() => console.log("Не удалось анлайкнуть карточку"));
    }
  } else {
    cardLikeBtn.classList.toggle("card__like-button_is-active");
  }
};

export { createCard,onLike,removeCard,cardList };
