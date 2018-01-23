var ROOT = 'D:/Cloud/DnD/Музыка/';
var SOUNDS = '!звуки';
//var ROOT = 'D:/DnD/Музыка/';
var aSelectedPlaylists = [];
var aSelectedSoundlists = [];
var aSoundlistsData = [];
var oGlobalSettings = {};

var fKeyListen = true;
var bShift = false;
var Drug;

function randd(min, max) {
  return Math.floor(arguments.length > 1 ? (max - min + 1) * Math.random() + min : (min + 1) * Math.random());
};

function file_exist(url)
	{
		$.ajax({
			url: url,
			dataType:"text",
			cache: false,
			success: function(){ console.log("exists");},
			error: function(){ console.log("["+url+"] NOT exists");}
		});
	}
function mus_check()
	{
	$("div.tr_line").each(function(){
		var url=$(this).attr("data-url");
		//file_exist(url);
	});
	}
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener(type, fn, false);
}

// event handler
var onEvent = function(e) {
    //document.getElementById('event-' + e.type).innerHTML = 'X'; // mark event fired in table
    this.removeEventListener(e.type, onEvent, false); // remove event listener
};
var events = 'abort,canplay,canplaythrough,durationchange,emptied,ended,error,loadeddata,loadedmetadata,loadstart,pause,play,playing,progress,ratechange,seeked,seeking,stalled,suspend,timeupdate,volumechange,waiting'.split(',');

function clearSounds() {
  localStorage.setItem('aSoundlistsData', JSON.stringify([]));
  //saveLocalDB("aPlayLists", aSelectedPlaylists);
}

