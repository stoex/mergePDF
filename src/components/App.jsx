import React, { Component } from "react";
import AppMenu from "./AppMenu";
import "normalize.css/normalize.css";
import "@blueprintjs/core/dist/blueprint.css";
import ContentArea from "./ContentArea.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <AppMenu openFolder={this.openFolder} />
        <ContentArea />
      </div>
    );
  }
}

export default App;
