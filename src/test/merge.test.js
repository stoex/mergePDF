const PDFMerge = require("../merge");

const files = [
  {
    iconName: "document",
    label: "Abschrift Kaufvertrag Großstr13 - NICOLA.pdf",
    option: "whole",
    path:
      "C:\\Users\\Chris\\Dokumente\\Abschrift Kaufvertrag Großstr13 - NICOLA.pdf",
    id: "QOXMG",
    pages: 8,
    range: [1, 8],
    choice: "whole",
    value: 1,
    isOpen: false
  },
  {
    iconName: "document",
    label: "Abschrift Kaufvertrag Großstrasse 13.pdf",
    option: "whole",
    path:
      "C:\\Users\\Chris\\Dokumente\\Abschrift Kaufvertrag Großstrasse 13.pdf",
    id: "LBDCN",
    pages: 8,
    range: [1, 8],
    choice: "whole",
    value: 1,
    isOpen: false
  },
  {
    iconName: "document",
    label: "Bewerbung Christian Nicola UKS.pdf",
    option: "whole",
    path: "C:\\Users\\Chris\\Dokumente\\Bewerbung Christian Nicola UKS.pdf",
    id: "JMHLT",
    pages: 9,
    range: [1, 9],
    choice: "whole",
    value: 1,
    isOpen: false
  }
];

PDFMerge(files, { output: `test.pdf` });
