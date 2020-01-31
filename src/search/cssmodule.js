import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './search.scss';

class App extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        css-modules
      </div>
    )
  }
}

// export default CSSModules(App, styles);
export default App;