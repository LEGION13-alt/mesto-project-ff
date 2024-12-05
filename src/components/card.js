// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function createCard({name, link}, removeCard,clickLike,openPopupImage){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;


  const cardDelete = cardElement.querySelector('.card__delete-button');//клик удаления карточки
  cardDelete.addEventListener('click', () => {
  removeCard(cardElement);
})

const cardLike = cardElement.querySelector('.card__like-button');//клик лайк
cardLike.addEventListener('click', clickLike);

cardImage.addEventListener('click',  () => {
  openPopupImage(cardImage.src, cardTitle.textContent); //клик попап карточки
})

return cardElement;
    }

    function clickLike(evt) {//Функция лайка карточки
      if (evt.target.classList.contains('card__like-button')) {
          evt.target.classList.toggle('card__like-button_is-active');
      }
  }

   function removeCard(card) { //Функция удаления карточки
      card.remove()
    };


    export {createCard,removeCard,clickLike,cardList}