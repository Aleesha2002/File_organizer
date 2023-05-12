#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let OrganizeObj = require("./commands/organize");
let treeObj = require("./commands/tree");

//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help

let command = inputArr[0];
let utility = {};

//small object that stores extention names organized in different category
let types = {
  media: ["mp4", "mkv"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
  pic: ["png", "jpg", "jpeg"],
};

//command to find which function to be executed
switch (command) {
  case "tree":
    treeObj.treeKey(inputArr[1]);
    break;
  case "organize":
    OrganizeObj.organizeKey(inputArr[1]);
    break;
  case "help":
    helpObj.helpKey();
    break;
  default:
    console.log("Please input right command 😕");
    break;
}
