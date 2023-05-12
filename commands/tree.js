let fs = require("fs");
let path = require("path");

//function tree
function treeFn(dirPath) {
  //let destPth;
  if (dirPath == undefined) {
    let pathCWD = process.cwd();
    treeHelper(pathCWD, "");
    //console.log("Kindly enter the path");
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      treeHelper(dirPath, "");
    } else {
      console.log("Kindly enter the correct path");
      return;
    }
  }
}

function treeHelper(dirPath, indent) {
  //check if it is a file or folder
  let isFile = fs.lstatSync(dirPath).isFile();
  if (isFile == true) {
    let fileName = path.basename(dirPath);
    console.log(indent + "----" + fileName);
  } else {
    let dirName = path.basename(dirPath);
    console.log(indent + "----" + dirName);
    let childrens = fs.readdirSync(dirPath);
    for (let i = 0; i < childrens.length; i++) {
      let childPath = path.join(dirPath, childrens[i]);
      treeHelper(childPath, indent + "\t");
    }
  }
}
module.exports = {
  treeKey: treeFn,
};
