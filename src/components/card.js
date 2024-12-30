import { deleteCard, deleteLike, likeCard } from "../scripts/api.js";

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  name,
  link,
  likes,
  ownerId,
  cardId,
  openPopupImage,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-count");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardElement.id = cardId;

  if (likes.length > 0)
    cardLikeBtn.classList.add("card__like-button_is-active");
  likeCount.textContent = likes.length;

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  if (ownerId !== userId) {
    cardDeleteBtn.classList.add("card__delete-button-hidden"); //видимость корзины
  }

  cardLikeBtn.addEventListener("click", () => {
    onLike(cardLikeBtn, likeCount, userId, cardId);
  });

  cardDeleteBtn.addEventListener("click", () =>
    removeCard(cardElement, cardId)
  );

  cardImage.addEventListener("click", () => openPopupImage(link, name));

  return cardElement;
}

//Функция удаления карточки
function removeCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log("Ошибка:", error);
    });
}

//Функция лайка карточки
const renderLikes = (likeCount, param) => {
  if (param === "increase")
    likeCount.textContent = Number(likeCount.textContent) + 1;
  else likeCount.textContent = Number(likeCount.textContent) - 1;
};

const onLike = (cardLikeBtn, likeCount, userId, cardId) => {
  if (cardLikeBtn.classList.contains("card__like-button_is-active")) {
    cardLikeBtn.classList.remove("card__like-button_is-active");
    deleteLike(cardId)
      .then(() => {
        renderLikes(likeCount, "decrease");
      })
      .catch(() => {
        console.log("Ошибка", err);
      });
  } else {
    cardLikeBtn.classList.add("card__like-button_is-active");
    likeCard(cardId)
      .then(() => {
        renderLikes(likeCount, "increase");
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }
};

export { createCard, cardList };
