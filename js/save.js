function getSettings() {
  f.generateBG = {};

  f.generateBG.val = true;

  f.generateBG.name = 'generateBG';

  f.generateBG.text = "Генерировать фон";

  if(localStorage.getItem("flag_generateBG")!= null)
    f.generateBG.val = localStorage.getItem("flag_generateBG")=='true'?true:false;
}
function setSettings() {
  localStorage.setItem("flag_generateBG", f.generateBG.val);
}
getSettings();
