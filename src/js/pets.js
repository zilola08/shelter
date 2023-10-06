// window.onresize = function () { location.reload(); }
// import '../scss/main.scss';
import '../scss/pets.scss';

import header from '../elements/header/header';
import footer from '../elements/footer/footer';

const root = document.getElementById('root');
root.prepend(header);
root.append(footer);

import '../elements/header/header';
import '../elements/header/header.js';

// Header
const navlist = document.querySelectorAll('.navlist__navlink');

const navlistArr = Array.from(navlist);

console.log(navlistArr);

const removeActiveClass = (element) => {
  element.classList.remove('navlist__navlink_active');
};

navlist.forEach(navlink => {
  if (navlink.classList.contains('pets')) {
    console.log(navlink);
    navlink.classList.add('navlist__navlink_active');
  }
  else {
    removeActiveClass(navlink);
  }
})

import petsInfo from './pets-info.json';
let petsData = petsInfo.slice(0);
// console.log(petsData);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i],array[j]] = [array[j],array[i]];
  }
  return array;
};

// Burger Menu

// const tablet = window.matchMedia('(max-width: 999px)');
// checkIfTablet();
// function checkIfTablet() {
//     if (tablet.matches) {

const burgerMenu = document.querySelector('.navbar-burger');
const burgerLink = document.querySelectorAll('.nav-burger-item');
const burgerMenuIcon = document.querySelector('.header__burger-icon');
const navbarShownArea = document.querySelector('.navbar-burger-ul');
const body = document.querySelector('#root');

burgerMenuIcon.addEventListener('click',() => {
  burgerMenuIcon.classList.toggle('shown');
  burgerMenu.classList.toggle('shown');
  overlay.classList.toggle('shown');
  body.classList.toggle('stop-scrolling');
});

burgerLink.forEach(link => {
  link.addEventListener('click',(e) => {
    burgerMenuIcon.classList.remove('shown');
    burgerMenu.classList.remove('shown');
    body.classList.remove('stop-scrolling');
    overlay.classList.remove('shown');
  })
});

navbarShownArea.addEventListener('click',() => {
  burgerMenuIcon.classList.remove('shown');
  burgerMenu.classList.remove('shown');
  overlay.classList.remove('shown');
  body.classList.remove('stop-scrolling');
})


//Paginator

shuffleArray(petsData);
const petsSliderBox = document.querySelector('.friends__slider');
const arrowNext = document.querySelector('.friends__arrow-next');
const arrowPrev = document.querySelector('.friends__arrow-prev');
const arrowEnd = document.querySelector('.friends__arrow-end');
const arrowStart = document.querySelector('.friends__arrow-start');
const slider = document.querySelector('.friends__slider');
let pageNum = document.querySelector(".page-number");
let windowSize = window.innerWidth;
let pagesArray;
let pagesMax;
let cardsPerPage;
let sliderColumns;

let shiftArray = [];
let pageCurr = 1;


const renderSlider = (cardsPerPage) => {
  let cardsPool = shuffleArray(petsData).slice(0);
  console.log(cardsPool);
  let cardsArray = [];

  let sliderPage = document.createElement('div');
  sliderPage.className = 'friends__slider-page';
  petsSliderBox.append(sliderPage);

  while (cardsPool.length < cardsPerPage) {
    cardsPool.push(shiftArray.shift());
  }

  for (let i = 0; i < cardsPerPage; i++) {
    let cardDiv = document.createElement('div');
    cardDiv.className = 'friends__card slider__card';
    let cardImg = document.createElement('img');
    cardImg.setAttribute('alt',`${cardsPool[i].name}`);
    cardImg.setAttribute('src',`${cardsPool[i].img}`);
    cardsArray.push(cardsPool[i].name);
    cardImg.className = 'slider-card__img';
    let cardName = document.createElement('p');
    cardName.innerHTML = `${cardsPool[i].name}`;
    cardName.className = 'slider-card__name';
    let cardButton = document.createElement('a');
    cardButton.className = 'slider-card__button button-link';
    cardButton.setAttribute('href','#');
    cardButton.innerHTML = 'Learn more';
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardName);
    cardDiv.appendChild(cardButton);
    sliderPage.appendChild(cardDiv);
  }

  for (let i = 0; i < cardsPerPage; i++) {
    shiftArray.push(cardsPool.shift());
  }

  sliderPage.style.gridTemplateColumns = `repeat(${sliderColumns}, 1fr)`;
  return cardsArray;
}

