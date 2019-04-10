import { bro } from './second';
import './styles/main.scss';

let broVar = bro(' mario ');

function component() {
  let element = document.createElement('div');
  element.innerHTML = `hello ${broVar}, webpack1`
  return element;
}

document.body.appendChild(component(broVar));