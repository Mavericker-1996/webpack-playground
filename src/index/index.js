// require("./index.scss");
import styles from "./index.scss";
const show = require("./show.js");
const text = require("./text");
console.log('t', text.default); //说明可以用 require 引入 es6 模块
import "../../common";
show("Webpack");

import React from "react";
import ReactDOM from "react-dom";
import img from "../image/test.jpg";
import { Button } from '@txdfe/at';

class App extends React.Component {
  state = {
    Text: null,
  };
  loadComponent = () => {
    import("./text.js").then(Text => {
      console.log("Text", Text.default); //导出的是一个 default 属性
      this.setState({
        Text: Text.default,
      });
    });
  };
  render() {
    const { Text } = this.state;
    return (
      <div className={styles.root}>
        React Texsst
        <div>
          <Button onClick={this.loadComponent} type="primary">加载</Button>
        </div>
        <img src={img} />
        {Text && <Text />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react"));
