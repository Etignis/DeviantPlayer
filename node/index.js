'use strict';

const fs = require('fs');
const path = require('path');

let aFileTypes = [];
let sMusicPath, sSoundsFolder, sDBpath;

function loadConfig(){
  try{
    let fs = require('fs');
    let sPath = path.resolve('config.json');
    let obj = JSON.parse(fs.readFileSync(sPath, 'utf8'));
    sMusicPath = path.resolve(obj.sMusicPath);
    sSoundsFolder = obj.sSoundsFolder;
    sDBpath = path.resolve(obj.sDBpath);
    aFileTypes = obj.aFileTypes;
    
    console.log(sSoundsFolder);
  } catch (err) {
    console.log("[ERROR] Can't load and read 'config.json'");
    console.dir(err);
  }
}
function createBD() {
  let db = {};
  let sounds = {};
  loadConfig();
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
          for(let i=0; i<aFileTypes.length; i++) {
            if(path.extname(file) === aFileTypes[i]) {
              aList.push(file);
              break;
            }
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
        console.log("we in sounds");
        const isDir1 = fs.lstatSync(sInnerPath);
        if(isDir1.isDirectory()){
          console.log("start read sounds");
          fs.readdirSync(sInnerPath).forEach(file => {
          console.log("start red " + file);
            let aList= [];
            const sInnerSoundPath = path.join(sInnerPath, file);
            const isDir2 = fs.lstatSync(sInnerSoundPath);
            if(isDir2.isDirectory()) {
              fs.readdirSync(sInnerSoundPath).forEach(sound => {
                // music?
                for(let i=0; i<aFileTypes.length; i++) {
                  if(path.extname(sound) === aFileTypes[i]) {
                    aList.push(sound);
                    break;
                  }
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
            }
            
          });
        }        
      }
    }
  });
  const resultJSON = "var soundsDB = " + JSON.stringify(sounds, null, 2) + "\n\nvar musicDB = " + JSON.stringify(db, null, 2);
  fs.writeFile(sDBpath, resultJSON, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  });
}

createBD();
