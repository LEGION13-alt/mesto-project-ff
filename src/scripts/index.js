import "../pages/index.css";
import {initialCards} from './cards.js';
import {createCard,removeCard,clickLike,cardList} from '../components/card.js';
import {openPopup,closePopup} from '../components/modal.js';

//info form
const formElement = document.forms.edit_profile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

//card form
const formCardElement = document.forms.new_place;
const nameCardInput = formCardElement.elements.place_name;
const linkCardInput = formCardElement.elements.link;

const inputAddName = document.querySelector('.popup__input_type_card-name');
const inputAddUrl = document.querySelector('.popup__input_type_url');


//popup
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTitle = popupTypeImage.querySelector('.popup__caption');
const popupImage = popupTypeImage.querySelector('.popup__image');

const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');


initialCards.forEach(renderCard);
function renderCard(cardElement) { //Вывести карточки на страницу
  const newCard = createCard(cardElement, removeCard,clickLike,openPopupImage);
  cardList.prepend(newCard);
}


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

      //добавление новой карточки+submit
      function createCardForm(){
        nameCardInput.value = inputAddName.textContent;
        linkCardInput.value = inputAddUrl.textContent;
      }

      function handleCardFormSubmit(evt) {
        evt.preventDefault();
        const newCardElement = {}; 
        newCardElement.name = inputAddName.value;
        newCardElement.link = inputAddUrl.value;
        renderCard(newCardElement);
        inputAddName.value = '';
        inputAddUrl.value = '';
};

      formCardElement.addEventListener('submit', handleCardFormSubmit);

      function openPopupImage(link,name) {//попап карточки
       popupImage.src = link;
      popupImage.alt = name;
      popupTitle.textContent = name;
      openPopup(popupTypeImage);
    }
      
      profileEditButton.addEventListener('click', function (evt) {//кнопка профиля
        evt.preventDefault();
        const popupTypeEdit = document.querySelector('.popup_type_edit');
        openPopup(popupTypeEdit);
        createInfoForm();
      }); 

      profileAddButton.addEventListener('click', function (evt) {//кнопка добавления
        evt.preventDefault();
        const popupNewCard = document.querySelector('.popup_type_new-card');
        openPopup(popupNewCard);
        createCardForm();
      });

      document.querySelectorAll('.popup').forEach((popup) => {//Закрытие попапа+оверлей
        popup.addEventListener('click', (evt) => {
          if (evt.target.classList.contains('popup_is-opened') 
          || evt.target.classList.contains('popup__close')
          || evt.target.classList.contains('popup__button')){
            closePopup(popup);
          }
          });
        });
       
     

     

