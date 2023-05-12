let fs = require("fs");
let path = require("path");

//function organize the main function to organize the files present
//the source folder
function organizeFn(dirPath) {
  //console.log("Organize command implemented for ", dirPath);
  //1.input ->directory path given
  let destPath;
  if (dirPath == undefined) {
    destPath = process.cwd();
    //console.log("kindly enter the path");
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      //2.create->organized_files->directory
      destPath = path.join(dirPath, "organized_files");
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("kindly enter the correct path");
      return;
    }
  }

  organizeHelper(dirPath, destPath);
  //3.identify category of all the files present in that input directory->
  //4.copy/cut files to that organized directory inside of any of category folder
}

//function to traverse through the types object to find the files
//present in it and to get their path
function organizeHelper(src, dest) {
  //3.identify category of all the files present in that input directory->
  let childNames = fs.readdirSync(src);
  //console.log(childNames);
  for (let i = 0; i < childNames.length; i++) {
    let childPath = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childPath).isFile();
    if (isFile) {
      //console.log(childNames[i]);
      let category = getCategory(childNames[i]);
      console.log(childNames[i], "belongs to -->", category);
      //4.copy/cut files to that organized directory inside of any of category folder
      sendFiles(childPath, dest, category);
    }
  }
}

//function to copy files from source and paste/send it
//it to the destination folder
function sendFiles(childPath, dest, category) {
  let categoryPath = path.join(dest, category);
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath);
  }
  let fileName = path.basename(childPath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(childPath, destFilePath);
  fs.unlinkSync(childPath);
  console.log(fileName, "copied to ", category);
}

//function to find the names of the category in which these f
//files exist
function getCategory(childNames) {
  let ext = path.extname(childNames);
  ext = ext.slice(1);
  //console.log(ext);
  for (let type in types) {
    let cTypeArray = types[type];
    for (let i = 0; i < cTypeArray.length; i++) {
      if (ext == cTypeArray[i]) {
        return type;
      }
    }
  }
  return "others";
}
module.exports = {
  organizeKey: organizeFn,
};
