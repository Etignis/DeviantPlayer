'use strict';

const fs = require('fs');
const path = require('path');

const mp3Ext = '.mp3';
const wavExt = '.wav';
const sMusicPath = "D:/Cloud/DnD/Музыка";
const sDBpath = "../js/db.js"

function createBD() {
  let db = {}; 
  console.log("Start working in " + sMusicPath);
  fs.readdirSync(sMusicPath).forEach(folder => {
    const sInnerPath = path.join(sMusicPath, folder);
    const isDir = fs.lstatSync(sInnerPath);
    // only for folders with music
    if(isDir.isDirectory() && !(/^!/.test(folder))) {
      let aList= [];
        fs.readdirSync(sInnerPath).forEach(file => {
          // music?
          if(path.extname(file) === mp3Ext || path.extname(file) === wavExt) {
            aList.push(file);
          }
        });
        db[folder] = aList;
    }   
  });
   
  const resultJSON = "var musicDB = " + JSON.stringify(db, null, 2);
  //console.log(resultJSON);
  fs.writeFile(sDBpath, resultJSON, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  });
}

createBD();