import React, { Component } from "react";
import FolderTree from "./FolderTree";
import FileCard from "./FileCard";
import "../css/flex.css";

class ContentArea extends Component {
  render() {
    return (
      <div className={"container"}>
        <div className={"foldertree"}>
          <FolderTree />
        </div>
        <div className={"foldertree"}>
          <FileCard />
        </div>
      </div>
    );
  }
}

export default ContentArea;