const createSlider = () => {
  for (let i = 0; i < pagesMax; i++) {
    pagesArray.push(renderSlider(cardsPerPage));
  }
}

const adjustSlider = () => {
  windowSize = window.innerWidth;

  if (windowSize >= 1280) {
    console.log("size desktop");
    pagesArray = [];
    pagesMax = 6;
    cardsPerPage = 8;
    sliderColumns = 4;
    slider.innerHTML = "";
    createSlider();
  }

  if (windowSize >= 768 && windowSize < 1280) {
    console.log("size tablet");
    pagesArray = [];
    pagesMax = 8;
    cardsPerPage = 6;
    sliderColumns = 2;
    slider.innerHTML = "";
    createSlider();
  }

  if (windowSize >= 320 && windowSize < 768) {
    console.log("size mobile");
    pagesArray = [];
    pagesMax = 16;
    cardsPerPage = 3;
    sliderColumns = 1;
    slider.innerHTML = "";
    createSlider();
  }
}


const disableButton = (button) => {
  button.style.borderColor = "#CDCDCD";
  button.style.color = "#CDCDCD";
  button.disabled = true;
}

const enableButton = (button) => {
  button.style.borderColor = "#F1CDB3";
  button.style.color = "black";
  button.disabled = false;
}

const toStart = () => {
  pageCurr = 1;
  slider.style.left = `0px`;
  pageNum.innerHTML = `${pageCurr}`;
  disableButton(arrowPrev);
  disableButton(arrowStart);
  enableButton(arrowEnd);
  enableButton(arrowNext);
}

const toEnd = () => {
  pageCurr = pagesMax;
  let leftPos = -windowSize * (pageCurr - 1);
  slider.style.left = `${leftPos}px`;
  pageNum.innerHTML = `${pageCurr}`;
  disableButton(arrowNext);
  disableButton(arrowEnd);
  enableButton(arrowPrev);
  enableButton(arrowStart);
}

const moveLeft = () => {

  pageCurr--;
  let leftPos = -windowSize * (pageCurr - 1);
  slider.style.left = `${leftPos}px`;
  pageNum.innerHTML = `${pageCurr}`;
  console.log(pageCurr);
  console.log(slider.style.left);
  if (pageCurr == 1) {
    disableButton(arrowPrev);
    disableButton(arrowStart);
    console.log(arrowPrev);
  } else {
    enableButton(arrowPrev);
    enableButton(arrowStart);
    enableButton(arrowNext);
    enableButton(arrowEnd);
  }
};

const moveRight = () => {

  let leftPos = -windowSize * (pageCurr);
  slider.style.left = `${leftPos}px`;
  pageCurr++;
  pageNum.innerHTML = `${pageCurr}`;
  // console.log(pageCurr);
  console.log(slider.style.left);
  if (pageCurr == pagesMax) {
    disableButton(arrowNext);
    disableButton(arrowEnd);
    console.log(arrowNext);
  } else {
    enableButton(arrowPrev);
    enableButton(arrowStart);
    enableButton(arrowNext);
    enableButton(arrowEnd);
  };
}


slider.style.left = "0px";


adjustSlider();
disableButton(arrowPrev);
disableButton(arrowStart);
console.log(pagesArray);

window.addEventListener("resize",function (e) {
  adjustSlider();
  toStart();
})

