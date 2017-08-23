import React, { Component } from "react";

class AppMenu extends Component {
  render() {
    return (
      <nav className={"pt-navbar pt-dark"}>
        <div className={"pt-navbar-group pt-align-left"}>
          <button className={"pt-button pt-minimal pt-icon-document"}>
            {"Files"}
          </button>
          <button className={"pt-button pt-minimal pt-icon-home"}>
            {"Merge"}
          </button>
        </div>
        <div className={"pt-navbar-group pt-align-right"}>
          <input
            className={"pt-input"}
            placeholder={"Search files..."}
            type={"text"}
          />
          <span className={"pt-navbar-divider"} />
          <button className={"pt-button pt-minimal pt-icon-cog"} />
        </div>
      </nav>
    );
  }
}

export default AppMenu;
