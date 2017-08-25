const node = [
  {
    hasCaret: true,
    iconName: "folder-close",
    label: "Folder 0",
    childNodes: []
  },
  {
    iconName: "folder-close",
    isExpanded: true,
    label: "",
    childNodes: [
      {
        iconName: "document",
        label: "Item 0",
        secondaryLabel: ""
      },
      { iconName: "pt-icon-tag", label: "" },
      {
        hasCaret: true,
        iconName: "pt-icon-folder-close",
        label: "",
        childNodes: [
          { label: "No-Icon Item" },
          { iconName: "pt-icon-tag", label: "Item 1" },
          {
            hasCaret: true,
            iconName: "pt-icon-folder-close",
            label: "Folder 3",
            childNodes: [
              { iconName: "documenttest", label: "Item 0" },
              { iconName: "pt-icon-tag", label: "Item 1" }
            ]
          }
        ]
      }
    ]
  }
];

const file = { iconName: "new File", label: "it fucking works!" };

const addToNode = (initial, label, toAdd) => {
  let result = null;
  if (initial instanceof Array) {
    for (var i = 0; i < initial.length; i++) {
      result = addToNode(initial[i], label, toAdd);
    }
  } else {
    for (var prop in initial) {
      if (prop == "label") {
        if (initial[prop] == label) {
          initial.childNodes.push(toAdd);
        }
      }
      if (initial[prop] instanceof Object || initial[prop] instanceof Array)
        addToNode(initial[prop], label, toAdd);
    }
  }
};

addToNode(node, "Folder 3", file);

console.log(JSON.stringify(node));
