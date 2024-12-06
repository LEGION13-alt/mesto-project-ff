import "../pages/index.css";
import { initialCards } from "./cards.js";
import {
  createCard,
  removeCard,
  clickLike,
  cardList,
} from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";

//info form
const formInfoElement = document.forms.edit_profile;
const nameInput = formInfoElement.elements.name;
const jobInput = formInfoElement.elements.description;

const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");

//card form
const formCardElement = document.forms.new_place;
const nameCardInput = formCardElement.elements.place_name;
const linkCardInput = formCardElement.elements.link;

const inputAddName = document.querySelector(".popup__input_type_card-name");
const inputAddUrl = document.querySelector(".popup__input_type_url");

//popup
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTitle = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");

const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

//Вывести карточки на страницу
initialCards.forEach(renderCard);
function renderCard(cardElement) {
  const newCard = createCard(
    cardElement,
    removeCard,
    clickLike,
    openPopupImage
  );
  cardList.prepend(newCard);
}

//обработчик события submit при отправке формы info
function fillInfoForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleInfoFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}
formInfoElement.addEventListener("submit", handleInfoFormSubmit);

//добавление новой карточки+submit
function fillCardForm() {
  nameCardInput.value = inputAddName.textContent;
  linkCardInput.value = inputAddUrl.textContent;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardElement = {
    name: inputAddName.value,
    link: inputAddUrl.value,
  };
  newCardElement.name = inputAddName.value;
  newCardElement.link = inputAddUrl.value;
  renderCard(newCardElement);
  formCardElement.reset();
  closePopup(popupNewCard);
}

formCardElement.addEventListener("submit", handleCardFormSubmit);

//попап карточки
function openPopupImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupTitle.textContent = name;
  openPopup(popupTypeImage);
}

//кнопка профиля
profileEditButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  const popupTypeEdit = document.querySelector(".popup_type_edit");
  openPopup(popupTypeEdit);
  fillInfoForm();
});

//кнопка добавления
profileAddButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupNewCard);
  formCardElement.reset();
});