$(document).ready(function(){
  //debugger;
	// класс звуков
class soundsClass{
	constructor() {
		this.scID = "sounds_container";
		this.container = "<div id='sounds_container' class='right_column'></div>";
		this.sounds_arr = [];
		this.ico = {
			"LOL": "fa-smile-o",
			"money": "fa-money",
			"expa": "fa-level-up",
			"portal": "fa-dot-circle-o",
			"time": "fa-hourglass-half",
			"warning": "fa-exclamation-triangle",
			"eye": "fa-eye",
			"magic": "fa-magic",
			"puff": "fa-street-view",
			"undead": "fa-snapchat-ghost",
			"default": "fa-play",
      "silence": "fa-microphone-slash"
		};
		this.path="";

		if($("#sounds_container").lenght>0) {

		} else {
			$("body").append(this.container);
		}
	}
	add(URL, IMG) {
		var new_sound = {
			url: this.path+URL,
			img: IMG
		};
		this.sounds_arr.push(new_sound);
		this.rerender();
	}
	setPath(sPath){
		if(sPath)
			this.path = sPath;
	}
	rerender(){
		$("#sounds_container").empty();
		for(var item in this.sounds_arr) {
			var img = this.ico[this.sounds_arr[item].img];
			var url = this.sounds_arr[item].url;
			var audio_arr = [];
			var audio_list = "";
			var deafault_audio = "";
			if(!img) {
				img = this.ico["default"];
			}
			if (typeof url == "object") {
				for (var a_url in url) {
					audio_arr.push(url[a_url]);
				}
				audio_list = "data-audio-array='" + audio_arr.join("|") + "'";
				deafault_audio = url[0];
			} else {
				deafault_audio = this.sounds_arr[item].url;
			}
			var sound_button = "<button class='soundButton' "+audio_list+"><i class='fa "+img+"'></i><audio id='audio_sound_"+item+"' src='" + deafault_audio + "'></audio></button>";
			var sound_list = (audio_arr.length>1)? "<ul style='position: absolute; width: 150px; left: -150px; display: flex; display: none; flex-direction: column'>"+audio_arr.map(function(el){
				var aSounbPath = el.split("/");
				return "<li><button class='soundListItem' style='width: 100%; text-align: right' data-soundpath='"+el+"'>"+aSounbPath[aSounbPath.length-1].split(".")[0]+"</button></li>";
			}).join("")+"</ul>" : "";
			var sound_item = "<div style='position: relative'>"+sound_list+sound_button+"</div>";
			$("#sounds_container").append(sound_item);
		}
	}
}

	// класс трека
function TrLine()
	{
	this.name = 0;
	this.time = 0;
	this.url  = 0;
	TrLine.prototype.create = function(pf_id, url) //D:/Cloud\DnD\Музыка\спокойно\Arcanum of... (OST) - Caladon (by Ben Houge).mp3');
		{

		}
	}// трек

	// класс музыкальный столбик
function PlayerForm(){
	this.mus_vol   = 0.5; //50%
	this.f_play    = 0;
	this.track_num = 0;
	this.name      = "имя потока";
	this.num       = 0;
	// create
	PlayerForm.prototype.create = function(name, lt, type) {
		$(".pf_name").each(function(){
			if($(this).text() == name) {
				return false;
			}
		});

		num = $(".player_form").length;
		this.name = name;

		if(type === undefined)
			type="usual";

		var pf_lt = "<div class='pf_lt'>"+lt+"</div>";
		if(lt === undefined)
			pf_lt="";
		var pf_sett = "<div class='pf_sett'>"+
								"<div class='btns'>"+
									"<input type='checkbox' checked='checked' id='ch_"+this.name+"' class='btn cycle'><label for='ch_"+this.name+"' title='Зациклить плейлист' ><i class='fa fa-retweet'></i></label>"+
									"<button class='btn mix' title='Перемешать музыку'><i class='fa fa-random'></i></button>"+
									"<input type='checkbox' id='hd_"+this.name+"' class='btn hide'><label for='hd_"+this.name+"' title='Скрыть/показать список воспроизведения'><i class='fa fa-eye-slash'></i></label>"+
									//"<button>3</button>"+
								"</div>"+
								"<div class='vol'>"+
									"<input type='range' orient='vertical' class='volume' min='0' max='50' value=25>"+
									"<div class='vol_num'>50%</div>"+
								"</div>"+
							"</div>";
		var pf_play_button = "<div class='pf_play' align='center'><button class='pf_play_bt'> <i class='fa fa-play'></i> </button> <button class='pf_next_bt'> <i class='fa fa-play'></i><i class='fa fa-play'></i> </button></div>";
		var pf_name        = "<div class='pf_name'>"+this.name+"</div>";
		var pf_img         = "<div class='pf_img'>изображение</div>";
		var pf_list        = "<div class='pf_list' data-id='9'></div>";
		var pf_l_sett      = "<div class='pf_l_sett'><div class='bt make_list'><i class='fa fa-list'></i></div></div>";
		var pf_mng         = "<div class='pf_mng'>управление потоком</div>";

		var audio = "<audio id='a_"+(num+1)+"'></audio>";

		if(type == 'usual')
			{
			var player_form = "<div class='player_form'>" +
						audio+
						pf_lt+
						pf_sett+
						pf_play_button+
						pf_name+
					//	pf_img+
						pf_list+
					//	pf_l_sett+
					//	pf_mng+
					"</div>";

			$(".tracks").append(player_form);
			$(".player_form:last").attr('data-name', num+1);
			$(".player_form:last").attr('data-form-name', this.name.toLowerCase());
			$(".player_form:last").attr('id', 'player_'+(num+1));
			this.num = num+1;
			}
		if(type == 'min')
			{
			var player_form = "<div class='player_form min'>" +
						audio+
						pf_lt+
						pf_play_button+
						pf_name+
					"</div>";

			$(".tracks").append(player_form);
			$(".player_form:last").attr('data-name', num+1);
			$(".player_form:last").attr('data-form-name', this.name);
			$(".player_form:last").attr('id', 'player_'+(num+1));
			this.num = num+1;
			}

		}
	// add track
	PlayerForm.prototype.add_track = function(url)
	{
		var url=url;
		smth=url.split('/');
		smth.reverse();
		var name = smth[0];
		//console.log(this.name);
		num = $(".player_form[data-form-name='"+this.name+"']").find(".tr_line").length+1;
    /*/
		tr_line = "<div class='tr_line' data-url='"+url+"' data-num='"+num+"'>"+
				"<table>"+
					"<tr>"+
						"<td class='count'></td>"+
						"<!--td><input type='checkbox' class='f_ch'></td-->"+
						"<!--td><input type='checkbox' class='f_pl'></td-->"+
						"<td class='name_place'>"+
							"<div class='name' title='"+name+"'>"+name+"</div>"+
						"</td>"+
					"</tr>"+
				"</table>"+
			  "</div>";
        /**/
		tr_line = "<div class='tr_line' data-url='"+url+"' data-num='"+num+"'>"+
				"<div class='name' title='"+name+"'>"+name+"</div>"+
			  "</div>";

		$(".player_form[data-name='"+this.num+"']").children(".pf_list").append(tr_line);
	}
	// play
	PlayerForm.prototype.play = function(a_id)
		{
		this.f_play=1;
		//document.getElementById(a_id).play();
		$("#"+a_id).trigger('play');
		}
	// pause
	PlayerForm.prototype.pause = function(a_id)
		{
		this.f_play=0;
		//document.getElementById(a_id).pause();
		$("#"+a_id).trigger('pause');
		}
} //// музыкальный столбик


//// функции
function start_play(id){
	var audio_url = $(".player_form[data-name="+id+"]").find(".pf_list").children(".active").attr("data-url");
	var _player = $(".player_form[data-name="+id+"]").children("audio");
	if(_player.attr("src")!=audio_url)
		_player.attr("src", audio_url);
	//$(".player_form[data-name="+id+"]").children("audio").attr("src", audio_url);
	a_id="a_"+id;
	/*if(id<10)
		a_id="a_0"+id;*/
	//console.log(a_id);
	//document.getElementById(a_id).play();

	// плавное увеличение звука
	if($("#p_smooth").prop("checked"))
		{
		//var c_vol = $("#"+a_id).volume;
		var c_vol = document.getElementById(a_id).volume
		var nnum= 0.1;
		//console.log("c_vol: "+c_vol);
		document.getElementById(a_id).volume = nnum;
		$("#"+a_id).trigger('play');
		//console.log("n_vol: "+document.getElementById(a_id).volume);
		//setInterval(function(){alert(1);}, 2000);
		var timer = setInterval(
				function(){
					//alert(1);
					//console.log(document.getElementById(a_id).volume+" < "+c_vol);
					if(document.getElementById(a_id).volume<c_vol)
						{
						if(document.getElementById(a_id).volume + nnum<1)
							document.getElementById(a_id).volume += nnum;
						else
							document.getElementById(a_id).volume = c_vol;
						}
					else
					{
						document.getElementById(a_id).volume = c_vol;
						clearInterval(timer);
					}
					//console.log("vol: "+document.getElementById(a_id).volume);
					}, 300);



		//console.log("vol2: "+document.getElementById(a_id).volume);
		}
		else
		{
			$("#"+a_id).trigger('play');
		}

			//console.log("id: "+id);
	// вид кнопки
	if(player[id].f_play==0)
		{
		player[id].f_play=1;
		$(".player_form[data-name="+id+"]").find(".pf_play_bt").html("<i class='fa fa-pause'></i>");
		}
}
function change_active_track(id, i){
	// меняем номер активного трека в объекте плеера
	player[id].track_num=i;
	if(player[id].track_num > $(".player_form[data-name="+id+"]").children(".pf_list").children(".tr_line").length && $(".player_form[data-name="+id+"]").find(".cycle").prop("checked"))
		player[id].track_num=1;
	//console.log("tr_num after = "+player[id].track_num);

	//переключаем активный элемент
	$(".player_form[data-name="+id+"]").children(".pf_list").children(".tr_line").removeClass("active");
	$(".player_form[data-name="+id+"]").children(".pf_list").children(".tr_line").eq(player[id].track_num-1).addClass("active");

	// переключаем трек
	start_play(id);
}
function next_active_track(id){ // id - номер столбика
	// находим номер активного трека
	//console.log("id="+id);
	index = $(".player_form[data-name="+id+"]").children(".pf_list").children(".active").index()+1;
	//console.log("smth="+ index);
	//console.log("tr_num before = "+player[id].track_num);

	// меняем номер активного трека в объекте плеера
	player[id].track_num=index+1;
	if(player[id].track_num > $(".player_form[data-name="+id+"]").children(".pf_list").children(".tr_line").length)
		player[id].track_num=1;
	//console.log("tr_num after = "+player[id].track_num);

	//переключаем активный элемент
	$(".player_form[data-name="+id+"]").children(".pf_list").children(".tr_line").removeClass("active");
	$(".player_form[data-name="+id+"]").children(".pf_list").children(".tr_line").eq(player[id].track_num-1).addClass("active");

	// переключаем трек
	start_play(id);
}
function volume(id, vol){
	var el = $(".player_form[data-name="+id+"]").find("input[type=range]");
	 //console.log("el.val: "+el.val());

	min=el.attr("min");
	max=el.attr("max");
	if(vol === undefined)
		cur=el.val();
	else
		{
		if(vol>1)
			vol=1;
		if(vol<0)
			vol=0;
		cur=((max-min)*vol*100)/100;
		}
		cur=parseInt(cur);
	//console.log("cur: "+cur);

	 t_max=max-min;
	 t_cur=cur-min;
	 need = t_cur*100/t_max;
	 //console.log("el.val: "+el.val());

	 el.next(".vol_num").text(need+"%");
	 player[id].mus_vol=need/100;
	 if( player[id].mus_vol>1)
		  player[id].mus_vol=1;
	  if( player[id].mus_vol<0)
		   player[id].mus_vol=0;
	 //console.log("player[id].mus_vol: "+player[id].mus_vol);
	a_id="a_"+id;
	/*if(id<10)
		a_id="a_0"+id;*/
	el.val(cur);
	document.getElementById(a_id).volume=player[id].mus_vol;
}
function a_ended(){
	console.log("music ended");
	var id=$(this).closest(".player_form").attr("data-name");

	/////
	/////
	/////
	var ch_name=$(".player_form[data-name="+id+"]").find(".pf_name").text();
	console.log("id: "+id);
	console.log("ch_name: "+ch_name);
	if($(".player_form[data-name="+id+"]").find("#ch_"+ch_name).prop("checked"))
		{
		next_active_track(id);
		start_play(id);
		}
	else
		{
		// stop
		//player[id].f_play=1;
		$(".player_form[data-name="+id+"]").find(".pf_play_bt").html("<i class='fa fa-play'></i>");
		}
}
//// /функции

var lt=[];

	lt[0]="1 Q A Z";
	lt[1]="2 W S X";
	lt[2]="3 E D C";
	lt[3]="4 R F V";
	lt[4]="5 T G B";
	lt[5]="6 Y H N";
	lt[6]="7 U J M";
	lt[7]="8 I K ,";
	lt[8]="9 O L .";
	lt[9]="0 P ; /";
//// события
 $("body").on('click', ".pf_play_bt", function(){
	// alert(1);
	 var id = $(this).closest(".player_form").attr("data-name");
	 //console.log("id form ="+id);

	 // играем
	 if(player[id].f_play==0)
		{
		// если не выделен начальный трек
		if(player[id].track_num==0)
			{
			$(".player_form[data-name="+id+"]").children(".pf_list").children(".tr_line").eq(0).addClass("active");
			}
		start_play(id);
		}
	 // ставим на паузу
	 else
		{
		player[id].f_play=0;
		$(this).html("<i class='fa fa-play'></i>");

		a_id="a_"+id;
		/*if(id<10)
			a_id="a_0"+id;*/
		//console.log("element for pause: "+a_id);

		if($("#p_smooth").prop("checked"))
			{
			// плавное evtymitybt звука
			//var c_vol = $("#"+a_id).volume;
			var c_vol = document.getElementById(a_id).volume
			var nnum= 0.1;
			//console.log("c_vol: "+c_vol);
			//document.getElementById(a_id).volume = nnum;
			$("#"+a_id).trigger('play');
			//console.log("n_vol: "+document.getElementById(a_id).volume);
			//setInterval(function(){alert(1);}, 2000);
			var timer = setInterval(
					function(){
						//alert(1);
						//console.log(document.getElementById(a_id).volume+" < "+c_vol);
						if(document.getElementById(a_id).volume>0)
							{
							if(document.getElementById(a_id).volume - nnum > 0)
								document.getElementById(a_id).volume -= nnum;
							else
								document.getElementById(a_id).volume = 0;
							}
						else
							{
							document.getElementById(a_id).volume = 0;

							document.getElementById(a_id).pause();
							document.getElementById(a_id).volume = c_vol;
							clearInterval(timer);
							}
						//console.log("vol: "+document.getElementById(a_id).volume);
						}, 200);



			//console.log("vol2: "+document.getElementById(a_id).volume);
			}
		else
			document.getElementById(a_id).pause();
		}

 });

 // кнопка следующего трека
 $("body").on('click', ".pf_next_bt", function(){
	 var id = $(this).closest(".player_form").attr("data-name");
	 next_active_track(id);
 });

 // изменение громкости
 $("body").on("change", ".volume", function(){
	var id = $(this).closest(".player_form").attr("data-name");
	volume(id);
 });
 $("body").on("mousemove", ".volume", function(){
	var id = $(this).closest(".player_form").attr("data-name");
	volume(id);
 });



 // двойной клик для воспроизведения
	$("body").on('dblclick', ".tr_line", function(){
		var id = $(this).closest(".player_form").attr("data-name");
		var i = $(this).attr("data-num");
		change_active_track(id, i);
	});

// клик на звуке
 $("body").on('click', ".soundButton", function(oEvent, sPath){
	var audioID = $(this).find("audio").attr("id");
  var sOnePath = oEvent.originalEvent && oEvent.originalEvent.path[0].getAttribute('data-path');
  if(sOnePath) {
    $("#"+audioID).attr("src", sOnePath);
  } else {
    var audio_array = $("#"+audioID).parent().attr("data-audio-array") ;
    if(audio_array) {
      var arr = audio_array.split("|");

      $("#"+audioID).attr("src", arr[randd(0, arr.length-1)]);
    }
  }

	onPalylistsVolumDown();
	var audio = document.getElementById(audioID);
	audio.volume = 1;
	audio.play();
	audio.onended = function() {
		onPalylistsVolumUp();
	};
 });

	function onPalylistsVolumDown() {
		$(".player_form").each(function(){
			var sAudioID = $(this).find("audio").attr('id');
			var oAudio =  document.getElementById(sAudioID);
			oAudio.volume = 0.1;
		});
	}

	function onPalylistsVolumUp() {
		$(".player_form").each(function(){
			var sAudioID = $(this).find("audio").attr('id');
			var oAudio =  document.getElementById(sAudioID);
			var nVolume = ($(this).find('input[type="range"]').val() * 0.02) || 0.5;
      var oInterval = setInterval(function(){
        if(oAudio.volume < nVolume) {
          oAudio.volume+=0.05
        }else {
          oAudio.volume = nVolume;
          clearInterval(oInterval);
        }
      }, 50);
		});
	}

	//// /события
 // проврим путь
 function findPath(path){
	$.ajax({
		url:path + '../../../../../DnD/Музыка/!звуки/BUILDTWN.wav',
		type:'POST',
		error:
			function(){
				// у меня небыло необходимости обрабатывать отсутствия картинки
				alert("not found");
			},
		success:
			function(){
				// картинка на месте, можно затемнить экран и показать посетителю big big big image -)
				alert("Found!");
			}
	});
 }

 /*
     "спокойно",
    "бодро",
    "светло",
    "Данж",
    "недра",
    "Таверна",
    "река",
    "ночь",
    "день",
    "дождь",
    "огонь",
    "Храм",
    "Эпик",
    "нагнетание",
    "скрытность",
    "Темное",
    "Фейри",
    "Путешествие"
 */
 function setZoomFontsize() {
  var sFontSize = oGlobalSettings? oGlobalSettings.sZoomFontSize : undefined;
  if(sFontSize) {
		$(".tracks").css('font-size', sFontSize+"px");
  }
 }
 function saveGlobalSettings(sKey, sValue) {
   if(sKey && sValue != undefined) {
    oGlobalSettings[sKey] = sValue;
   }
  saveLocalDB('oGlobalSettings', oGlobalSettings);
 }
 function loadGlobalSettings() {
  oGlobalSettings = getFromLocalDB('oGlobalSettings') || {};
 }
 function saveLocalDB(sKey, oValue) {
   var oLocalDB = {};
   var oData = localStorage.getItem('MusicBoxDB');
   if(oData) {
    oLocalDB =  JSON.parse(oData);
   }
   /*/
   {
     ROOT: "",
     SOUNDS: "",
     aPlaylists: [],
     aSoundlistsData: [],
     musicDB: {}
   }
   /**/
  if(sKey!=undefined){
    if(oValue != undefined && oValue != null) {
      if(oLocalDB[sKey]) {
        oLocalDB[sKey] = oValue;
      } else {
        oLocalDB[sKey] = oValue;
      }
    } else {
      delete oLocalDB[sKey];
    }

  }
  localStorage.setItem('MusicBoxDB', JSON.stringify(oLocalDB));
 }

 function getFromLocalDB(sKey) {
  var oLocalDB = {};
  var oData = localStorage.getItem('MusicBoxDB');
  if(oData) {
    oLocalDB =  JSON.parse(oData);
  }
  //if(sKey != undefined && )
  return oLocalDB[sKey];
 }
 function savePlaylists(){
    var sLists = JSON.stringify(aSelectedPlaylists);
    if(sLists) {
      //localStorage.setItem('aPlayLists', sLists);
      saveLocalDB("aPlayLists", aSelectedPlaylists);
    }
    saveLocalDB("sROOT", ROOT);
    //localStorage.setItem("sROOT", ROOT);
 }
 function loadPlayLists(){
  var sLists = getFromLocalDB('aPlayLists');
  //  var sLists = localStorage.getItem('aPlayLists');
  if(sLists != undefined){
    aSelectedPlaylists = sLists;
  }
  sTMProot = getFromLocalDB('ROOT');
  //sTMProot = localStorage.getItem('sROOT');
  if(sTMProot && sTMProot != undefined) {
    ROOT = sTMProot;
  }
 }
 function saveSoundListsData(oData){
   //aSoundlistsData
   if(oData) {
     /*/
     {
       index: 1,
       checked: true,
       name: "",
       ico: "",
       list: [
        {
          name: "",
          number: 1
        }
       ]
     }
     /**/

    // reorder

    // add new
      if(aSoundlistsData){
        var aItem = aSoundlistsData.filter(item => (item.name == oData.name));

        if (aItem.length == 0){
          aSoundlistsData.push(oData);
        } else {
          //aItem = oData;
          for (var item in oData) {
            aItem[0][item] = oData[item];
          }
          delete aItem[0].index;

          if(oData.index != undefined){
            var newElement;
            // serch element index
            for (var i=0; i<aSoundlistsData.length; i++) {
              if(aSoundlistsData[i].name == oData.name) {
                // delete element
                newElement = aSoundlistsData.splice(i, 1)[0];
                break;
              }
            }
            // add element in index
            aSoundlistsData.splice(oData.index, 0, newElement);
          }
        }
      }
   } else {
     //aSoundlistsData = oData;
   }
   if(aSoundlistsData){
     //localStorage.setItem('aSoundlistsData', JSON.stringify(aSoundlistsData));
     saveLocalDB("aSoundlistsData", aSoundlistsData);
     saveLocalDB("SOUNDS", SOUNDS);
   }
 }
 function reorderSoundlistsData(aList) {
   //aSoundlistsData
   var oTmp = {}, aTmp=[];
   aSoundlistsData.forEach(item => {
     oTmp[item.name] = item;
   });
   aList.forEach(item => {
     aTmp.push(oTmp[item]);
   });
   aSoundlistsData=aTmp;
 }
 function loadSoundListsData(){
  try{
    var aSounds =  getFromLocalDB('aSoundlistsData');
    //var aSounds = localStorage.getItem('aSoundlistsData');
    if(aSounds != undefined){
      try{
        aSoundlistsData = aSounds;
      } catch (err) {
          console.log("[ERROR]: failed to load Sounds Data - " + err);
      }
    }
    var sSOUNDS =  getFromLocalDB('SOUNDS');
    if(sSOUNDS) {
      SOUNDS = sSOUNDS;
    }
  } catch (err) {}
 }
 function clearTracks(aList){
  $(".tracks .player_form").each(function(){
    if(aList.indexOf($(this).attr("data-form-name")) < 0) {
      $(this).remove();
    }
  });
 }
 function onTracklistsReordered() {
   var aNewList = [];
   $(".player_form").each(function(){
     aNewList.push($(this).attr('data-form-name'));
   });
   aSelectedPlaylists = aNewList;
   savePlaylists();
 }
 var player = {};
 function addTrackListsFromDB(aList) {
   if(!aList){
     loadPlayLists();
     if(!(aSelectedPlaylists && aSelectedPlaylists.length>0)) {
       return;
      aList = [
        "спокойно",
        "бодро",
        "светло",
        "данж",
        "недра",
        "таверна",
        "эпик"
        ];
     } else{
       aList = aSelectedPlaylists;
     }

   }
   var list = aSelectedPlaylists = aList;
   clearTracks(list);
    function getTitle(s) {
      s = s.replace("_", "")
      return s.charAt(0).toUpperCase() + s.substr(1);
    }
  if(musicDB){
    var player_i = 1;
    try{
      list.forEach(function(el){
        var Folder='';
        el = el.toLowerCase();
        if($(".tracks .player_form[data-form-name='"+el+"']").length<1) {
          player[player_i] = new PlayerForm();
          player[player_i].create(getTitle(el) , lt[player_i-1]);
          Folder = el+'/';

          musicDB[el].list.forEach(function(track){
            player[player_i].add_track(ROOT+Folder+track);
          });
          player_i++;
        }
      });
    } catch (err) {
      console.dir(err);
    }
    savePlaylists();

    var list = document.getElementById("TrackListsList");
    Sortable.create(list, {
      handle: ".pf_name",
      ghostClass: "tracklist_ghost",
      dragClass: "tracklist_drag",
      onEnd: onTracklistsReordered
    });

  }
 }


// manage playlists
function openPlaylistsWindow() {
  fKeyListen = false;
  var aFolders = [];
  var nIndex = 0;
  var aSelectedFolders = aSelectedPlaylists.map(x => x.toLowerCase());
  for (folder in musicDB) {
    var bChecked = "";
    //var folderKey = (folder.toLowerCase().trim());
    if(aSelectedFolders.indexOf(folder)>-1){
      bChecked = " checked";
    }

    aFolders.push("<input type='checkbox' "+bChecked+" id='pli_"+nIndex+"'><label for='pli_"+nIndex+"'><span class='folderName'>"+folder+ "</span> ("+musicDB[folder].number+")</label><br>");
    nIndex++;
  }
  if(aFolders.length == 0) {
    return false;
  }
  var playlistsCheckList = "<div class='columns'>"+aFolders.join("")+"</div>";
  var oRootPath = "<div>Полный путь к папке с папками: <input id='mw_playlist_rootpath' type='text' value='"+ ROOT +"' style='width:60%; min-width:10em'></div>";
  var oButtons = "<div class='buttonsPlace'><button id='mw_pl_CancelButton'>Отменить</button><button id='mw_pl_OkButton'>ОК</button></div>";
  if($("#dbg").length<1)	{
    $("body").append("<div id='dbg'></div><div class='mod_win' id='mw_playlists_manage' >"+oRootPath+playlistsCheckList+oButtons+"</div>");
  }
  recountMWPlaylistsWindow();
}
function recountMWPlaylistsWindow(){
  if($("#mw_playlists_manage").length>0){
    var nWidth = $("#mw_playlists_manage").width();
    var nColumnsNum = ~~(nWidth / 260)
    $("#mw_playlists_manage .columns").css("column-count", nColumnsNum);
  }
}
function closePlaylistsWindow() {
  $("#dbg").fadeOut().remove();
  $(".mod_win").fadeOut().remove();
  fKeyListen = true;
  hideInfo();
}
function applyPlaylistsWindow(){
  var aSelected = [];

  // apply root
  ROOT = $("#mw_playlist_rootpath").val().replace("\\", "/");
  if(ROOT[ROOT.length-1] != "/") {
  	ROOT += "/";
  }
  console.log("ROOT: "+ROOT);

  // collect selected playlist
  $("#mw_playlists_manage input[type='checkbox']:checked").each(function(){
    aSelected.push($(this).next("label").find(".folderName").text());
  });

  /**/
 // delete old
  for (var i=0; i < aSelectedPlaylists.length;) {
    var fIs = false;
    for (var j=0; j < aSelected.length; j++) {
      if(aSelectedPlaylists[i].toLowerCase() == aSelected[j].toLowerCase()) {
        fIs = true;
        break;
      }
    }
    if(!fIs){
      aSelectedPlaylists.splice(i, 1);
    } else {
       i++;
    }
  }

  //add new playlists
   for (var i=0; i < aSelected.length; i++) {
    var fIs = false;
    for (var j=0; j < aSelectedPlaylists.length; j++) {
      if(aSelected[i].toLowerCase() == aSelectedPlaylists[j].toLowerCase()) {
        fIs = true;
        break;
      }
    }
    if(!fIs){
      aSelectedPlaylists.push(aSelected[i]);
    }
  }

  /**/

  //aSelectedPlaylists = aSelected;

  addTrackListsFromDB(aSelectedPlaylists) ;
}
$("body").on("click", "#p_config", function(){
  openPlaylistsWindow();
});
$("body").on("click", "#mw_pl_CancelButton", function(){
  closePlaylistsWindow();
});
$("body").on("click", "#mw_pl_OkButton", function(){
  applyPlaylistsWindow();
  closePlaylistsWindow();
});

	// создание списка воспроизведение

	$("body").on("click", ".make_list", function(){
		// модальное окно
		var f_name = $(this).closest(".player_form").find(".pf_name").text();
		var path = "<input type='text' class='path' placeholder='path' value=ROOT+''>";
		var folder = "<input type='text' class='folder' placeholder='папка' value='"+f_name+"'>";
		var block = "<textarea class='blck'></textarea>";
		var btns = "<hr><div class='bt cnsl'>Отменить</div><div class='bt doit'>Применить</div>";
		var p_num = $(this).closest(".player_form").attr("data-name");
		if($("#dbg").length<1)
			$("body").append("<div id='dbg'></div><div class='mod_win' id='mw_add_tracks' data-player_num='"+p_num+"'>"+path+folder+block+btns+"</div>");
	});

	$("body").on("click", "#mw_add_tracks .cnsl", function(){
		$("#dbg").remove();
		$("#mw_add_tracks").remove();
	});

	$("body").on("click", "#mw_add_tracks .doit", function(){
		var path=$("#mw_add_tracks .path").val();
		var folder=$("#mw_add_tracks .folder").val();
		var list=$("#mw_add_tracks .blck").val();
		var strs = list.split("\n");
		var p_num=$("#mw_add_tracks").attr("data-player_num");

		//console.log(strs[1]);
		if(path.slice(-1)!="/")
			path+="/";
		if(folder.slice(-1)!="/")
			folder+="/";

		// список существующего
		var is_mus =[], m_i=0;;
		$(".player_form[data-name='"+p_num+"']").find(".tr_line").each(function(){
				is_mus[m_i] = $(this).attr("data-url");
				m_i++;
			})

		var result = [];
		for(i=0; i< strs.length && strs[i].length>0; i++)
		{
			result[i]=path+folder+strs[i];
			f_is=0;
			for(h=0;h<m_i;h++)
				{
					//console.log(is_mus[h]+"="+result[i]);
				if(is_mus[h]==result[i])
					{
					f_is=1;
					//console.log("f_is")
					}
				}
			if(f_is==0&&result[i].length>0)
				player[p_num].add_track(result[i]);
		}
		//console.log(result[1]);

		$("#dbg").remove();
		$("#mw_add_tracks").remove();
	});

	$("body").on("click", "#p_add", function(){
		// модальное окно
		var path = "<input type='text' class='path' placeholder='path' value=ROOT+''>";
		var folder = "<input type='text' class='folder' placeholder='папка' >";
		var block = "<textarea class='blck'></textarea>";
		var btns = "<hr><div class='bt cnsl'>Отменить</div><div class='bt doit_new'>Создать</div>";

		var sName = "<input type='text' placeholder='Название' id='newGroupName'>";
		var fileInput = "<input type='file' multiple name='audios[]' id='newGroupsMusic'accept='audio/*'>";
		if($("#dbg").length<1)
			$("body").append("<div id='dbg'></div><div class='mod_win' id='mw_add_tracks'>"+sName+fileInput+btns+"</div>");
	});

	$("body").on("click", "#mw_add_tracks .doit_new", function(){
		var aFiles = $("#newGroupsMusic").val();
		debugger;
	});

	// / список

/**/
// manage sounds
function getSoundsInfo(oData) {
  if(oData){
    aSoundArr = oData.list.map(item => "<li><audio  class='clickPlay' id='"+(item.name).replace(/[^a-zA-Zа-яА-Я0-9_-]/g, "")+"' src='"+ROOT+SOUNDS+"/"+oData.name+"/"+item.name+"'></audio><span class='aupioPre'>"+item.name+"</span> <input type='number' min='0' value='"+item.number+"'></li>").join("");
    //var oSoundTitle = "<div><input type='text' class='soundTitle' placeholder='Название'></div>";
    var sIco = oData.ico || "";
    var oSoundIco = "<div class='row'><input type='text' class='soundIco' placeholder='Название иконки' value='"+sIco+"'> <span class='icoSample'><i class='fa "+sIco+" fa-lg'></i></span>  <acronym title='Название иконки из шрифта Font Awesome, например \"fa-cog\"'><a href='http://fontawesome.io/icons/' target='_blanc'> (?) </a></acronym></div>";
    var oSoundArr = "<ul class='soundArr'>"+aSoundArr+"</ul>";
    var oSoundInfo = oSoundIco+oSoundArr
    return oSoundInfo;

  }
}
function cloneSoundsDataFromDB(){
  try{
    // add to 'aSoundlistsData' data from 'soundsDB'
    var aExistSounds = []; // this sound collections exist in local memory
    aSoundlistsData.forEach(item => {
      aExistSounds.push(item.name);
      // found element in global DB
      if(soundsDB[item.name]){
        // check sound in local DB
        if(item.list){
          // delete old sounds
          for(var i=0; i < item.list.length; i++) {
            if(soundsDB[item.name].list.indexOf(item.list[i].name)<0) {
              item.list.splice(i, 1);
            }
          }
        }
        // add new sounds
        soundsDB[item.name].list.forEach(sound => {
          var fIs=false;
          for(var i=0; i<item.list.length; i++) {
            if(item.list[i].name == sound) {
              fIs = true;
            }
          }
          if(!fIs) {
            item.list.push({
              name: sound,
              number: 1
            });
          }
          // if(item.list.indexOf(sound) < 0) {
            // item.list.push({
              // name: sound
            // });
          // }
        });
      }
    });

    // add new sound collections from global DB to local memory
    for(var item in soundsDB){
      if(aExistSounds.indexOf(item)<0){
        aSoundlistsData.push({
          checked: false,
          name: item,
          list: soundsDB[item].list.map(sound => {return{name: sound, number: 1}})
        });
      }
    };

    // save to local DB
    saveSoundListsData();
  } catch(err){
    console.log("[ERROR]: failed clone Sound Data - " + err);
  }
 }
function openSoundlistsWindow() {
  fKeyListen = false;
  var aFolders = [];

  //var playlistsCheckList = "<div class='columns'>"+aFolders.join("")+"</div>";
  var oRootPath = "<div>Полный путь к папке со звуками: "+ ROOT +"<input id='mw_playlist_rootpath' type='text' value='"+SOUNDS+"' style='width:10%; min-width:10em'></div>";
  var oButtons = "<div class='buttonsPlace'><!--button id='mw_sl_CancelButton'>Отменить</button--><button id='mw_sl_OkButton'>ОК</button></div>";

  var aListFromSoundDB = [];
  loadSoundListsData();
  aSoundlistsData.forEach(item => {
    let checked =  item.checked? " checked" : "";
    aListFromSoundDB.push("<li class='item'><input type='checkbox' "+checked+"><label>"+item.name+"</label></li>");
  });
  if(aListFromSoundDB.length == 0) {
    return false;
  }
  aListFromSoundDB = aListFromSoundDB.join("");

  var oSoundList = "<div class='column'><ul id='mwSoundColumn' class='soundColumn'>"+aListFromSoundDB+"<!--li class='add'></li--></ul></div>";

  var oSoundInfo = "<div class='column soundInfo'>"+getSoundsInfo(aSoundlistsData[0])+"</div>";;

  var oContent = "<div class='row'>"+oSoundList+oSoundInfo+"</div>";

  if($("#dbg").length<1)	{
    $("body").append("<div id='dbg'></div><div class='mod_win' id='mw_soundlists_manage' >"+oRootPath+oContent+oButtons+"</div>");
    $($("#mw_soundlists_manage .soundColumn label").eq(0).addClass('selected'));
  }
  //recountMWPlaylistsWindow();
  var list = document.getElementById("mwSoundColumn");
    Sortable.create(list, {
      //handle: ".pf_name",
      //ghostClass: "tracklist_ghost",
      //dragClass: "tracklist_drag",
      onEnd: updateSoundListColumn
    });
}
function recountMWSoundlistsWindow(){
  if($("#mw_playlists_manage").length>0){
    var nWidth = $("#mw_playlists_manage").width();
    var nColumnsNum = ~~(nWidth / 260)
    $("#mw_playlists_manage .columns").css("column-count", nColumnsNum);
  }
}
function closeSoundlistsWindow() {
  $("#dbg").fadeOut().remove();
  $(".mod_win").fadeOut().remove();
  fKeyListen = true;
  hideInfo();
}
function applySoundlistsWindow(){

  // apply root
  SOUNDS = $("#mw_playlist_rootpath").val().replace("\\", "/");
  if(SOUNDS[SOUNDS.length-1] != "/") {
  	SOUNDS += "/";
  }
  console.log("SOUNDS: "+SOUNDS);


  updateSoundListColumn();
  createSoundColumn();
}
function updateSoundListColumn() {
  var aSelected = [];
  // collect selected soundlist
  $("#mw_soundlists_manage .soundColumn input[type='checkbox']:checked").each(function(){
    aSelected.push($(this).next("label").text());
  });

  // collect all existed
  var aAllSoundlists = [];
  $("#mw_soundlists_manage .soundColumn label").each(function(index){
    var sName = $(this).text().trim();
    aAllSoundlists.push(sName);
    saveSoundListsData({
      name: sName,
      checked: false,
      index: index
    });
  });
  // delete old from memory
  for (var i=0; i < aSoundlistsData.length; i++) {
    if(aAllSoundlists.indexOf(aSoundlistsData[i].name) < 0){
      aSoundlistsData.splice(i, 1);
    }
  }
  aSoundlistsData.forEach(item => {
    if(aSelected.indexOf(item.name) >= 0) {
      item.checked = true;
    } else {
      item.checked = false;
    }
  });
  saveSoundListsData();
}
function recountSoundColumnSublistPosition(){
  $("#sounds_container button").each(function(){
    var oList = $(this).find("ul");

  });
}
function reorderSoundColumn(){
  var aNewOrder = [];
  $("#sounds_container button").each(function(){
    var sName = $(this).attr("title");
    aNewOrder.push(sName);
  });
  reorderSoundlistsData(aNewOrder);
  saveSoundListsData();
}

/**/
$("body").on("click", "#p_config", function(){
  openPlaylistsWindow();
});
$("body").on("click", "#p_configSounds", function(){
  openSoundlistsWindow();
});
$("body").on("click", "#mw_sl_CancelButton", function(){
  closeSoundlistsWindow();
});
$("body").on("click", "#mw_sl_OkButton", function(){
  applySoundlistsWindow();
  closeSoundlistsWindow();
});
$("body").on("click", ".soundColumn label", function(){
  // save data
  var oSoundData = getDataFromSoundInfo();
  saveSoundListsData(oSoundData);

  $(".soundColumn label").removeClass('selected');
  $(this).addClass('selected');
  var sFolder = $(this).text().trim();
  aSoundArr= aSoundlistsData.filter(item => (item.name == sFolder)); //soundsDB[sFolder].list;
  var oSoundInfo = getSoundsInfo(aSoundArr[0]);
  $('#mw_soundlists_manage .soundInfo').empty().html(oSoundInfo);
});

function getDataFromSoundInfo() {
  var fChecked = $('#mw_soundlists_manage .soundColumn .selected').parent().find('input').prop('checked');
  var sName = $('#mw_soundlists_manage .soundColumn .selected').text();
  var sIco  = $('#mw_soundlists_manage .soundIco').val();
  var aSounds = [];
  $('#mw_soundlists_manage .soundArr li').each(function() {
    if($(this).find("input").val() == ''){
      $(this).find("input").val(1);
    }
    aSounds.push({
      name: $(this).find("span").text().trim(),
      number: $(this).find("input").val()
    });
  });
  var oData = {
    checked: fChecked,
    name: sName,
    ico: sIco,
    list: aSounds
  };
  return oData;
}

function createSoundColumn() {
  if(SOUNDS[SOUNDS.length-1]!="/") {
    SOUNDS = SOUNDS+"/";
  }
  // clear column
  $("#sounds_container").empty();

  var i=0; // counter;
  // full
  aSoundlistsData.forEach(item => {
    if(item.checked) {
      var oIco = item.ico || "fa-volume-up";
      var oList = item.list;
      var oName = item.name;
      var aSounds = [];
      oList.forEach(sound => {
        var sPath = sound.name;
        var nNum = sound.number;
        for(var i=0; i<nNum; i++) {
          aSounds.push(ROOT+SOUNDS+oName+"/"+sPath);
        }
      });

      var oUl = (oList.length>1)?"<ul class='soundSublist'>"+oList.map(sound => "<li data-path='"+ROOT+SOUNDS+oName+"/"+sound.name+"'>"+sound.name+"</li>").join("")+"</ul>" : "";

      var sURL = aSounds.join("|");
      var oSound = '<div class="soundButtonContainer" style="position: relative">\
        <button class="soundButton" title="'+oName+'" data-audio-array="'+sURL+'">\
          '+oUl+'\
          <i class="fa '+oIco+'"></i>\
          <audio id="audio_sound_'+i+'" src="'+aSounds[0]+'"></audio>\
        </button>\
      </div>';

      $("#sounds_container").append(oSound);
      i++;
    }
  });

  var list = document.getElementById("sounds_container");
  Sortable.create(list, {
    handle: ".soundButton",
    ghostClass: "hiddenList",
    dragClass: "hiddenList",
    onEnd: reorderSoundColumn
  });
}
// ico change
$("body").on("keyup", "#mw_soundlists_manage .soundIco", function(){
  var sIco = $(this).val();
  var oIco = '<i class="fa '+sIco+' fa-lg"></i>';
  $("#mw_soundlists_manage .icoSample").html(oIco);
  var oSoundData = getDataFromSoundInfo();
  saveSoundListsData(oSoundData);
});
// sound num change
$("body").on("keyup", "#mw_soundlists_manage .soundArr input", function(){
  //var sNum = $(this).val();
  var oSoundData = getDataFromSoundInfo();
  saveSoundListsData(oSoundData);
});
$("body").on("change", "#mw_soundlists_manage .soundArr input", function(){
  //var sNum = $(this).val();
  var oSoundData = getDataFromSoundInfo();
  saveSoundListsData(oSoundData);
});

	// создание списка воспроизведение

	$("body").on("click", ".make_list", function(){
		// модальное окно
		var f_name = $(this).closest(".player_form").find(".pf_name").text();
		var path = "<input type='text' class='path' placeholder='path' value=ROOT+''>";
		var folder = "<input type='text' class='folder' placeholder='папка' value='"+f_name+"'>";
		var block = "<textarea class='blck'></textarea>";
		var btns = "<hr><div class='bt cnsl'>Отменить</div><div class='bt doit'>Применить</div>";
		var p_num = $(this).closest(".player_form").attr("data-name");
		if($("#dbg").length<1)
			$("body").append("<div id='dbg'></div><div class='mod_win' id='mw_add_tracks' data-player_num='"+p_num+"'>"+path+folder+block+btns+"</div>");
	});

	$("body").on("click", "#mw_add_tracks .cnsl", function(){
		$("#dbg").remove();
		$("#mw_add_tracks").remove();
	});

	$("body").on("click", "#mw_add_tracks .doit", function(){
		var path=$("#mw_add_tracks .path").val();
		var folder=$("#mw_add_tracks .folder").val();
		var list=$("#mw_add_tracks .blck").val();
		var strs = list.split("\n");
		var p_num=$("#mw_add_tracks").attr("data-player_num");

		//console.log(strs[1]);
		if(path.slice(-1)!="/")
			path+="/";
		if(folder.slice(-1)!="/")
			folder+="/";

		// список существующего
		var is_mus =[], m_i=0;;
		$(".player_form[data-name='"+p_num+"']").find(".tr_line").each(function(){
				is_mus[m_i] = $(this).attr("data-url");
				m_i++;
			})

		var result = [];
		for(i=0; i< strs.length && strs[i].length>0; i++)
		{
			result[i]=path+folder+strs[i];
			f_is=0;
			for(h=0;h<m_i;h++)
				{
					//console.log(is_mus[h]+"="+result[i]);
				if(is_mus[h]==result[i])
					{
					f_is=1;
					//console.log("f_is")
					}
				}
			if(f_is==0&&result[i].length>0)
				player[p_num].add_track(result[i]);
		}
		//console.log(result[1]);

		$("#dbg").remove();
		$("#mw_add_tracks").remove();
	});

	$("body").on("click", "#p_add", function(){
		// модальное окно
		var path = "<input type='text' class='path' placeholder='path' value=ROOT+''>";
		var folder = "<input type='text' class='folder' placeholder='папка' >";
		var block = "<textarea class='blck'></textarea>";
		var btns = "<hr><div class='bt cnsl'>Отменить</div><div class='bt doit_new'>Создать</div>";

		var sName = "<input type='text' placeholder='Название' id='newGroupName'>";
		var fileInput = "<input type='file' multiple name='audios[]' id='newGroupsMusic'accept='audio/*'>";
		if($("#dbg").length<1)
			$("body").append("<div id='dbg'></div><div class='mod_win' id='mw_add_tracks'>"+sName+fileInput+btns+"</div>");
	});

	$("body").on("click", "#mw_add_tracks .doit_new", function(){
		var aFiles = $("#newGroupsMusic").val();
		debugger;
	});

  $("body").on('click', ".aupioPre", function(){
    var audioID = $(this).parent().find("audio").attr("id");
    var oAudio = document.getElementById(audioID);
    oAudio.load();
    if(oAudio.paused) {
      oAudio.play();
    } else {
      oAudio.pause();
    }
  });

  $("body").on('click', ".soundSublist li", function(){
    var sName = $(this).attr('data-path').trim();
    $(this).closest(".soundButton").click(null, sName);
  });
	// / список

// загрузка данных [bat]
function openBatDBWindow() {
  fKeyListen = false;

  var oOpenButton = "<div class='center'><input type='file' id='mw_batDB_load_input' name='files[]'/> <button id='mw_batDB_load'>Загрузить файл</button></div><p>Откройте файл 'DB.txt' из папки с музыкой, сгенерированный с помощью '_create&nbsp;music&nbsp;DB.bat'. При этом, плеер запомнит данные из этого файла и будет игнорировать данные из основной базы данных.</p>";
  var oClearButton = "<div class='center'><button id='mw_batDB_clear'>Удалить локальную копию</button></div><p>Удалить данные, полученные из файла 'DB.txt'. В таком случае, плеер будет получать данные из основной базы данных.</p>";
  var oExportButton = "<div class='center'><button id='mw_batDB_export'>Экспортировать локальные настройки</button></div><p>Все настройки плеера мо;но сохранить в файл, а потом загрузить обрано в плеер, в случае чего.</p>";
  var oImportButton = "<div class='center'><input type='file' id='mw_batDB_import' name='files[]'/> <button id='mw_batDB_import'>Импортировать локальные настройки</button></div><p>Если вы сохраняли локальные с помощью кнопки выше, у вамс должен быть файл 'DeviantPlayer_LocalDB.txt' с настройками. Загрузите его для восстановения сохраненных ранеее настроек.</p>";
  var oClearAllButton = "<div class='center'><button id='mw_batDB_clearAll'>Очистить локальную базу полностью</button></div><p>Полностью очистить все данные, хранящиеся в плеере. Нажимать только в случае глобального #$@&*!</p>";
  var oContent = "<div class='inner'>"+oOpenButton+oClearButton+"<hr>"+oExportButton+oImportButton+"<hr>"+oClearAllButton+"</div>";
  var oButtons = "<div class='center'><hr><button class='white' id='mw_batDB_close'>Закрыть</button></div>";
  if($("#dbg").length<1)	{
    $("body").append("<div id='dbg'></div><div class='mod_win' id='mw_batDB_manage' >"+oContent+oButtons+"</div>");
  }
}
function closeBatDBWindow() {
  $("#dbg").fadeOut().remove();
  $(".mod_win").fadeOut().remove();
  fKeyListen = true;
  hideInfo();
}
$("body").on('click', "#p_configMusicDB", function(){
  openBatDBWindow();
});
$("body").on('click', "#mw_batDB_close", function(){
  closeBatDBWindow();
});
function handleLocalBDSelect(evt) {
    var files = evt.target.files; // FileList object

    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        var sText = e.target.result;
        parceLocalFile(sText);
      };
    })(files[0]);

    // Read in the image file as a data URL.
    reader.readAsText(files[0]);

  }
