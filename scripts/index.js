
// @todo: Темплейт карточки

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки


const cardInfo = initialCards.map(function(item){
    return{
        name:item.name,
        link:item.link
    };
});
    function render(){
        cardInfo.forEach(renderCard);
    }

    function renderCard({name, link}) {
        const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        const deleteButton = cardElement.querySelector('.card__delete-button');
      
        cardElement.querySelector('.card__title').textContent = name;
        cardElement.querySelector('.card__image').src = link;

      // @todo: Функция удаления карточки

        deleteButton.addEventListener('click', (evt) => {
          evt.target.closest('.places__item').remove();
        });

      // @todo: Вывести карточки на страницу
        placesList.append(cardElement);
      }
      render()


// @todo: Вывести карточки на страницу
