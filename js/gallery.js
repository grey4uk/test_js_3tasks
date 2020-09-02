import requestForImages from "./requestForImages.js";

const imagesList = document.querySelector(".js-gallery");
imagesList.addEventListener("click", onImgClick);
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", onEnterClick);

let arrayOfImgSorces = [];
let numberPage;

/* global IntersectionObserver */

function createObserver(element) {
  let intersectionObserver = new IntersectionObserver((entries) => {
   
    if (entries.some((entry) => entry.intersectionRatio > 0)) {
      element.remove();
      runBuildResult();
    }
  });

  intersectionObserver.observe(element);
}

function onEnterClick(e) {
  imagesList.innerHTML = "";
  numberPage = 1;
  e.preventDefault();
  runBuildResult();
}

function runBuildResult() {
  console.log("object>>>>>>>>>>>", numberPage);
  if (!searchForm.querySelector("input").value) {
    alert("Empty input, choose target)");
    return;
  } else {
    requestForImages(
      createImagesList,
      searchForm.querySelector("input").value,
      numberPage
    );
  }
}

function createImagesList(imagesObj) {
  const { hits } = imagesObj;
  const collection = hits.reduce((acc, image) => {
    arrayOfImgSorces.push(`${image.largeImageURL}`);
    return (acc = acc.concat(
      `<li class="gallery__item"><a class="gallery__link" href="#"><img class="gallery__image" src="${image.webformatURL}" data-source="${image.largeImageURL}" alt="${image.tags}"/></a></li>`
    ));
  }, "");

  imagesList.insertAdjacentHTML("beforeend", collection);

  const element = document.createElement("div");
  element.setAttribute("id", "target");
  imagesList.appendChild(element);

  numberPage += 1;

  createObserver(element);
}

const lightBoxFocus = document.querySelector(".js-lightbox");
const lightBoxImgFocus = document.querySelector(".lightbox__image");
const closeModal = document.querySelector(".lightbox__content");
const closeModalOnBtnClick = document.querySelector(".lightbox__button");

function onImgClick(e) {
  const clickImg = e.target;
  if (clickImg.tagName === "A") {
    return;
  }
  if (e.target !== e.currentTarget) {
    lightBoxFocus.classList.add("is-open");
    lightBoxImgFocus.setAttribute("src", clickImg.dataset.source);
    window.addEventListener("keydown", pressButton);
    closeModal.addEventListener("click", closeModalOnClick);
    closeModalOnBtnClick.addEventListener("click", closeModalOnClick);
  }
}

function closeModalWindow() {
  lightBoxFocus.classList.remove("is-open");
  lightBoxImgFocus.removeAttribute("src");
  window.removeEventListener("keydown", pressButton);
  closeModal.removeEventListener("click", closeModalOnClick);
  closeModalOnBtnClick.removeEventListener("click", closeModalOnClick);
}

function closeModalOnClick(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModalWindow();
}

function pressButton(e) {
  let indexInArrayOfImgSorces;
  if (!indexInArrayOfImgSorces) {
    indexInArrayOfImgSorces = arrayOfImgSorces.indexOf(lightBoxImgFocus.src);
  }
  if (e.code === "Escape") {
    closeModalWindow();
  } else if (e.code === "ArrowRight") {
    if (indexInArrayOfImgSorces < arrayOfImgSorces.length - 1) {
      lightBoxImgFocus.setAttribute(
        "src",
        arrayOfImgSorces[indexInArrayOfImgSorces + 1]
      );
    } else {
      indexInArrayOfImgSorces = 0;
      lightBoxImgFocus.setAttribute(
        "src",
        arrayOfImgSorces[indexInArrayOfImgSorces]
      );
    }
  } else if (e.code === "ArrowLeft") {
    if (indexInArrayOfImgSorces >= 1) {
      lightBoxImgFocus.setAttribute(
        "src",
        arrayOfImgSorces[indexInArrayOfImgSorces - 1]
      );
    } else {
      indexInArrayOfImgSorces = arrayOfImgSorces.length - 1;
      lightBoxImgFocus.setAttribute(
        "src",
        arrayOfImgSorces[indexInArrayOfImgSorces]
      );
    }
  }
}
