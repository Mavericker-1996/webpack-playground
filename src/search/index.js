require('./index.scss');
import '../../common';
// const show = require('./show.js');
import { a } from './tree-shaking';
// show('Webpacksk');
const funcA = a();
window.document.getElementById('search').innerText = `Helxlo${Math.random()}, ${funcA}searchh`;