function parceLocalFile(sText) {
  var aLines = sText.split(/[\r\n]+/g);
  var aFolders = [];
  var oDB = {};
  var oSoundDB = {};
  var sTmpSoundsFolder = ((SOUNDS.charAt(SOUNDS.length-1)=="/")? SOUNDS.slice(0, -1): SOUNDS) || '!звуки';

  function createFolder(oObj, sFolderName) {
    if(sFolderName) {
      oObj[sFolderName] = {
          number: 0,
          list: []
        }
    }
  }

  aLines.forEach(sLine => {
    if(sLine.length){
      //console.log(sLine);
      var fSounds = new RegExp(sTmpSoundsFolder).test(sLine);
      var aPath = sLine.split(/[\\\/]+/g);

      // file or folder?
      if(/\.[a-zA-Z0-9]+/.test(aPath[aPath.length-1])) {
        var sFileName = aPath.pop();
        var sFolderName = aPath.pop();

        // if music
        if(/\.mp3/.test(sFileName) ||
          /\.wav/.test(sFileName)
        ) {
          // if file not in ROOT
          if(ROOT && ROOT != aPath.concat(sFolderName).join('/')+"/"){

            // sound or music?
            if(fSounds) {
              if(aPath[aPath.length-1] == sTmpSoundsFolder) {
                if(!oSoundDB[sFolderName]) {
                  createFolder(oSoundDB, sFolderName);
                }
                oSoundDB[sFolderName].list.push(sFileName);
                oSoundDB[sFolderName].number++;
              }
            } else {
              // folder exist?
              if(!oDB[sFolderName]) {
                createFolder(oDB, sFolderName);
              }
              oDB[sFolderName].list.push(sFileName);
              oDB[sFolderName].number++;
            }

          } else {
            aPath = aPath.concat(sFolderName);
          }
        }
      }

      //var sTmpParh = aPath.join("/");
      if(!ROOT || ROOT.length<1) {
        ROOT = aPath.join("/")+"/";
      }
    }
  });

  //debugger;

  //var sLocalROOT = loadFromLocalDB(ROOT);
  saveLocalDB("ROOT", ROOT);
  saveLocalDB("SOUNDS", SOUNDS);
  saveLocalDB("musicDB", oDB);
  saveLocalDB("soundsDB", oSoundDB);
  loadBDfromLocalStorage();

  closeBatDBWindow();
}
$("body").on('change', "#mw_batDB_load_input", function(oEvent){
  handleLocalBDSelect(oEvent);
});
$("body").on('click', '#mw_batDB_clear', function() {
  saveLocalDB("musicDB", null);
  saveLocalDB("soundsDB", null);
});
$("body").on('click', '#mw_batDB_export', function() {
	exportLocalConfig();
});
//
$("body").on('click', '#mw_batDB_clearAll', function() {
  localStorage.clear();
})
$("body").on('click', '#mw_batDB_load', function() {
  $("#mw_batDB_load_input").click();
})

