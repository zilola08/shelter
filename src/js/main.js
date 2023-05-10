window.onresize = function () { location.reload(); }

import '../scss/main.scss';

import header from '../elements/header/header';
import footer from '../elements/footer/footer';

const root = document.getElementById('root');
root.prepend(header);
root.append(footer);
import '../elements/header/header';
import '../elements/header/header.js';

import petsInfo from './pets-info.json';

// Inserting cards into slider page
const petsSliderBox = document.querySelector('.friends__slider');
const arrowRight = document.querySelector('.friends__arrow-right');
const arrowLeft = document.querySelector('.friends__arrow-left');
let sliderPages;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i],array[j]] = [array[j],array[i]];
  }
  return array;
};

let petsData = petsInfo.slice(0);

shuffleArray(petsData);
let shiftArray = [];

//Slider

const renderSlider = (num) => {
  console.log(petsData);
  let sliderPage = document.createElement('div');
  sliderPage.className = 'friends__slider-page';
  petsSliderBox.append(sliderPage);

  for (let i = 0; i < num; i++) {
    let cardDiv = document.createElement('div');
    cardDiv.className = 'friends__card slider__card';
    // cardDiv.style.width = '270px';
    let cardImg = document.createElement('img');
    cardImg.setAttribute('alt',`${petsData[i].name}`);
    cardImg.setAttribute('src',`${petsData[i].img}`);
    cardImg.className = 'slider-card__img';
    let cardName = document.createElement('p');
    cardName.innerHTML = `${petsData[i].name}`;
    cardName.className = 'slider-card__name';
    let cardButton = document.createElement('button');
    cardButton.className = 'slider-card__button button-link';
    // cardButton.setAttribute('href','#');
    cardButton.innerHTML = 'Learn more';
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardName);
    cardDiv.appendChild(cardButton);
    sliderPage.appendChild(cardDiv);
  }

  for (let i = 0; i < num; i++) {
    shiftArray.push(petsData.shift());
  }

  console.log(shiftArray);
}

const sliderBoxWidth = petsSliderBox.clientWidth;
const cardWidth = 270;
console.log(sliderBoxWidth / cardWidth);

let cardsPerPage = Math.floor(sliderBoxWidth / cardWidth);
console.log("cards per page",cardsPerPage);

if (cardsPerPage > 3) {
  cardsPerPage = 3;
}
renderSlider(cardsPerPage);

const moveLeft = () => {
  arrowLeft.removeEventListener('click',moveLeft);

  //On button-press, render three more cards as a new div (from the remaining cards in the original shuffled set)
  renderSlider(cardsPerPage);
  sliderPages = document.querySelectorAll('.friends__slider-page');
  //Declare that div as a clone
  let originalPage = sliderPages[0];
  let clonePage = sliderPages[1];
  clonePage.classList.add('clone');
  console.log(petsData);
  //If not enough cards are left, replace old set with newly copied full set of cards and ahuffle them
  while (petsData.length < cardsPerPage) {
    // petsData = petsInfo.slice(0);
    // shuffleArray(petsData);
    petsData.push(shiftArray.shift());
  }
  //Make the new page slide-out
  originalPage.classList.add('fade-to-left');
  //Make the old page slide-in
  clonePage.classList.add('fade-in-right');

  setTimeout(() => {
    for (let i = 0; i < sliderPages.length; i++) {
      sliderPages[i].classList.remove('fade-in-right');
      sliderPages[i].classList.remove('fade-to-left');
      sliderPages[i].classList.remove('clone');
    }
    originalPage.remove();
    arrowLeft.addEventListener('click',moveLeft);
    let cardButtons = Array.from(document.querySelectorAll('.slider-card__button'));
    console.log(cardButtons);
    cardButtons.forEach(button => {
      button.addEventListener('click',(e) => {
        let button = e.target;
        let petIndex = cardsPerPage - cardButtons.indexOf(button);
        renderPopup(petIndex);
      })
    });
  },700);

};

const moveRight = () => {
  arrowRight.removeEventListener('click',moveRight);

  renderSlider(cardsPerPage);
  sliderPages = document.querySelectorAll('.friends__slider-page');
  let originalPage = sliderPages[0];
  let clonePage = sliderPages[1];
  clonePage.classList.add('clone');
  console.log(petsData);

  while (petsData.length < cardsPerPage) {
    petsData.push(shiftArray.shift());
  }

  if (petsData.length < cardsPerPage) {
    petsData = petsInfo.slice(0);
    shuffleArray(petsData);
  }

  originalPage.classList.add('fade-to-right');
  clonePage.classList.add('fade-in-left');

  setTimeout(() => {
    for (let i = 0; i < sliderPages.length; i++) {
      sliderPages[i].classList.remove('fade-to-right');
      sliderPages[i].classList.remove('fade-in-left');
      sliderPages[i].classList.remove('clone');
    }
    originalPage.remove();
    arrowRight.addEventListener('click',moveRight);
    let cardButtons = Array.from(document.querySelectorAll('.slider-card__button'));
    console.log(cardButtons);
    cardButtons.forEach(button => {
      button.addEventListener('click',(e) => {
        let button = e.target;
        let petIndex = cardsPerPage - cardButtons.indexOf(button);
        renderPopup(petIndex);
      })
    });
  }, 700);

};

