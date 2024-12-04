import "../pages/index.css";
import {initialCards} from './cards.js'


// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

//info form
const formElement = document.forms.edit_profile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

//card form
const inputAddName = document.querySelector('.popup__input_type_card-name');
const inputAddUrl = document.querySelector('.popup__input_type_url');


//popup
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupButtonAdd = popupNewCard.querySelector('.popup__button');
const popupCloseButton = document.querySelector('.popup__close');


const popupTypeImage = document.querySelector('.popup_type_image');
const popupTitle = popupTypeImage.querySelector('.popup__caption');
const popupImage = popupTypeImage.querySelector('.popup__image');


// @todo: DOM узлы


// @todo: Функция создания карточки

    function createCard({name, link}, removeCard){
        const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        cardElement.querySelector('.card__title').textContent = name;
        const cardImage = cardElement.querySelector('.card__image');
        cardImage.src = link;
        cardImage.alt = name;

        const cardDelete = cardElement.querySelector('.card__delete-button');//удаление карточки
        cardDelete.addEventListener('click', () => {
        removeCard(cardElement);
      })

      const cardLike = cardElement.querySelector('.card__like-button');//лайк
      cardLike.addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_is-active');
   })

      cardImage.addEventListener('click', () => { // попап картинки
      popupImage.src = link;
      popupImage.alt = name;
      popupTitle.textContent = name;
      openPopup(popupTypeImage);
  }); 

      return cardElement;
    }

    // @todo: Функция удаления карточки

      function removeCard(card) { 
        card.remove()
      };
    
      // @todo: Вывести карточки на страницу

        function renderCard(cardElement) { 
        const newCard = createCard(cardElement, removeCard);
        cardList.prepend(newCard);
      }

      initialCards.forEach(renderCard);

      //обработчик события submit при отправке формы info
      function createInfoForm(){
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileDescription.textContent;
      }

      function handleFormSubmit(evt) {
        evt.preventDefault();
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        
};
      formElement.addEventListener('submit', handleFormSubmit); 

      //добавление новой карточки
      popupButtonAdd.addEventListener('click', (evt) => {
        evt.preventDefault()
        const newCardElement = {}; 
        newCardElement.name = inputAddName.value;
        newCardElement.link = inputAddUrl.value;
        renderCard(newCardElement);
        inputAddName.value = '';
        inputAddUrl.value = '';
});

      //Открытие попапа

      function openPopup(popupElement) {
        popupElement.classList.add('popup_is-opened');
        document.addEventListener('keydown', closePopupEsc);
      };
      
      profileEditButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        const popupTypeEdit = document.querySelector('.popup_type_edit');
        openPopup(popupTypeEdit);
        createInfoForm();
      }); 

      profileAddButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        const popupNewCard = document.querySelector('.popup_type_new-card');
        openPopup(popupNewCard);
      });

      //Закрытие попапа + Esc
     
      function closePopup(popupElement) { 
        popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closePopupEsc);
      }

      popupCloseButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        const popupTypeEdit = document.querySelector('.popup_type_edit');
        const popupNewCard = document.querySelector('.popup_type_new-card');
        closePopup(popupTypeEdit,popupNewCard);
      }); 
      
      function closePopupEsc(evt) { 
        if (evt.key === 'Escape') {
          const popupIsOpened = document.querySelector('.popup_is-opened');
          closePopup(popupIsOpened);
        };
      }
     
     //Закрытие попапа кликом на оверлей

     document.querySelectorAll('.popup').forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened') 
        || evt.target.classList.contains('popup__close')
        || evt.target.classList.contains('popup__button')){
          closePopup(popup);
        }
        });
      });

