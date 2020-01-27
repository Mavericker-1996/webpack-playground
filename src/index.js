require('./index.scss');
const show = require('./show.js');
show('Webpack');
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>React Text</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));