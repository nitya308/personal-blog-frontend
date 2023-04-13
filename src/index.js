import './styles.scss';
import $ from 'jquery';

let counter = 0;

setInterval(() => {
  counter += 1;
  $('#main').html('you have been on this page for ' + counter + ' seconds');
}, 1000);
