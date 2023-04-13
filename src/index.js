import './styles.scss';
import $ from 'jquery';

let counter = 0;

setInterval(() => {
  counter += 1;
  $('#main').html(counter);
}, 1000);
