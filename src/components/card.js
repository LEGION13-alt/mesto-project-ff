import { deleteCard,likeCard,deleteLike } from "../scripts/api.js";

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard({ name, link },ownerId, userId,removeCard, addLike, openPopupImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCount = cardElement.querySelector(".card__like-counter");
  const cardLike = cardElement.querySelector(".card__like-button");
  const cardDelete = cardElement.querySelector(".card__delete-button");
  likeCount.textContent = likes.length;

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  //не отобр. корзину
  if (ownerId !== userId) {
    cardDelete.style.display = "none";
  }
  
  if (likes.some((user) => user._id === userId)) {
    cardLike.classList.add("card__like-button_is-active");
  }

   //клик удаления карточки
  cardDelete.addEventListener("click", () => {
    removeCard(cardElement);
  });

   //клик лайк
  cardLike.addEventListener("click", addLike);

  cardImage.addEventListener("click", () => {
    openPopupImage(link, name); //клик попап карточки
  });

  return cardElement;
}

//Функция лайка карточки
function addLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

//Функция удаления карточки
function removeCard(card) {
  card.remove();
}

export { createCard, removeCard, addLike, cardList };
