import "../pages/index.css";
import { createCard, cardList } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./validation.js";
import {
  getUserInfo,
  updateUserInfo,
  updateAvatar,
  getInitialCards,
  postNewCard,
} from "./api.js";

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
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupTitle = popupTypeImage.querySelector(".popup__caption");

//popup card
const profileAddButton = document.querySelector(".profile__add-button");

const profileImage = document.querySelector(".profile__image");

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

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

function renderLoading(isLoading, popupElement) {
  const activeButton = popupElement.querySelector(".popup__button");
  if (isLoading) {
    activeButton.textContent = "Сохранение...";
  } else {
    activeButton.textContent = "Сохранить";
  }
}

//изменить аватар
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeAvatar);
  updateAvatar(avatarInput.value)
    .then((data) => {
      profileImage.style = `background-image: url(${data.avatar})`;
      closePopup(popupTypeAvatar);
    })
    .catch((err) => {
      console.log("Ошибка:", err);
    })
    .finally(() => {
      renderLoading(false, popupTypeAvatar);
    });
}
formAvatarElement.addEventListener("submit", handleAvatarFormSubmit);

//отправляем данные профиля на сервер

function handleInfoFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeEdit);

  updateUserInfo({ name: nameInput.value, about: jobInput.value })
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log("Ошибка:", err);
    })
    .finally(() => {
      renderLoading(false, popupTypeEdit);
    });
}
formInfoElement.addEventListener("submit", handleInfoFormSubmit);

//отправляем данные новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupNewCard);

  postNewCard({
    name: inputAddName.value,
    link: inputAddUrl.value,
  })
    //
    .then((newCard) => {
      cardList.prepend(
        createCard(
          newCard.name,
          newCard.link,
          newCard.likes,
          newCard.owner._id,
          newCard._id,
          openPopupImage,
          userId
        )
      );
    })
    .then(() => {
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log("Ошибка:", err);
    })
    .finally(() => {
      renderLoading(false, popupNewCard);
    });
}
formCardElement.addEventListener("submit", handleCardFormSubmit);

let userId = null;

//промисы
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id;

    cardsData.forEach((cardData) => {
      // вывод карточек на страницу
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

//попап карточки
function openPopupImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupTitle.textContent = name;
  openPopup(popupTypeImage);
}

//все слушатели
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
