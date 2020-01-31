require('./index.scss');
import '../../common';
// const show = require('./show.js');
import { a, b } from './tree-shaking';
import CssModule from './cssmodule';
import ReactDOM from "react-dom";
// show('Webpacksk');

const funcA = b(); //tree-shaking test
if (false) {
  a();
}
ReactDOM.render(<CssModule />, document.getElementById("react"));
window.document.getElementById('search').innerText = `Helxlo${Math.random()}, ${funcA}searchh`;