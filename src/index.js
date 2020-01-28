require('./index.scss');
const show = require('./show.js');
show('Webpack');

import React from 'react';
import ReactDOM from 'react-dom';
import img from './image/test.jpg';

class App extends React.Component {
  render() {
    return (
      <div>React Texsst<img src={img} /></div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react'));