//document.getElementById('mw_batDB_load_input').addEventListener('change', handleLocalBDSelect, false);
 ///////////////////////////////////////////////////////////////////////////////////////////

var buttonsToClick = [
	"p_em_dn",
	"p_em_dn",
	"p_hide",
	"p_rand",
	"p_smooth"
];

function clickTopButtons() {
	var timer = setInterval(function(){
		if(buttonsToClick.length>0) {
			var btn = buttonsToClick.pop();
			$("#"+btn).click();
			//console.log("#"+btn+" clicked!");
		} else {
			clearInterval(timer)
		}
	},500);
}

	// скрыть
	$("body").on("click", ".btn.hide", function(){
		if($(this).prop("checked"))
		{
			$(this).closest(".player_form").find(".pf_img").hide();
			$(this).closest(".player_form").find(".pf_list").hide();
			$(this).closest(".player_form").find(".pf_l_sett").hide();
			$(this).closest(".player_form").find(".pf_mng").hide();
		}
		else
		{
			$(this).closest(".player_form").find(".pf_img").show();
			$(this).closest(".player_form").find(".pf_list").show();
			$(this).closest(".player_form").find(".pf_l_sett").show();
			$(this).closest(".player_form").find(".pf_mng").show();
		}
	});

	// / скрыть
	$("body").on("click", "#p_em_up", function(){
		var fs=$(".tracks").css('font-size');
		n_fs=parseFloat(fs, 10)+3;
		//console.log(n_fs);
    saveGlobalSettings('sZoomFontSize', n_fs);
		$(".tracks").css('font-size', n_fs+"px");
	});
	$("body").on("click", "#p_em_dn", function(){
		var fs=$(".tracks").css('font-size');
		n_fs=parseFloat(fs, 10)-3;
////		console.log(n_fs);
    saveGlobalSettings('sZoomFontSize', n_fs);
		$(".tracks").css('font-size', n_fs+"px");
	});
	$("body").on("click", "#p_hide", function(){
		$(".btn.hide").each(function(){
			if(!$(this).prop("checked"))
				$(this).click();
		});
	});
	$("body").on("click", "#p_rand", function(){
		$(".btn.mix").each(function(){
			$(this).click();
		});
	});

	// перемешать
	(function($){
	   $.fn.shuffle = function() {
		  var allElems = this.get(),
		  getRandom = function(max) {
			 return Math.floor(Math.random() * max);
		  },
		  shuffled = $.map(allElems, function(){
			 var random = getRandom(allElems.length),
			 randEl = $(allElems[random]).clone(true)[0];
			 allElems.splice(random, 1);
			 return randEl;
		  });
		  this.each(function(i){
			 $(this).replaceWith($(shuffled[i]));
		  });
		  return $(shuffled);
	   };
	})(jQuery);
	$("body").on("click", ".btn.mix", function(){
	//var ar=[];
	$(this).closest(".player_form").find(".tr_line").shuffle();
	$(this).closest(".player_form").find(".tr_line").each(function(){
		var num=$(this).index()+1;
		//console.log(num);
		$(this).attr("data-num", num);
		});
	});
	// / преремешать


	// управление кнопками
	$("body").keydown(function(eventObject){
    var keyCode = eventObject.which;
    if(keyCode == 16) // SHIFT
    {
      bShift = true;
    }
  });

	$("body").keyup(function(eventObject){
    if(fKeyListen){
            var id=0, ev=0, nm=0;
      var keyCode = eventObject.which;
      if(keyCode == 16) // SHIFT
      {
        bShift = false;
      }
      //alert(keyCode);
      switch(keyCode)
      { //vol up
      case 49: if(bShift) {id=1, ev="sound"} else { id=1; ev="vol_up"}; //1
          break;
        case 50: if(bShift) {id=2, ev="sound"} else {  id=2; ev="vol_up"}; //2
          break;
        case 51: if(bShift) {id=3, ev="sound"} else {  id=3; ev="vol_up"}; //3
          break;
        case 52: if(bShift) {id=4, ev="sound"} else {  id=4; ev="vol_up"}; //4
          break;
        case 53: if(bShift) {id=5, ev="sound"} else {  id=5; ev="vol_up"}; //5
          break;
        case 54: if(bShift) {id=6, ev="sound"} else {  id=6; ev="vol_up"}; //6
          break;
        case 55: if(bShift) {id=7, ev="sound"} else {  id=7; ev="vol_up"}; //7
          break;
        case 56: if(bShift) {id=8, ev="sound"} else {  id=8; ev="vol_up"}; //8
          break;
        case 57: if(bShift) {id=9, ev="sound"} else {  id=9; ev="vol_up"}; //9
          break;
        case 48: if(bShift) {id=0, ev="sound"} else {  id=10; ev="vol_up"}; //0
          break;

        //vol dn
        case 81: id=1; ev="vol_dn"; //Q
          break;
        case 87: id=2; ev="vol_dn"; //W
          break;
        case 69: id=3; ev="vol_dn"; //E
          break;
        case 82: id=4; ev="vol_dn"; //R
          break;
        case 84: id=5; ev="vol_dn"; //T
          break;
        case 89: id=6; ev="vol_dn"; //Y
          break;
        case 85: id=7; ev="vol_dn"; //U
          break;
        case 73: id=8; ev="vol_dn"; //I
          break;
        case 79: id=9; ev="vol_dn"; //O
          break;
        case 80: id=10; ev="vol_dn"; //P
          break;

        //play pause
        case 65: id=1; ev="pp"; //Q
          break;
        case 83: id=2; ev="pp"; //W
          break;
        case 68: id=3; ev="pp"; //E
          break;
        case 70: id=4; ev="pp"; //R
          break;
        case 71: id=5; ev="pp"; //T
          break;
        case 72: id=6; ev="pp"; //Y
          break;
        case 74: id=7; ev="pp"; //U
          break;
        case 75: id=8; ev="pp"; //I
          break;
        case 76: id=9; ev="pp"; //O
          break;
        case 186: id=10; ev="pp"; //P
          break;

        //next
        case 90: id=1; ev="nx"; //Q
          break;
        case 88: id=2; ev="nx"; //W
          break;
        case 67: id=3; ev="nx"; //E
          break;
        case 86: id=4; ev="nx"; //R
          break;
        case 66: id=5; ev="nx"; //T
          break;
        case 78: id=6; ev="nx"; //Y
          break;
        case 77: id=7; ev="nx"; //U
          break;
        case 188: id=8; ev="nx"; //I
          break;
        case 190: id=9; ev="nx"; //O
          break;
        case 191: id=10; ev="nx"; //P
          break;

        // soundx
        case 45:
        case 96: id=0, ev="sound";
          break;
        case 35:
        case 97: id=1, ev="sound";
          break;
        case 40:
        case 98: id=2, ev="sound";
          break;
        case 34:
        case 99: id=3, ev="sound";
          break;
        case 37:
        case 100: id=4, ev="sound";
          break;
        case 12:
        case 101: id=5, ev="sound";
          break;
        case 39:
        case 102: id=6, ev="sound";
          break;
        case 36:
        case 103: id=7, ev="sound";
          break;
        case 38:
        case 104: id=8, ev="sound";
          break;
        case 33:
        case 105: id=9, ev="sound";
          break;

        // top panel
        case 189: // -
          $("#p_em_dn").click();
          break;
        case 187: // +
          $("#p_em_up").click();
          break;
        case 219: // hide
          $("#p_hide").click();
          break;
        case 221: // random
          $("#p_rand").click();
          break;
      }
      //console.log("id: "+id+" ev: "+ev);
      if(ev=="vol_up")
        {
        player[id].mus_vol += 0.05;
        console.log("m_vol: "+player[id].mus_vol);
        volume(id, player[id].mus_vol);
        }
      if(ev=="vol_dn")
        {
        player[id].mus_vol -= 0.05;
        console.log("m_vol: "+player[id].mus_vol);
        volume(id, player[id].mus_vol);
        }
      if(ev=='pp')
        {
          $(".player_form[data-name='"+id+"']").find(".pf_play_bt").click();
        }
      if(ev=='nx')
        {
          $(".player_form[data-name='"+id+"']").find(".pf_next_bt").click();
        }
      if(ev=='sound')
        {
          var i = id;
            //alert(i);
          $("#sounds_container .soundButton").eq(i).click();
        }

    }
		return false;
	});
	// / кнопки

