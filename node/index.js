'use strict';

const fs = require('fs');
const path = require('path');

const mp3Ext = '.mp3';
const wavExt = '.wav';
const sMusicPath = "D:/Cloud/DnD/Музыка";
const sDBpath = "../js/db.js"

function createBD() {
  let db = {}; // object exist
  console.log("Start working in " + sMusicPath);
  fs.readdirSync(sMusicPath).forEach(folder => {
    const sInnerPath = path.join(sMusicPath, folder);
    fs.lstat(sInnerPath, (err, stats) => {
      if(err)
        return console.log(err); //Handle error
      
      // only for folders with music
      if(stats.isDirectory() && !(/^!/.test(folder))) {
        console.log(sInnerPath);
        let aList= [];
        fs.readdirSync(sInnerPath).forEach(file => {
          // music?
          if(path.extname(file) === mp3Ext || path.extname(file) === wavExt) {
            aList.push(file);
          }
        });
        // aList contain right data
        db[folder] = aList;
      }
    });
  });

    //db is empty. 0_o !?
  const resultJSON = JSON.stringify(db, null, 4);

  fs.writeFile(sDBpath, resultJSON, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

}

createBD();




