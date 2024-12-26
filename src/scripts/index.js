import "../pages/index.css";
import { initialCards } from "./cards.js";
import {
  createCard,
  removeCard,
  addLike,
  cardList,
} from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import { getUserInfo,updateUserInfo,updateAvatar,getInitialCards,postNewCard } from "./api.js";

//info form
const formInfoElement = document.forms.edit_profile;
const nameInput = formInfoElement.elements.name;
const jobInput = formInfoElement.elements.description;
const popupTypeEdit = document.querySelector(".popup_type_edit");


const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");


//card form
const formCardElement = document.forms.new_place;
const nameCardInput = formCardElement.elements.place_name;
const linkCardInput = formCardElement.elements.link;
const popupNewCard = document.querySelector(".popup_type_new-card");

const inputAddName = document.querySelector(".popup__input_type_card-name");
const inputAddUrl = document.querySelector(".popup__input_type_url");

//avatar form
const formAvatarElement = document.forms.avatar_form;
const avatarInput = formAvatarElement.querySelector(".popup__input_type_url");
const popupTypeAvatar = document.querySelector(".popup_type-avatar");


//popup image card
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTitle = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");
//popup card
const profileAddButton = document.querySelector(".profile__add-button");

const profileImage = document.querySelector(".profile__image");

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error",
};
enableValidation(validationConfig);


//отправка формы info
function fillInfoForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}
//отправка формы card
function fillCardForm() {
  nameCardInput.value = inputAddName.textContent;
  linkCardInput.value = inputAddUrl.textContent;
}

function renderLoading(popupEditSubmitButton, status) {
  popupEditSubmitButton.textContent = status;
}

//отправляем данные профиля на сервер

  function handleInfoFormSubmit(evt) {
    renderLoading (evt.submitter, "Сохранение...");
    evt.preventDefault();
    updateUserInfo({ name: nameInput.value, about: jobInput.value })
      .then(() => {
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closePopup(popupTypeEdit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  formInfoElement.addEventListener("submit", handleInfoFormSubmit);

//отправляем данные новой карточки+Вывести карточки на страницу
function handleCardFormSubmit(evt) {
  renderLoading(evt.submitter, "Сохранение...");
  evt.preventDefault();
  const newCardElement = {
    name: inputAddName.value,
    link: inputAddUrl.value,
  };
  formCardElement.addEventListener("submit", handleCardFormSubmit);
  //
  postNewCard(newCardElement)
  .then((cardInfo) => {
    cardList.prepend(
      createCard(
        cardInfo.name,
        cardInfo.link,
        cardInfo.likes,
        cardInfo.owner._id,
        cardInfo._id,
        openPopupImage,
        closePopup(popupNewCard),
        userId
      )
    );
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => renderLoading(evt.submitter, "Сохранить"));
}
formCardElement.addEventListener("submit", handleCardFormSubmit);


//изменить аватар
function handleAvatarFormSubmit(evt) {
renderLoading(evt.submitter, "Сохранение...");
evt.preventDefault();
const avatarLink = avatarInput.value;
updateAvatar(avatarLink)
.then((data) => {profileImage.style = `background-image: url(${data.avatar})`;
closePopup(popupTypeAvatar);
formAvatarElement.reset();
})
.catch((err) => {
console.log(err);
})
.finally(() => renderLoading(evt.submitter, "Сохранить"));
}
formAvatarElement.addEventListener("submit", handleAvatarFormSubmit);


//промисы
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id;

    cardsData.forEach((cardData) => {
      cardList.append(
        createCard(
          cardData.name,
          cardData.link,
          cardData.likes,
          cardData.owner._id,
          cardData._id,
          openPopupImage,
          userId
        )
      );
    });
  })
  .catch((err) => {
    console.log("Ошибка:", err);
  });

//все слушатели
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
  fillInfoForm();
  openPopup(popupTypeEdit);
  clearValidation(formInfoElement, validationConfig);
});

//кнопка добавления
profileAddButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupNewCard);
  clearValidation(formCardElement, validationConfig);
});

//кнопка аватара
profileImage.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupTypeAvatar);
  clearValidation(formAvatarElement, validationConfig);
});

