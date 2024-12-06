function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  popupElement.addEventListener("click", closePopupByClick);
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  popupElement.removeEventListener("click", closePopupByClick);
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closePopup(popupIsOpened);
  }
}

function closePopupByClick(evt) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

export { openPopup, closePopup };
