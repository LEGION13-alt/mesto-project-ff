
// @todo: Темплейт карточки

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы


// @todo: Функция создания карточки

    function createCard({name, link}, removeCard){
        const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        cardElement.querySelector('.card__title').textContent = name;
        const cardImage = cardElement.querySelector('.card__image').src = link;
        cardElement.querySelector('.card__image').setAttribute('alt','описание изображения');

        const cardDelete = cardElement.querySelector('.card__delete-button');
        cardDelete.addEventListener('click', () => {
        removeCard(cardElement);
      })
      return cardElement;
    }

    // @todo: Функция удаления карточки

      function removeCard(card) { 
        card.remove()
      };
    
      // @todo: Вывести карточки на страницу

        function renderCard(cardElement) { 
        const newCard = createCard(cardElement, removeCard);
        cardList.append(newCard);
      }

      initialCards.forEach(renderCard);