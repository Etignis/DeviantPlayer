'use strict';

const fs = require('fs');
const path = require('path');

const mp3Ext = '.mp3';
const wavExt = '.wav';
const sMusicPath = "D:/Cloud/DnD/Музыка";
const sSoundsFolder = "!звуки";
const sDBpath = "../js/db.js"

function getData() {
  
}

function createBD() {
  let db = {};
  let sounds = {};
  console.log("Start working in " + sMusicPath);
  fs.readdirSync(sMusicPath).forEach(folder => {
    const sInnerPath = path.join(sMusicPath, folder);
    const isDir = fs.lstatSync(sInnerPath);
    // only for folders with music
    if(isDir.isDirectory()) {
      if(folder != sSoundsFolder/*!(/^!/.test(folder))*/) {
        let aList= [];
        fs.readdirSync(sInnerPath).forEach(file => {
          // music?
          if(path.extname(file) === mp3Ext || path.extname(file) === wavExt) {
            aList.push(file);
          }
        });
        const sPathName = "Folder \""+folder+"\": ";
        var l = 40 - (sPathName.length);
        l = (l<0)? 0: l;
        var sPoints = "";
        if(aList.length < 100) { 
          sPoints+=".";
        }
        if(aList.length < 10) { 
          sPoints+=".";
        }
        console.log(sPathName + Array(l).join(".") + sPoints  + aList.length+ " tracks");
        db[folder.toLowerCase()] = {
          number: aList.length,
          list: aList
        }
        if(/[A-ZА-ЯЁ]/.test(folder)){
          console.log("rename: "+sInnerPath+" -> "+path.join(sMusicPath, folder.toLowerCase()))
          fs.renameSync(sInnerPath, path.join(sMusicPath, folder.toLowerCase()));
        }
      } else { // sounds
        //console.log("sound: "+sInnerPath);
        const isDir1 = fs.lstatSync(sInnerPath);
        if(isDir1.isDirectory()){
          fs.readdirSync(sInnerPath).forEach(file => {
            let aList= [];
            const sInnerSoundPath = path.join(sInnerPath, file);
            const isDir2 = fs.lstatSync(sInnerSoundPath);
            //console.log("sInnerSoundPath: "+sInnerSoundPath);
            if(isDir2.isDirectory()) {
              fs.readdirSync(sInnerSoundPath).forEach(sound => {
                // music?
                if(path.extname(sound) === mp3Ext || path.extname(sound) === wavExt) {
                  aList.push(sound);
                }
              });
              const sPathName = "Sound folder \""+file+"\": ";
              var l = 40 - (sPathName.length);
              l = (l<0)? 0: l;
              var sPoints = "";
              if(aList.length < 100) { 
                sPoints+=".";
              }
              if(aList.length < 10) { 
                sPoints+=".";
              }
              console.log(sPathName + Array(l).join(".") + sPoints  + aList.length+ " tracks");
              sounds[file.toLowerCase()] = {
                number: aList.length,
                list: aList
              }
              /*
              // music?
              if(path.extname(file) === mp3Ext || path.extname(file) === wavExt) {
                aList.push(file);
              }
              */
            }
            
          });
        }
        //sounds = aList;
      }
    }
  });
  //console.dir(db);
  //.dir(JSON.stringify(db, null, 2));
  const resultJSON = "var soundsDB = " + JSON.stringify(sounds, null, 2) + "\n\nvar musicDB = " + JSON.stringify(db, null, 2);
  fs.writeFile(sDBpath, resultJSON, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  });
}

createBD();