arrowLeft.addEventListener('click',moveLeft);
arrowRight.addEventListener('click',moveRight);

const arrowLeftMobile = document.querySelector('.friends__arrow-mobileleft');
const arrowRightMobile = document.querySelector('.friends__arrow-mobileright');
arrowLeftMobile.addEventListener('click',moveLeft);
arrowRightMobile.addEventListener('click',moveRight);

// Burger Menu

// const tablet = window.matchMedia('(max-width: 999px)');
// checkIfTablet();
// function checkIfTablet() {
//     if (tablet.matches) {

const burgerMenu = document.querySelector('.navbar-burger');
const burgerLink = document.querySelectorAll('.nav-burger-item');
const burgerMenuIcon = document.querySelector('.header__burger-icon');
const navbarShownArea = document.querySelector('.navbar-burger-ul');
const overlay = document.querySelector('.overlay');
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


// Pet-POPUP

const friendsContainer = document.querySelector('.friends__container');

let popupContainer = document.createElement('div');
popupContainer.className = 'friends__popup-container popup-container';

friendsContainer.appendChild(popupContainer);

let cardButtons = Array.from(document.querySelectorAll('.slider-card__button'));

cardButtons.forEach(button => {
  button.addEventListener('click',(e) => {
    let button = e.target;
    let petIndex = cardsPerPage - cardButtons.indexOf(button);
    renderPopup(petIndex);
  })
});

const renderPopup = (index) => {
  console.log(index);
  console.log(shiftArray.length);
  popupContainer.style.zIndex = "15";
  // body.classList.toggle('stop-scrolling');
  
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
  popupImg.setAttribute('src',`${shiftArray[shiftArray.length - index].img}`);
  popupImg.setAttribute('alt',`${shiftArray[shiftArray.length - index].name}`);

  let popupTextbox = document.createElement('div');
  popupTextbox.className = 'popup-box__textbox popup-textbox';

  let popupNameBox = document.createElement('div');
  popupNameBox.className = 'popup-textbox__name-box';

  let popupName = document.createElement('h3');
  popupName.className = 'popup-textbox__name';
  popupName.innerHTML = `${shiftArray[shiftArray.length - index].name}`;

  let popupBreed = document.createElement('h4');
  popupBreed.className = 'popup-textbox__breed';
  popupBreed.innerHTML = `${shiftArray[shiftArray.length - index].type} - ${shiftArray[shiftArray.length - index].breed}`;

  let popupDecr = document.createElement('p');
  popupDecr.className = 'popup-textbox__descr';
  popupDecr.innerHTML = `${shiftArray[shiftArray.length - index].description}`;

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
  popupLiArray[0].innerHTML = `<strong>Age:</strong> ${shiftArray[shiftArray.length - index].age}`;

  popupLiArray[1].innerHTML = `<strong>Inoculations:</strong> ${shiftArray[shiftArray.length - index].inoculations}`;
  console.log(popupLiArray[1].innerHTML);

  popupLiArray[2].innerHTML = `<strong>Diseases:</strong> ${shiftArray[shiftArray.length - index].diseases}`;

  popupLiArray[3].innerHTML = `<strong>Parasites:</strong> ${shiftArray[shiftArray.length - index].parasites}`;

  const closePopup = () => {
    while (popupContainer.firstChild) {
        popupContainer.firstChild.remove()
    };
    overlay.classList.remove('shown');
    popupContainer.style.zIndex = "-1";
  }

  popupClose.addEventListener('click', closePopup);
  
  overlay.addEventListener('click', closePopup);
}
// const reviewWrapper = document.querySelector('.testi-card-wrapper')
// const reviews = document.querySelectorAll('.testi-card')
// const reviewsPop = document.querySelectorAll('.testi-card-popup')
// const popupCloseIcon = document.querySelector('.testi-card-popup-close')

// for (let i = 0; i < reviews.length; i++) {
//     reviews[i].addEventListener('click', (e) => {
//         const index = i;
//         // setTimeout(() => {
//         reviewWrapper.classList.add('popup');
//         reviewsPop.forEach(reviewPop => {
//             reviewPop.style.display = 'none';
//         });
//         reviewsPop[index].style.display = 'block';
//         overlay.style.display = 'block';
//     })
// }

// // reviews.forEach(review =>
// //         review.addEventListener('click', (e) => {
// //             // setTimeout(() => {
// //             reviewWrapper.classList.add('popup');
// //             overlay.style.display = 'block';
// //             // }, 0.01);
// //         }))

// popupCloseIcon.addEventListener('click', (e) => {
//     // setTimeout(() => {
//     // reviewWrappers.forEach(reviewWrapper => {
//     reviewWrapper.classList.remove('popup');
//     // });
//     overlay.style.display = 'none';
//     // }, 0.01);
// })

// overlay.addEventListener('click', () => {
//     // reviewWrappers.forEach(reviewWrapper => {
//     reviewWrapper.classList.remove('popup');
//     // });
//     overlay.style.display = 'none';
// })















