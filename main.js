(()=>{"use strict";var e=document.querySelector(".places__list"),t=document.querySelector("#card-template").content;function n(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}function r(e){e.remove()}function o(e){e.classList.add("popup_is-opened"),e.addEventListener("click",a),document.addEventListener("keydown",i)}function c(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",a),document.removeEventListener("keydown",i)}function i(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function a(e){(e.target.classList.contains("popup_is-opened")||e.target.classList.contains("popup__close"))&&c(e.currentTarget)}var p=document.forms.edit_profile,s=p.elements.name,l=p.elements.description,d=document.querySelector(".profile__info"),u=d.querySelector(".profile__title"),_=d.querySelector(".profile__description"),m=document.forms.new_place,v=(m.elements.place_name,m.elements.link,document.querySelector(".popup__input_type_card-name")),y=document.querySelector(".popup__input_type_url"),f=document.querySelector(".popup_type_image"),k=f.querySelector(".popup__caption"),q=f.querySelector(".popup__image"),S=d.querySelector(".profile__edit-button"),g=document.querySelector(".profile__add-button"),L=document.querySelector(".popup_type_new-card");function E(o){var c=function(e,n,r,o){var c=e.name,i=e.link,a=t.querySelector(".places__item").cloneNode(!0),p=a.querySelector(".card__title"),s=a.querySelector(".card__image");return s.src=i,s.alt=c,p.textContent=c,a.querySelector(".card__delete-button").addEventListener("click",(function(){n(a)})),a.querySelector(".card__like-button").addEventListener("click",r),s.addEventListener("click",(function(){o(i,c)})),a}(o,r,n,x);e.prepend(c)}function x(e,t){q.src=e,q.alt=t,k.textContent=t,o(f)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach(E),p.addEventListener("submit",(function(e){e.preventDefault(),u.textContent=s.value,_.textContent=l.value})),m.addEventListener("submit",(function(e){e.preventDefault(),E({name:v.value,link:y.value}),m.reset(),c(L)})),S.addEventListener("click",(function(e){e.preventDefault(),o(document.querySelector(".popup_type_edit")),s.value=u.textContent,l.value=_.textContent})),g.addEventListener("click",(function(e){e.preventDefault(),o(L),m.reset()})),clearValidation(profileForm,validationConfig)})();