function a_fail(e){
		// audio playback failed - show a message saying why
   // to get the source of the audio element use $(this).src
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       console.error('You aborted the video playback.');
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       console.error('A network error caused the audio download to fail.');
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       console.error('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       console.error('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
       break;
     default:
       console.error('An unknown error occurred.');
       break;
   }
};

function onWindowResize() {
  recountMWPlaylistsWindow();
}

/*/
var auds=document.getElementsByTagName('audio');
	for (var i=0;i<auds.length;i++){
        addEvent(auds[i], 'ended', a_ended);
       // addEvent(auds[i], 'error', a_fail(e));
	   auds[i].addEventListener(events[i], onEvent, false);
		//$(auds[i]).addEventListener('ended', onEndFunc);
	////	console.log("event added //"+i);
    }
/**/

// invalidate audio source (will fire abort, emptied, and error)
var emptyAudio = function() {
    console.error("Проблема с аудио");
};
function loadBDfromLocalStorage() {
  try{
    if(!soundsDB || Object.keys(soundsDB).length === 0 && soundsDB.constructor === Object) {
      window.soundsDB = getFromLocalDB("soundsDB");
    }
  } catch (err) {
    window.soundsDB = {};
  }
  try{
    if(!musicDB || Object.keys(musicDB).length === 0 && musicDB.constructor === Object) {
      window.musicDB = getFromLocalDB("musicDB");
    }
  } catch (err) {
    window.musicDB = {};
  }
  var oTmpSounds = getFromLocalDB("soundsDB");
  if(oTmpSounds) {
    window.soundsDB = oTmpSounds;
  }
  var oTmpMusic = getFromLocalDB("musicDB");
  if(oTmpMusic) {
    window.musicDB = oTmpMusic;
  }
  /*/
  if(!soundsDB) {
    window.soundsDB = getFromLocalDB("soundsDB");
  }
  if(!musicDB) {
    window.musicDB = getFromLocalDB("musicDB");
  }
  /**/
}

