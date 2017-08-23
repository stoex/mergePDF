import React, { Component } from "react";

import { Classes, Tooltip, Tree } from "@blueprintjs/core";
import NoFolderSelection from "./NoFolderSelection";

class FolderTree extends Component {
  constructor() {
    super();
    const tooltipLabel = (
      <Tooltip content="An eye!">
        <span className="pt-icon-standard pt-icon-eye-open" />
      </Tooltip>
    );
    const longLabel =
      "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.";
    this.state = {
      nodes: [
        {
          hasCaret: true,
          iconName: "folder-close",
          label: "Folder 0"
        },
        {
          iconName: "folder-close",
          isExpanded: true,
          label: <Tooltip content="I'm a folder <3">Folder 1</Tooltip>,
          childNodes: [
            {
              iconName: "document",
              label: "Item 0",
              secondaryLabel: tooltipLabel
            },
            { iconName: "pt-icon-tag", label: longLabel },
            {
              hasCaret: true,
              iconName: "pt-icon-folder-close",
              label: <Tooltip content="foo">Folder 2</Tooltip>,
              childNodes: [
                { label: "No-Icon Item" },
                { iconName: "pt-icon-tag", label: "Item 1" },
                {
                  hasCaret: true,
                  iconName: "pt-icon-folder-close",
                  label: "Folder 3",
                  childNodes: [
                    { iconName: "document", label: "Item 0" },
                    { iconName: "pt-icon-tag", label: "Item 1" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    let i = 0;
    this.forEachNode(this.state.nodes, n => (n.id = i++));
  }
  shouldComponentUpdate() {
    return true;
  }

  render() {
    if (this.state.nodes.length === 0) {
      return <NoFolderSelection />;
    } else {
      return (
        <Tree
          contents={this.state.nodes}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
          className={Classes.ELEVATION_0}
        />
      );
    }
  }

  handleNodeClick = (nodeData, _nodePath, e) => {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, n => (n.isSelected = false));
    }
    nodeData.isSelected =
      originallySelected == null ? true : !originallySelected;
    this.setState(this.state);
  };

  handleNodeCollapse = nodeData => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  handleNodeExpand = nodeData => {
    nodeData.isExpanded = true;
    this.setState(this.state);
  };

  forEachNode = (nodes, callback) => {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  };
}

export default FolderTree;
