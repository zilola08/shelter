import '../scss/main.scss';
import '../scss/pets.scss';


import header from '../elements/header/header';
import footer from '../elements/footer/footer';

const root = document.getElementById('root');
root.prepend(header);
root.append(footer);

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