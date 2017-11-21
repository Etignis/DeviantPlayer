'use strict';

const fs = require('fs');
const path = require('path');

const mp3Ext = '.mp3';
const wavExt = '.wav';
const sMusicPath = "D:/Cloud/DnD/Музыка";
const sDBpath = "../js/db.js"

function createBD() {
  let db = {};
  let sounds = [];
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
        const sPathName = "Folder \""+folder+"\": ";
        //console.log(sPathName);
        var l = 40 - (sPathName.length);
        //console.log(l);
        l = (l<0)? 0: l;
        console.log(sPathName + Array(l).join(".") + aList.length + " tracks");
        db[folder.toLowerCase()] = {
          number: aList.length,
          list: aList
        }
        if(/[A-ZА-ЯЁ]/.test(folder)){
          console.log("rename: "+sInnerPath+" -> "+path.join(sMusicPath, folder.toLowerCase()))
          fs.renameSync(sInnerPath, path.join(sMusicPath, folder.toLowerCase()));
        }
    } else { // sounds
      let aList= [];
      fs.readdirSync(sInnerPath).forEach(file => {
        // music?
        if(path.extname(file) === mp3Ext || path.extname(file) === wavExt) {
          aList.push(file);
        }
      });
      sounds = aList;
    }
  });

  const resultJSON = "var soundsDB = " + JSON.stringify(sounds, null, 2) + "\n\nvar musicDB = " + JSON.stringify(db, null, 2);
  //console.log(resultJSON);
  fs.writeFile(sDBpath, resultJSON, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  });
}

createBD();
