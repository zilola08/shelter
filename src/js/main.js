
import '../scss/main.scss';
import '../elements/header/header';

import header from '../elements/header/header';
import footer from '../elements/footer/footer';

const root = document.getElementById('root');
root.prepend(header);
root.append(footer);



