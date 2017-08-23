import React, { Component } from "react";

class AppMenu extends Component {
  render() {
    return (
      <nav className={"pt-navbar pt-dark"}>
        <div className={"pt-navbar-group pt-align-left"}>
          <input
            className={"pt-input"}
            placeholder={"Search files..."}
            type={"text"}
          />
        </div>
        <div className={"pt-navbar-group pt-align-right"}>
          <button className={"pt-button pt-minimal pt-icon-document"}>
            {"Files"}
          </button>
          <button className={"pt-button pt-minimal pt-icon-home"}>
            {"Merge"}
          </button>

          <span className={"pt-navbar-divider"} />
          <button className={"pt-button pt-minimal pt-icon-cog"} />
        </div>
      </nav>
    );
  }
}

export default AppMenu;