arrowPrev.addEventListener('click',moveLeft);
arrowNext.addEventListener('click',moveRight);
arrowStart.addEventListener('click',toStart);
arrowEnd.addEventListener('click',toEnd);


// POPUP

const friendsContainer = document.querySelector('.friends__container');

let popupContainer = document.createElement('div');
popupContainer.className = 'friends__popup-container popup-container';

friendsContainer.appendChild(popupContainer);

let cardButtons = Array.from(document.querySelectorAll('.slider-card__button'));
console.log(cardsPerPage);
cardButtons.forEach(button => {
  button.addEventListener('click',(e) => {
    let button = e.target;
    let petIndex = cardButtons.indexOf(button);
    renderPopup(petIndex);
  })
});

const overlay = document.querySelector('.overlay');


const renderPopup = (index) => {
  popupContainer.style.zIndex = "15";

  overlay.classList.toggle('shown');
  let popupClose = document.createElement('div');
  popupClose.className = 'popup-container__popup-close';

  let popupCloseIcon = document.createElement('img');
  popupCloseIcon.className = 'popup-close__icon';
  popupCloseIcon.setAttribute('src',`./assets/svg/popup-close.svg`);

  let popupBox = document.createElement('div');
  popupBox.className = 'popup-container__popup-box popup-box';

  let popupImg = document.createElement('img');
  popupImg.className = 'popup-box__img';
  popupImg.className = 'popup-box__img';
  popupImg.setAttribute('src',`${shiftArray[index].img}`);
  popupImg.setAttribute('alt',`${shiftArray[index].name}`);

  let popupTextbox = document.createElement('div');
  popupTextbox.className = 'popup-box__textbox popup-textbox';

  let popupNameBox = document.createElement('div');
  popupNameBox.className = 'popup-textbox__name-box';

  let popupName = document.createElement('h3');
  popupName.className = 'popup-textbox__name';
  popupName.innerHTML = `${shiftArray[index].name}`;

  let popupBreed = document.createElement('h4');
  popupBreed.className = 'popup-textbox__breed';
  popupBreed.innerHTML = `${shiftArray[index].type} - ${shiftArray[index].breed}`;

  let popupDecr = document.createElement('p');
  popupDecr.className = 'popup-textbox__descr';
  popupDecr.innerHTML = `${shiftArray[index].description}`;

  let popupUl = document.createElement('ul');
  popupUl.className = 'popup-textbox__ul popupUl';

  popupContainer.appendChild(popupClose);
  popupClose.appendChild(popupCloseIcon);
  popupContainer.appendChild(popupBox);

  popupBox.appendChild(popupImg);
  popupBox.appendChild(popupTextbox);

  popupTextbox.appendChild(popupNameBox);

  popupNameBox.appendChild(popupName);
  popupNameBox.appendChild(popupBreed);

  popupTextbox.appendChild(popupDecr);
  popupTextbox.appendChild(popupUl);

  let liNum = 4;
  for (let i = 0; i < liNum; i++) {
    let popupLi = document.createElement('li');
    popupLi.className = 'popupUl__li';
    popupUl.appendChild(popupLi);
  }

  let popupLiArray = Array.from(document.querySelectorAll('.popupUl__li'));
  popupLiArray[0].innerHTML = `<strong>Age:</strong> ${shiftArray[index].age}`;

  popupLiArray[1].innerHTML = `<strong>Inoculations:</strong> ${shiftArray[index].inoculations}`;
  console.log(popupLiArray[1].innerHTML);

  popupLiArray[2].innerHTML = `<strong>Diseases:</strong> ${shiftArray[index].diseases}`;

  popupLiArray[3].innerHTML = `<strong>Parasites:</strong> ${shiftArray[index].parasites}`;

  const closePopup = () => {
    while (popupContainer.firstChild) {
      popupContainer.firstChild.remove()
    };
    overlay.classList.remove('shown');
    popupContainer.style.zIndex = "-1";
  }

  popupClose.addEventListener('click',closePopup);

  overlay.addEventListener('click',closePopup);
}