function exportLocalConfig() {
	var sData = localStorage.getItem('MusicBoxDB');
  var filename = "DeviantPlayer_LocalDB";
  var blob = new Blob([sData], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filename+".txt");
}
function importLocalConfig() {

}

function openLocalConfigFile(evt) {
    var files = evt.target.files; // FileList object

    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        var sText = e.target.result;
        parceLocalConfigFile(sText);
      };
    })(files[0]);

    // Read in the image file as a data URL.
    reader.readAsText(files[0]);

  }
function parceLocalConfigFile(sText) {
	try{
  	var oLocalDB = JSON.parse(sText);
  } catch (err) {
  	alert("Ошибка при чтении файла.");
  	console.log("[ERROR] can't parce file: " + err);
  }

  ROOT = oLocalDB.ROOT;
  SOUNDS = oLocalDB.SOUNDS;
  oDB = oLocalDB.oDB;
  oSoundDB = oLocalDB.oSoundDB;

  //var sLocalROOT = loadFromLocalDB(ROOT);
  saveLocalDB("ROOT", ROOT);
  saveLocalDB("SOUNDS", SOUNDS);
  saveLocalDB("musicDB", oDB);
  saveLocalDB("soundsDB", oSoundDB);


  //loadBDfromLocalStorage();

  //closeBatDBWindow();
}

function hideInfo(){
	if($("#TrackListsList").children().length != 0 || $("#sounds_container").children().length != 0) {
		$("#info").hide();
	}
}

onWindowResize();
window.onresize = onWindowResize;

// load from local storage if normal DB not exist
loadBDfromLocalStorage();
addTrackListsFromDB();
// load sounds DB
loadSoundListsData();
cloneSoundsDataFromDB();
createSoundColumn();

loadGlobalSettings();
setZoomFontsize();

hideInfo();

//clickTopButtons();
});
