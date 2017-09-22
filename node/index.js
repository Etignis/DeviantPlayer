'use strict';

const fs = require('fs');
const path = require('path');

const mp3Ext = '.mp3';
const sMusicPath = "D:/Cloud/DnD/Музыка";
const sDBpath = "../js/db.js"

function createBD() {
  let db = {};
  console.log("Start working in " + sMusicPath);
  fs.readdirSync(sMusicPath).forEach(way => {
    const sInnerPath = path.join(sMusicPath, way);
    fs.lstat(sInnerPath, (err, stats) => {
      if(err)
        return console.log(err); //Handle error
      
      // only for folders with music
      if(stats.isDirectory() && !(/^!/.test(way))) {
        console.log(sInnerPath);
        let aList= [];
        fs.readdirSync(sInnerPath).forEach(file => {
          // music?
          if(path.extname(file) === mp3Ext) {
            aList.push(file);
          }
        });
        db[way] = aList;
      }
    });
  });

  const resultJSON = JSON.stringify(db, null, 4);

  fs.writeFile(sDBpath, resultJSON, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

}

createBD();




