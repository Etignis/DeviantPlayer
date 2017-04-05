		/*			
function add_player_form(){
	num = $(".player_form").length;
	$(".tracks").append(player_form);
	$(".player_form:last").attr('data-name', num+1);
}
function add_track(pf_id){
	$(".player_form[data-name='"+pf_id+"']").children(".pf_list").append(tr_line);
}
*/

var ROOT = 'D:/Cloud/DnD/Музыка/';
//var ROOT = 'D:/DnD/Музыка/';

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

$(document).ready(function(){
	
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
			"default": "fa-play"
		};
		
		if($("#sounds_container").lenght>0) {
			
		} else {
			$("body").append(this.container);
		}
	}
	add(URL, IMG) {
		var new_sound = {
			url: URL,
			img: IMG
		};
		this.sounds_arr.push(new_sound);
		this.rerender();
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
			var sound_item = "<button class='soundButton' "+audio_list+"><i class='fa "+img+"'></i><audio id='audio_sound_"+item+"' src='" + deafault_audio + "'></audio></button>";
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
	PlayerForm.prototype.create = function(name, lt, type)
		{			
		num = $(".player_form").length;
		this.name = name;
		
		if(type === undefined)
			type="usual";
		
		var pf_lt  		   = "<div class='pf_lt'>"+lt+"</div>";
		if(lt === undefined)
			pf_lt="";
		var pf_sett        = "<div class='pf_sett'>"+
								"<div class='btns'>"+
									"<input type='checkbox' checked='checked' id='ch_"+this.name+"' class='btn cycle'><label for='ch_"+this.name+"' ><i class='fa fa-retweet'></i></label>"+
									"<button class='btn mix'><i class='fa fa-random'></i></button>"+
									"<input type='checkbox' id='hd_"+this.name+"' class='btn hide'><label for='hd_"+this.name+"' ><i class='fa fa-eye-slash'></i></label>"+
									//"<button>3</button>"+
								"</div>"+
								"<div class='vol'>"+
									"<input type='range' orient=vertical class='volume' min='0' max='50' value=25>"+
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
						pf_img+
						pf_list+
						pf_l_sett+
						pf_mng+
					"</div>";
						
			$(".tracks").append(player_form);
			$(".player_form:last").attr('data-name', num+1);
			$(".player_form:last").attr('data-form-name', this.name);
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
		tr_line = "<div class='tr_line' data-url='"+url+"' data-num='"+num+"'>"+
				"<table>"+
					"<tr>"+
						"<td class='count'></td>"+
						"<td><input type='checkbox' class='f_ch'></td>"+
						"<td><input type='checkbox' class='f_pl'></td>"+
						"<td class='name_place'>"+
							"<div class='name' title='"+name+"'>"+name+"</div>"+
						"</td>"+
					"</tr>"+
				"</table>"+
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
 $("body").on('click', ".soundButton", function(){
	var audioID = $(this).find("audio").attr("id");
	var audio_array = $("#"+audioID).parent().attr("data-audio-array");
	if(audio_array) {
		var arr = audio_array.split("|");		
		
		$("#"+audioID).attr("src", arr[randd(0, arr.length-1)]);
	}
	var audio = document.getElementById(audioID)
		audio.play();
		
 });
 	
	
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
 var Folder='';
 
 var player_i = 1;
 var player = [];
 
 player[player_i] = new PlayerForm();
 player[player_i].create("Спокойное", lt[player_i-1]);
 Folder = 'спокойно/';

player[player_i].add_track(ROOT+Folder+'1 - Ваше первое путешествие. Вы зеленый авантюрист-новичок.mp3');
player[player_i].add_track(ROOT+Folder+'Yasunori Mitsuda - Schalas Theme (Chrono Trigger).mp3');
player[player_i].add_track(ROOT+Folder+'Yasunori Mitsuda - Corridors of Time (Chrono Trigger).mp3');
player[player_i].add_track(ROOT+Folder+'Yasunori Mitsuda - Secret Of The Forest (Chrono Trigger).mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XII OST - White Room.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XII OST - Destiny.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XII OST - Eruyt Village.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XII OST - Opening Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Trevor Morris - Orlais Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu - Balamb Garden.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu - Balamb Garden.mp3');
player[player_i].add_track(ROOT+Folder+'Меч и Магия 7 - Замок Хармондейл.mp3');
player[player_i].add_track(ROOT+Folder+'Frank Klepacki (Lands of Lore 3) - Town Streets.mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi Howls Moving Castle OST - Merry Go Round of Life.mp3');
player[player_i].add_track(ROOT+Folder+'Dean Evans - Main Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Noriko Matsueda, Takahito Eguchi - Ending - Until the Day we Meet Again.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Auriels Ascension.mp3');
player[player_i].add_track(ROOT+Folder+'Koji Kondo - Zeldas Recollection.mp3');
player[player_i].add_track(ROOT+Folder+'Charles B. R. Mitchell - Kingdom Under Fire - RPG1 Mix 22 (11-22k).mp3');
player[player_i].add_track(ROOT+Folder+'Charles B. R. Mitchell - Kingdom Under Fire - HU Pro Mix 1 22 (11-22k).mp3');
player[player_i].add_track(ROOT+Folder+'Koji Kondo - Title Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Kenta Nagata, Hajime Wakai, Toru Minegishi, Koji Kondo - Staff Credits.mp3');
player[player_i].add_track(ROOT+Folder+'Kenta Nagata, Hajime Wakai, Toru Minegishi, Koji Kondo - Windfall Island.mp3');
player[player_i].add_track(ROOT+Folder+'Kenta Nagata, Hajime Wakai, Toru Minegishi, Koji Kondo - Outset Island.mp3');
player[player_i].add_track(ROOT+Folder+'Steamboy (Steve Jablonsky) - Crystal Palace Waltz.mp3');
player[player_i].add_track(ROOT+Folder+'17 - Steve Jablonsky - Fly in the sky (Steamboy OST).mp3');
player[player_i].add_track(ROOT+Folder+'15 - Steve Jablonsky - Rays Theme (Steamboy OST).mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Caprice.mp3');
player[player_i].add_track(ROOT+Folder+'Howard Shore - The Movies [OST Хранитель времени].mp3');
player[player_i].add_track(ROOT+Folder+'James Mulvale - Quest for Infamy - 0D5 (16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'James Mulvale - Quest for Infamy - 08A (16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of Might and Magic III - Good Theme.mp3');
player[player_i].add_track(ROOT+Folder+'SpellForce - The Order of Dawn - Celtic March.mp3');
player[player_i].add_track(ROOT+Folder+'SpellForce The Order of Dawn - Welcome to Liannon.mp3');
player[player_i].add_track(ROOT+Folder+'Не время для Драконов - Душа Дракона.mp3');
player[player_i].add_track(ROOT+Folder+'Noriyasu Agematsu - Peaceful Village.mp3');
player[player_i].add_track(ROOT+Folder+'Noriyasu Agematsu - Tree of Tales.mp3');
player[player_i].add_track(ROOT+Folder+'Ultima Online (game) - Minoc (ver. 2).mp3');
player[player_i].add_track(ROOT+Folder+'Ultima Online - Mine Theme (Stones).mp3');
player[player_i].add_track(ROOT+Folder+'Ultima Online (game) - Forest (ver. 2).mp3');
player[player_i].add_track(ROOT+Folder+'Black Desert Online OST - Bear Villiage.mp3');
player[player_i].add_track(ROOT+Folder+'Black Desert Online OST - Calpheon.mp3');
player[player_i].add_track(ROOT+Folder+'Royal Cavalry in Battle.mp3');
player[player_i].add_track(ROOT+Folder+'Morning in the Celtic Hills.mp3');
player[player_i].add_track(ROOT+Folder+'Castle of the Great Sorcerer.mp3');
player[player_i].add_track(ROOT+Folder+'Takatsugu Muramatsu–Marnie.mp3');
player[player_i].add_track(ROOT+Folder+'Takatsugu Muramatsu-The Girl in the Blue Window.mp3');
player[player_i].add_track(ROOT+Folder+'Tom Waits–Helsinki Mood.mp3');
player[player_i].add_track(ROOT+Folder+'Gilead–Stella Splendens .mp3');
player[player_i].add_track(ROOT+Folder+'Fantasy_-_Camp.mp3');
player[player_i].add_track(ROOT+Folder+'Thomas_Bergersen_-_Cassandra.mp3');
player[player_i].add_track(ROOT+Folder+'Immediate_Music_-_A_Life_Extraordinary.mp3');
player[player_i].add_track(ROOT+Folder+'Dwayne_Ford_-_Air_Support.mp3');
player[player_i].add_track(ROOT+Folder+'Benoit_Groulx_-_Magic_Spell_(OST_Jonathan_Strange_&_Mr_Norrell).mp3');
player[player_i].add_track(ROOT+Folder+'Kirill_Pokrovsky_-_Guardians_of_Light.mp3');
player[player_i].add_track(ROOT+Folder+'Kirill_Pokrovsky_-_Pleasure_of_Simplicity_Alt.mp3');
player[player_i].add_track(ROOT+Folder+'Lind_Erebros__Age_of_Decadence_-_Shadow_of_the_past.mp3');
player[player_i].add_track(ROOT+Folder+'THE_SETTLERS_-_Расцвет_империи_7.mp3');
player[player_i].add_track(ROOT+Folder+'The_Settlers_7_-_New_Worlds_Dawn.mp3');
player[player_i].add_track(ROOT+Folder+'Age of Empires III - - Geddovmagushpa.mp3');
player[player_i].add_track(ROOT+Folder+'Ah-Nee-Mah (Diane & David Arkenstone) - Ancient Spirits.mp3');
player[player_i].add_track(ROOT+Folder+'American Conquest - Indeans Prelude.mp3');
player[player_i].add_track(ROOT+Folder+'American Conquest Music - MayaNewIndeans2.mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Caladon (by Ben Houge).mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Cities (by Ben Houge).mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Quintarra (by Ben Houge).mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Tarant (by Ben Houge).mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - The Tarant Sewers.mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Tulla (by Ben Houge).mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Wilderness (by Ben Houge).mp3');
player[player_i].add_track(ROOT+Folder+'CHUR band & Rejenorst Media - RUSVaegirs Travel (Remix).mp3');
player[player_i].add_track(ROOT+Folder+'CHUR band & Rejenorst Media - Swadian Infantry (Remix).mp3');
player[player_i].add_track(ROOT+Folder+'Coeur De Pirate - Comme Des Enfants.mp3');
player[player_i].add_track(ROOT+Folder+'Coeur de Pirate - Hymn of Light.mp3');
player[player_i].add_track(ROOT+Folder+'Coeur de Pirate - Jupiters Lightning.mp3');
player[player_i].add_track(ROOT+Folder+'Coeur de Pirate - Leave Your Castle.mp3');
player[player_i].add_track(ROOT+Folder+'Coeur de Pirate - Little Girl, Gen.mp3');
player[player_i].add_track(ROOT+Folder+'Coeur de Pirate - Magnas Heart.mp3');
player[player_i].add_track(ROOT+Folder+'Coeur de Pirate - Metal Gleamed in the Twilight.mp3');
player[player_i].add_track(ROOT+Folder+'Coeur de Pirate - Off to Sleep.mp3');
player[player_i].add_track(ROOT+Folder+'Coeur de Pirate - Patches of Sky.mp3');
player[player_i].add_track(ROOT+Folder+'Danny Elfman & Russell Shaw - Bowerlake.mp3');
player[player_i].add_track(ROOT+Folder+'Danny Elfman - Main Titles.mp3');
player[player_i].add_track(ROOT+Folder+'Die Verbannten Kinder Evas - May No Tears Stain This Holy Ground.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - Bride Of The Ocean (Into The Blue).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - Foreign Waters (Into The Blue).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - In the Doldrums (Into The Blue).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - On Deck (Into The Blue).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - The Forest.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - The Storm (Into The Blue).mp3');
player[player_i].add_track(ROOT+Folder+'Excellent Track - Lineage 2 OST - 42.Rune Township Theme - Home of Winds.mp3');
player[player_i].add_track(ROOT+Folder+'Existence (Margot Reisinger) - Between Earth And Sky.mp3');
player[player_i].add_track(ROOT+Folder+'Fable 3 - Хмарская долина.mp3');
player[player_i].add_track(ROOT+Folder+'Forest Swords - Hood.mp3');
player[player_i].add_track(ROOT+Folder+'Garry Schyman - Dancers on a String OST Bioshock.mp3');
player[player_i].add_track(ROOT+Folder+'Garry Schyman - Pairbond (Bioshock 2 Theme).mp3');
player[player_i].add_track(ROOT+Folder+'Geoff Knorr - Pocatello Peace - Shoshone - Shoshone Sun Dance Songs.mp3');
player[player_i].add_track(ROOT+Folder+'Harry Gregson-Williams - From Western Woods to Beaversdam.mp3');
player[player_i].add_track(ROOT+Folder+'Hearthstone Fun - The Arena Awaits.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes - Kira say....mp3');
player[player_i].add_track(ROOT+Folder+'Ian Smith - Hiawatha Peace - Iroquois - Ho, Ho, Watanay.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Peaceful life.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - The Bannered Mare.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Through the ages.mp3');
player[player_i].add_track(ROOT+Folder+'Jesper Kyd - Aphelion (OST Гостья The Host 2013).mp3');
player[player_i].add_track(ROOT+Folder+'Jesper Kyd - City Of Jerusalem.mp3');
player[player_i].add_track(ROOT+Folder+'Jesper Kyd - City of Rome.mp3');
player[player_i].add_track(ROOT+Folder+'John Renbourn - Alman Melancholy Galliard.mp3');
player[player_i].add_track(ROOT+Folder+'John Renbourn - Bransle Gay Bransle de Bourgogne.mp3');
player[player_i].add_track(ROOT+Folder+'John Renbourn - Lamento di Tristan La Rotta.mp3');
player[player_i].add_track(ROOT+Folder+'John Renbourn - My Johnny was a Shoemaker Westron Wynde Scarborough Fair.mp3');
player[player_i].add_track(ROOT+Folder+'John Renbourn - Sarabande.mp3');
player[player_i].add_track(ROOT+Folder+'John Renbourn - The Lady and the Unicorn.mp3');
player[player_i].add_track(ROOT+Folder+'John Renbourn - Trotto Saltarello.mp3');
player[player_i].add_track(ROOT+Folder+'John Renbourn - Veri Floris Triple Ballade.mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - Ardea (Gothic OST).mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - Faring Explore.mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - From Silden To Trelis(OST Gothic 3).mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - Gothic II OST - The Harbor.mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - Harbor City - Day (OST Risen).mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - Trelis Night.mp3');
player[player_i].add_track(ROOT+Folder+'klive - Lomavatn.mp3');
player[player_i].add_track(ROOT+Folder+'L2 OST - Gracia Town Theme - Gracia.mp3');
player[player_i].add_track(ROOT+Folder+'Lamento Beyond the void - Ransen.mp3');
player[player_i].add_track(ROOT+Folder+'Lineage 2 - Dion.mp3');
player[player_i].add_track(ROOT+Folder+'Lineage 2 OST - Aden.mp3');
player[player_i].add_track(ROOT+Folder+'Lineage 2 OST - Heine.mp3');
player[player_i].add_track(ROOT+Folder+'Ludovico Einaudi - Fly.mp3');
player[player_i].add_track(ROOT+Folder+'Magicka 2 - Main Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Michael Curran - Montezuma Peace - Aztec - Cora Mitote Song from Santa Teresa.mp3');
player[player_i].add_track(ROOT+Folder+'Michiel van den Bos - Elf Swamp.mp3');
player[player_i].add_track(ROOT+Folder+'Music for R.P.G. - Farewell.mp3');
player[player_i].add_track(ROOT+Folder+'Music for R.P.G. - Sayuris Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Neverwinter Nights 2 - Day in City Docks.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Dyrford.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Dyrwood.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Elmshore.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Encampment.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Engwith.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Gilded Vale.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Ondras Gift.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Twin Elms.mp3');
player[player_i].add_track(ROOT+Folder+'Princess Mononoke OST - The Battle Drums.mp3');
player[player_i].add_track(ROOT+Folder+'Rejenorst Media - Lord and Land.mp3');
player[player_i].add_track(ROOT+Folder+'Risen OST - The Great Swamp.mp3');
player[player_i].add_track(ROOT+Folder+'Robert L. Euvino - Castle Jam.mp3');
player[player_i].add_track(ROOT+Folder+'Robert L. Euvino - Harpy 1.mp3');
player[player_i].add_track(ROOT+Folder+'Robert L. Euvino - Harpy 2.mp3');
player[player_i].add_track(ROOT+Folder+'Robert L. Euvino - Harpy 3.mp3');
player[player_i].add_track(ROOT+Folder+'Robert L. Euvino - Sad Times.mp3');
player[player_i].add_track(ROOT+Folder+'Robert L. Euvino - Two Mandolins.mp3');
player[player_i].add_track(ROOT+Folder+'Russel Shaw - Fable 3 - Execution.mp3');
player[player_i].add_track(ROOT+Folder+'Stronghold - Mattsjig.mp3');
player[player_i].add_track(ROOT+Folder+'Stronghold OST - Castlejam.mp3');
player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - A Brief Respite(Darkest Dungeon OST).mp3');
player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - Terror And Madness (Darkest Dungeon OST).mp3');
player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - The Hamlet(Darkest Dungeon OST).mp3');
player[player_i].add_track(ROOT+Folder+'TES III Morrowind - Main Theme (Guitar Remix).mp3');
player[player_i].add_track(ROOT+Folder+'Thomas Newman - Any Other Name.mp3');
player[player_i].add_track(ROOT+Folder+'Vangelis - El Greco Movement I.mp3');
player[player_i].add_track(ROOT+Folder+'Wardruna - Ar var alda.mp3');
player[player_i].add_track(ROOT+Folder+'Kyle_Gabler_-_Jelly_—_World_of_Goo_Soundtrack.mp3');
player[player_i].add_track(ROOT+Folder+'Индейцы_-_Индейская_музыка.mp3');
player[player_i].add_track(ROOT+Folder+'Индейцы_Перу_-_Пыль_и_ветер.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi_Sakimoto_(OST_Final_Fantasy_Tactics)_-_Brave_Story.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi_Sakimoto_(OST_Final_Fantasy_Tactics)_-_Almas_Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi_Sakimoto_(OST_Final_Fantasy_Tactics)_-_Ovelias_Worries.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi_Sakimoto_(OST_Final_Fantasy_Tactics)_-_Heros_Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Stan_LePard_-_King_of_Dragon_Pass_(ios)_-_Win_Game_Music_!_(16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Stan_LePard_-_King_of_Dragon_Pass_(ios)_-_Earth_Season_!!_(16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Stan_LePard_-_King_of_Dragon_Pass_(ios)_-_Q1Hopeful_!_(16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Stan_LePard_-_King_of_Dragon_Pass_(ios)_-_Dark_Season_!!_(16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Stan_LePard_-_King_of_Dragon_Pass_(ios)_-_Storm_Season_!!_(16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Stan_LePard_-_King_of_Dragon_Pass_(ios)_-_Is_It_Adventure_(16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Stan_LePard_-_King_of_Dragon_Pass_(ios)_-_Intro_Overture_!_(16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Heroes_of_Might_and_Magic_IV_-_The_Academy_Of_Honor.mp3');
player[player_i].add_track(ROOT+Folder+'Paul_Romero_&_Rob_King_-_Inferno_Town_[OST_Heroes_of_Might_and_Magic_III].mp3');
player[player_i].add_track(ROOT+Folder+'The_Moon_And_The_Nightspirit_-_Égi_Táltos.mp3');
player[player_i].add_track(ROOT+Folder+'Medievallica_-_Ductia_Metallica.mp3');
player[player_i].add_track(ROOT+Folder+'Medievallica_-_Orionis_stellae_(Metallica_cover).mp3');
player[player_i].add_track(ROOT+Folder+'Medievallica_-_Lai_of_consciousness_(Dream_Theater_cover).mp3');
player[player_i].add_track(ROOT+Folder+'Michiru_Oshima_-_Kodoku.mp3');
player[player_i].add_track(ROOT+Folder+'Noriyuki_Iwadare_(OST_Grandia_II)_-_Despair_and_Hope.mp3');
player[player_i].add_track(ROOT+Folder+'Hang_Massive_-_Tingless-Ting.mp3');
player[player_i].add_track(ROOT+Folder+'Hang_Massive_-_From_the_view.mp3');
player[player_i].add_track(ROOT+Folder+'Hang_Massive_-_Raindrops.mp3');
player[player_i].add_track(ROOT+Folder+'Hang_Massive_-_From_the_view_live.mp3');
player[player_i].add_track(ROOT+Folder+'Hang_Music_-_sk-negatan-live.mp3');
player[player_i].add_track(ROOT+Folder+'Gaë_Bolg_-_Chanson.mp3');
player[player_i].add_track(ROOT+Folder+'Gaë_Bolg_and_the_Church_of_Fand_-_Montsegur.mp3');
player[player_i].add_track(ROOT+Folder+'Gaë_Bolg_-_Danse.mp3');
player[player_i].add_track(ROOT+Folder+'Irish_Music_-_Kuhulins_blood.mp3');
player[player_i].add_track(ROOT+Folder+'Эпичная_музыка_-_Hour_Epic_Music_-_Vol._7.mp3');
player[player_i].add_track(ROOT+Folder+'Music_Mod_-_Sylvan.mp3');
player[player_i].add_track(ROOT+Folder+'Paul_Romero,_etc._-_Desolation.mp3');
player[player_i].add_track(ROOT+Folder+'Elador_-_Wasteland_Of_Barbarians.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes_of_Might_and_Magic_VI_(OST)_-_Autumn_Is_Coming.mp3');
player[player_i].add_track(ROOT+Folder+'Norbert_Rodenkirchen_-_Nach_Der_Senenden_Claghe_Muz_Ich_Singhen.mp3');
player[player_i].add_track(ROOT+Folder+'Norbert_Rodenkirchen_-_Ich_Han_Gedacht.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_The_Journey_Begins_(Into_The_Green).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_The_City_(Into_The_Green).mp3');
player[player_i].add_track(ROOT+Folder+'Lewon,_MarcRomain,_Baptiste_-_Der_hedamerschol_(stantipes)_(after_a_trouvere_song,_13th_Century).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_The_Castle_(Into_The_Red).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_The_Forest_(Into_The_Green).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_Going_Down_(Into_The_Green).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_Shadows_(Into_The_Green).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_Mystical_Clearing_(Into_The_Green).mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Angels_Redemption.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Desert_Village.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Mystic_River.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Secret_Garden.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Evening_Falls.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Virtue_lost.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Awakening.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Song_of_Mourning.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Minds_Eye.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Long_Live_the_King.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Mont_St._Joseph.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Rainy_Day.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_The_saga_begins.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Dire_News.mp3');
player[player_i].add_track(ROOT+Folder+'Justin_Bell_(Pillars_of_Eternity)_-_Ondras_Gift.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_Over_The_Next_Hill_(OST_The_Elder_Scrolls_III_Morrowind).mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_Peace_At_Last_(The_Elder_Scrolls_III_-_Morrowind_OST).mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_Auriels_Ascension.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_(The_Elder_Scrolls_4_Oblivion_SoundTrack)_-_Peace_of_Akatosh.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_(The_Elder_Scrolls_4_Oblivion_SoundTrack)_-_Glory_of_Cyrodiil.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_(The_Elder_Scrolls_4_Oblivion_SoundTrack)_-_Watchmans_Ease.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_(The_Elder_Scrolls_4_Oblivion_SoundTrack)_-_Wings_of_Kynareth.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_(The_Elder_Scrolls_4_Oblivion_SoundTrack)_-_King_and_Country.mp3');
player[player_i].add_track(ROOT+Folder+'Alla_Francesca_-_08._Tierche_estampie_royale.mp3');
player[player_i].add_track(ROOT+Folder+'Sequentia_-_Instrumental_piece.mp3');
player[player_i].add_track(ROOT+Folder+'La_Reverdie_-_Pyançe_la_Bella_Yguana.mp3');
player[player_i].add_track(ROOT+Folder+'Caspian_-_Vienna.mp3');
player[player_i].add_track(ROOT+Folder+'Sirion_-_Throught_the_Lands_and_Forests.mp3');
player[player_i].add_track(ROOT+Folder+'Fata_Morgana_-_A_Forest_Path.mp3');
player[player_i].add_track(ROOT+Folder+'Lord_Lovidicus_-_Fog_of_the_Autumnal_Forest.mp3');
player[player_i].add_track(ROOT+Folder+'Last_Hearth_-_The_Haunted_Forest.mp3');
player[player_i].add_track(ROOT+Folder+'Aelvar_-_Whispers_from_the_Deep_Forest.mp3');
player[player_i].add_track(ROOT+Folder+'Aaron_Dunn_-_The_Music_of_the_Ainur.mp3');
player[player_i].add_track(ROOT+Folder+'Aaron_Dunn_-_Beginning_of_Days.mp3');
player[player_i].add_track(ROOT+Folder+'Aaron_Dunn_-_The_Union_of_the_Two_Kindreds.mp3');
player[player_i].add_track(ROOT+Folder+'Forgotten_Kingdoms_-_Forgotten_Kingdoms.mp3');
player[player_i].add_track(ROOT+Folder+'Arath_-_The_Castle_In_The_Hills_(2011).mp3');
player[player_i].add_track(ROOT+Folder+'Iymrya_-_Tale_Of_Fallen_Throne.mp3');
player[player_i].add_track(ROOT+Folder+'Murgrind_-_A_Tribute_To_Mortiis_Part_I_(Bonustrack).mp3');
player[player_i].add_track(ROOT+Folder+'Murgrind_-_A_Tribute_To_Mortiis_Part_II_(Bonustrack).mp3');
player[player_i].add_track(ROOT+Folder+'Lind_Erebros__Age_of_Decadence_-_The_Dead_Rivers_of_a_Sand_Wind_(Аудио_группы_httpvkontakte.ruclub12503448_).mp3');
player[player_i].add_track(ROOT+Folder+'Lind_Erebros__Age_of_Decadence_-_town_ambient_(Аудио_группы_httpvkontakte.ruclub12503448_).mp3');
player[player_i].add_track(ROOT+Folder+'Lind_Erebros__Age_of_Decadence_-_Nature_regeneration_(Аудио_группы_httpvkontakte.ruclub12503448_).mp3');
player[player_i].add_track(ROOT+Folder+'Lind_Erebros__Age_of_Decadence_-_Pine_Thicket_(Аудио_группы_httpvkontakte.ruclub12503448_).mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_The_Cuckoo_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_The_Enchantress_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Wild_Mountain_Thyme_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Greensleeves_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Scarborough_Fair_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Misty_Mountain_Lady_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_McBurney_s_Jig_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Roxborough_Castle_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_The_Enchantress_portasound.ru (1).mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Rights_of_Man_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Black_Mountain_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Sylvie_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_The_Enchantress_portasound.ru (2).mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Royal_Forester_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Twin_Lakes_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_The_Road_Most_Travelled.mp3');
player[player_i].add_track(ROOT+Folder+'JOURNEY_game_OST_Austin_Wintory_-_Atonement.mp3');
player[player_i].add_track(ROOT+Folder+'Journey_-_game_OST_-_Threshold.mp3');
player[player_i].add_track(ROOT+Folder+'Russell_Brower,_Neal_Acree,_Sam_Cardon,_Edo_Guidotti_&_Jeremy_Soule_-_The_August_Celestials.mp3');
player[player_i].add_track(ROOT+Folder+'Grant_Kirkhope_-_Reckoning_Main_Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Grant_Kirkhope_-_Deads_Dead.mp3');
player[player_i].add_track(ROOT+Folder+'Grant_Kirkhope_-_Well_of_Souls.mp3');
player[player_i].add_track(ROOT+Folder+'Grant_Kirkhope_-_House_of_Ballads.mp3');
player[player_i].add_track(ROOT+Folder+'blue_spark-_.mp3');
player[player_i].add_track(ROOT+Folder+'dust_in_the_wind-_.mp3');
player[player_i].add_track(ROOT+Folder+'smth1_-_.mp3');
player[player_i].add_track(ROOT+Folder+'Logan_Epic_Canto_-_Knights_bravery.mp3');
player[player_i].add_track(ROOT+Folder+'Logan_Epic_Canto_-_Legend_of_Merlin.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Far_from_Home.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Into_Bitter_Coast.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Journey_to_the_East.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Lake_Wolvar.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Lament.mp3');
player[player_i].add_track(ROOT+Folder+'Inon_Zur_-_Tragic_Love.mp3');
player[player_i].add_track(ROOT+Folder+'Inon_Zur_-_The_Dalish_Elves_Encampment.mp3');
player[player_i].add_track(ROOT+Folder+'Rod_Abernethy_&_Inon_Zur_-_City_Of_Truth_(Theme_For_Allemantheia).mp3');
player[player_i].add_track(ROOT+Folder+'Inon_Zur_-_Valadilene.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Region_of_Solstheim.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_The_Wanderer.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Valley_of_Rochebere.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_The_Imperial_Road.mp3');
player[player_i].add_track(ROOT+Folder+'Mychael_And_Jeff_Danna_-_The_Nightingales_Song.mp3');
player[player_i].add_track(ROOT+Folder+'Mychael_and_Jeff_Danna_-_Morgans_Council.mp3');
player[player_i].add_track(ROOT+Folder+'Mychael_and_Jeff_Danna_-_Sword_Of_Destiny.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_Call_of_Magic.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_Targos_Town.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_Caprice.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_Ancient_Stones.mp3');
player[player_i].add_track(ROOT+Folder+'Workbench_-_Dream_Of_Silence.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_Kuldahar_Town.mp3');
player[player_i].add_track(ROOT+Folder+'Oscar_Araujo_-_Enchanted_Forest.mp3');
player[player_i].add_track(ROOT+Folder+'Dungeons_and_Dragons_-_Waltz_of_War.mp3');
player[player_i].add_track(ROOT+Folder+'Tempests_Wake.mp3');
player[player_i].add_track(ROOT+Folder+'Curse_of_the_Worgen.mp3');
player[player_i].add_track(ROOT+Folder+'Matt_Uelmen_-_Fortress.mp3');
player[player_i].add_track(ROOT+Folder+'Matt_Uelmen_-_Coda.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_The_Heartstone_Gem_(Movie_3).mp3');
player[player_i].add_track(ROOT+Folder+'Dust_Sense.mp3');
player[player_i].add_track(ROOT+Folder+'FlybyNo_-_So_Close_(Endless_Legend).mp3');
player[player_i].add_track(ROOT+Folder+'FlybyNo_-_The_Forest_Spirit.mp3');
player[player_i].add_track(ROOT+Folder+'Tilman_Sillescu_-_Outdoor.mp3');
player[player_i].add_track(ROOT+Folder+'Phantawalker_-_Wizards_Valley.mp3');
player[player_i].add_track(ROOT+Folder+'Pawei_Biaszczak,_Adam_Skorupa_-_Returning_to_the_Fortress.mp3');
player[player_i].add_track(ROOT+Folder+'Pawei_Biaszczak,_Adam_Skorupa_-_Peaceful_Moments.mp3');
player[player_i].add_track(ROOT+Folder+'Helmkrain_Rodd_-_South.mp3');
player[player_i].add_track(ROOT+Folder+'Helmkrain_Rodd_-_From_Allahav.mp3');
player[player_i].add_track(ROOT+Folder+'Dag_Winderlich_-_Welcome_Home.mp3');
player[player_i].add_track(ROOT+Folder+'Yasunori_Mitsuda_-_Arni_Village_-_Home_World.mp3');
player[player_i].add_track(ROOT+Folder+'Yasunori_Mitsuda_-_The_Dream_that_Time_Dreams.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu (The Last Story) - Ruli Castle.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu (The Last Story) - New Days.mp3');
player[player_i].add_track(ROOT+Folder+'Ludovico Einaudi - Newtons Cradle.mp3');
player[player_i].add_track(ROOT+Folder+'Ludovico Einaudi - Time Lapse.mp3');
player[player_i].add_track(ROOT+Folder+'Lineage 2 (OST) - Town Dion.mp3');
player[player_i].add_track(ROOT+Folder+'Undertale OST - Snowdin Town.mp3');
player[player_i].add_track(ROOT+Folder+'Undertale OST - His Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Undertale OST - Ruins.mp3');
player[player_i].add_track(ROOT+Folder+'Undertale OST - 71 - Undertale.mp3');
player[player_i].add_track(ROOT+Folder+'Undertale OST - Snowy.mp3');
player[player_i].add_track(ROOT+Folder+'Undertale OST - Memory.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - The Sea of Sorrows [Guild Wars 2 OST].mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Heritage of Humanity ( Best of Guild wars 2 OST ).mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Asura at Work ( Best of Guild wars 2 OST ).mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - Out of the Dream.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - The Tengu Wall.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - Lornars Pass.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - Logans Journey.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - The Great Toymaker.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars Prophecies OST - Ashford Abbey.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - Tyria Awaits.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - The Last Great City of Men.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars Factions OST - Age of the Dragon.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars Prophecies OST - Crystal Oasis.mp3');
player[player_i].add_track(ROOT+Folder+'Maclaine Diemer - Lions Arch Lament Live (Guild Wars 2 OST).mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - The Lions Arch Lament.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Bandits Expanse [Guild Wars 2 OST].mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - The Vaults of the Priory.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - Ventaris Legacy.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars 2 OST - The Tale Of Tixx And Toxx.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars Prophecies OST - Autumn in Ascalon.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars Prophecies OST - Eye of the Storm.mp3');
player[player_i].add_track(ROOT+Folder+'Vindsvept - Wanderer.mp3');
player[player_i].add_track(ROOT+Folder+'Overlord 2 OST - Arcadia.mp3');
player[player_i].add_track(ROOT+Folder+'Overlord 2 OST - Sanctuary Fay.mp3');
player[player_i].add_track(ROOT+Folder+'Skyforge OST - Main theme Alpha 7.mp3');
player[player_i].add_track(ROOT+Folder+'Skyforge OST - World Map Alpha 7.mp3');
player[player_i].add_track(ROOT+Folder+'Skyforge OST - Ламберский лес.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 [Blood And Wine] - The Slopes Of The Blessure.mp3');
player[player_i].add_track(ROOT+Folder+'Ramin Djawadi - For Azeroth [Zona].mp3');
player[player_i].add_track(ROOT+Folder+'Heres To The Bard - Title Mix.mp3');
player[player_i].add_track(ROOT+Folder+'Wakfu Music - Sadida Kingdom.mp3');
player[player_i].add_track(ROOT+Folder+'Islands of Wakfu Outtakes - Citi.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 Wild Hunt OST - Unreleased Gwent Track 1.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 Wild Hunt OST - Unreleased Gwent Track 3.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 Wild Hunt OST - Unreleased Gwent Track 4.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 Wild hunt - Gwent.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 Blood and Wine Unreleased Soundtrack - Gwent Track 1.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 Blood and Wine Unreleased Soundtrack - Gwent Track 3.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 Blood and Wine - Unreleased Gwent Track 4.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 Blood and Wine - Unreleased Gwent Track 5.mp3');
player[player_i].add_track(ROOT+Folder+'Q-Rt - Wistful wind cloth.mp3');
player[player_i].add_track(ROOT+Folder+'Q-rt - Heaven_doesnt_know_our_sorrows.mp3');
player[player_i].add_track(ROOT+Folder+'Q-Rt - Legend of Hagatan.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - mounts_1n.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - haron_night_1.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - forest_1n.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - forest_1d.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - castle_2.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - castle_1.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - city_1n.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - city_1d.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - mounts_1d.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XII OST - Nalbina Fortress Town Ward.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XII OST - The Salikawood.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XII OST - The Port of Balfonheim.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XII OST - Neighbourhood Of Water.mp3');
player[player_i].add_track(ROOT+Folder+'FNeal Acree Russell Brower - Jainas Theme (OST WoW Legion).mp3');
player[player_i].add_track(ROOT+Folder+'Neal Acree, Russell Brower, Sam Cardon, Edo Guidotti, Glenn Stafford - Totems of the Grizzlemaw (Revisited).mp3');
player[player_i].add_track(ROOT+Folder+'Scandinavian folk - Skellige.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XIV A Realm Reborn - Syrcus Tower.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XIV A Realm Reborn - The Zenith.mp3');
player[player_i].add_track(ROOT+Folder+'Inon Zur - The Fury of Dawn (Main Theme).mp3');
player[player_i].add_track(ROOT+Folder+'Robin Hood The Legend of Sherwood - Menu theme.mp3');
player[player_i].add_track(ROOT+Folder+'Robin Hood The Legend of Sherwood - Lincoln D.mp3');
player[player_i].add_track(ROOT+Folder+'RPG Tavern Music - Compilation 3.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Big Sky.mp3');
player[player_i].add_track(ROOT+Folder+'Audiomachine - Breath and Life.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi Sakimoto (OST Final Fantasy Tactics) - Under the Stars.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi Sakimoto (OST Final Fantasy Tactics) - Random Waltz.mp3');
player[player_i].add_track(ROOT+Folder+'16 Zanzarah The Hidden Portal OST - Prophecy Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Zanzarah The Hidden Portal OST - Tiralin.mp3');
player[player_i].add_track(ROOT+Folder+'Zanzarah The Hidden Portal OST - Dunmore (Extended Version).mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi (Laputa Castle in the Sky OST) - The Girl Who Fell from the Sky.mp3');
player[player_i].add_track(ROOT+Folder+'Stephen Rippy - Get Off My Band.mp3');
player[player_i].add_track(ROOT+Folder+'Titan Quest IT OST - Saving Persephone.mp3');
player_i++;
// / спокойно

player[player_i] = new PlayerForm();
 player[player_i].create("Бодро", lt[player_i-1]);
  Folder = 'бодро/';
 player[player_i].add_track(ROOT+Folder+'Mark Griskey - Fighting the Gorog.mp3');
 player[player_i].add_track(ROOT+Folder+'Garry Schyman Jim Bonney - Battle For Columbia I.mp3');
 player[player_i].add_track(ROOT+Folder+'Silverfall OST - Part 6.mp3');
 player[player_i].add_track(ROOT+Folder+'Yugo Kanno - Battle I.mp3');
 player[player_i].add_track(ROOT+Folder+'Inon Zur - The Alchemist.mp3');
 player[player_i].add_track(ROOT+Folder+'Marika Suzuki, Akiyuki Morimoto - The Akrid Appear.mp3');
 player[player_i].add_track(ROOT+Folder+'Kirill Pokrovsky - Fly, Dragon, Fly.mp3');
 player[player_i].add_track(ROOT+Folder+'Gerard Marino - God Of War III Overture.mp3');
 player[player_i].add_track(ROOT+Folder+'Marcin Przyby owicz - The House Of The Borsodis');
 player[player_i].add_track(ROOT+Folder+'Robert King (Crusaders of Might and Magic OST) - Underground.mp3');
 player[player_i].add_track(ROOT+Folder+'Alina Gingertail - Mortal Combat (Bouzouki Cover).mp3');
 player[player_i].add_track(ROOT+Folder+'Dean Evans - Draw Your Sword.mp3');
 player[player_i].add_track(ROOT+Folder+'Dean Evans - The Arrival Of Fuge.mp3');
 player[player_i].add_track(ROOT+Folder+'Bobby Prince - Running From Evil.mp3');
 player[player_i].add_track(ROOT+Folder+'Justin Bell - The Dragon Thrashed and Wailed.mp3');
 player[player_i].add_track(ROOT+Folder+'Alexander Brandon - Room of Champions.mp3');
 player[player_i].add_track(ROOT+Folder+'Blut und Eisen (OST Enderal The Shards of Order).mp3');
 player[player_i].add_track(ROOT+Folder+'Charles B. R. Mitchell - Kingdom Under Fire - Dark MP2 Mix 22 (11-22k).mp3');
 player[player_i].add_track(ROOT+Folder+'Charles B. R. Mitchell - Kingdom Under Fire - RTS Dev 1 Mix1 22 (11-22k).mp3');
 player[player_i].add_track(ROOT+Folder+'Charles B. R. Mitchell - Kingdom Under Fire - RTS Dev 2 Mix1 22 (11-22k).mp3');
 player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - The Cove Battle (Siren).mp3');
 player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - The Cove Battle.mp3');
 player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - Return to the Warrens.mp3');
 player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - Battle in the Warrens.mp3');
 player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - Combat in the Ruins.mp3');
 player[player_i].add_track(ROOT+Folder+'Steamboy (Steve Jablonsky) - Raid by the Airship.mp3');
 player[player_i].add_track(ROOT+Folder+'Adam Skorupa Krzysztof Wierzynkiewicz - The Assassin Looms.mp3');
 player[player_i].add_track(ROOT+Folder+'Adam Skorupa Krzysztof Wierzynkiewicz - Easier Said than Killed.mp3');
 player[player_i].add_track(ROOT+Folder+'Adam Skorupa Krzysztof Wierzynkiewicz - The Lone Survivor.mp3');
 player[player_i].add_track(ROOT+Folder+'Adam Skorupa Krzysztof Wierzynkiewicz - The Path of a Kingslayer.mp3');
 player[player_i].add_track(ROOT+Folder+'Alexander Brandon Rik Schaffer - mulsantirshadowcombat.mp3');
 player[player_i].add_track(ROOT+Folder+'Alexander Brandon Rik Schaffer - mulsantircombat.mp3');
 player[player_i].add_track(ROOT+Folder+'Alexander Brandon Rik Schaffer - luruecombat.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeff van Dyck - Gremlins (Hand of Fate OST).mp3');
 player[player_i].add_track(ROOT+Folder+'Methods Of Mayhem - Hypocritical.mp3');
 player[player_i].add_track(ROOT+Folder+'Chris Velasco - Prison Break.mp3');
 player[player_i].add_track(ROOT+Folder+'Mike Reagan - Death To All Enemies.mp3');
 player[player_i].add_track(ROOT+Folder+'Chris Velasco - Chaos Eater.mp3');
 player[player_i].add_track(ROOT+Folder+'Iwasaki Taku - Yajuu no Chi.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Battle Lizard Boss.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Battle Forest Boss.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Battle Forest 1.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Battle Final.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Battle Dungeon Bonus.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Battle Dungeon 3.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeff van Dyck - Crusaders.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeff van Dyck - Mare Nostrum.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeff van Dyck - Battle of Tollan.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeff van Dyck - The Duke of Death.mp3');
 player[player_i].add_track(ROOT+Folder+'Hitoshi Sakimoto (OST Final Fantasy Tactics) - Tension.mp3');
 player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Future Guardian.mp3');
 player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Siege.mp3');
 player[player_i].add_track(ROOT+Folder+'Sam Hulick - The Battle for Bridgefort.mp3');
 player[player_i].add_track(ROOT+Folder+'Sam Hulick - Danger in the Wild.mp3');
 player[player_i].add_track(ROOT+Folder+'Russell Brower - The Burning Legion.mp3');
 player[player_i].add_track(ROOT+Folder+'Корсары 2 OST - Битва на море 3.mp3');
 player[player_i].add_track(ROOT+Folder+'Корсары 2 - Sea Battle.mp3');
 player[player_i].add_track(ROOT+Folder+'XCOM 2 - Shens Last Gift OST.mp3');
 player[player_i].add_track(ROOT+Folder+'XCOM 2 OST - Ready for Battle.mp3');
 player[player_i].add_track(ROOT+Folder+'XCOM 2 OST - Weapons of Choice.mp3');
 player[player_i].add_track(ROOT+Folder+'XCOM 2 OST - Battle Theme 2.mp3');
 player[player_i].add_track(ROOT+Folder+'XCOM 2 OST - Hold the Line Avenger Defence Combat.mp3');
 player[player_i].add_track(ROOT+Folder+'Thomas J. Bergersen - All the Kings Horses.mp3');
 player[player_i].add_track(ROOT+Folder+'Chris Lennertz - Boss Combat (Mass Effect 2 Overlord OST).mp3');
 player[player_i].add_track(ROOT+Folder+'Chris Lennertz - Combat Troops (Mass Effect 2 Overlord OST).mp3');
 player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - battle_1.mp3');
 player[player_i].add_track(ROOT+Folder+'Titan Quest IT OST - Battle with Hades.mp3');
 player[player_i].add_track(ROOT+Folder+'Titan Quest IT OST - Generic Combat.mp3');
 player[player_i].add_track(ROOT+Folder+'Wakfu - Golem.mp3');
 player[player_i].add_track(ROOT+Folder+'Islands of Wakfu Outtakes - Promenade.mp3');
 player[player_i].add_track(ROOT+Folder+'Wakfu - Fight (Evangelyne vs Remington).mp3');
 player[player_i].add_track(ROOT+Folder+'Ramin Djawadi - Warcraft [Zona].mp3');
 player[player_i].add_track(ROOT+Folder+'The Witcher 3 [Blood And Wine] - Wine Wars.mp3');
 player[player_i].add_track(ROOT+Folder+'The Witcher 3 [Blood And Wine] - For Honor for Toussaint.mp3');
 player[player_i].add_track(ROOT+Folder+'Skyforge OST - Battle theme Alpha 7.mp3');
 player[player_i].add_track(ROOT+Folder+'Damian Sanchez - Capones Mansion.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeremy Soule - Dance of Swords (Battle 3).mp3');
 player[player_i].add_track(ROOT+Folder+'Black Desert Online OST - 09.mp3');
 player[player_i].add_track(ROOT+Folder+'Alec_Holowka_-_Mithala_(Aquaria_OST).mp3');
 player[player_i].add_track(ROOT+Folder+'Martin_Linda_-_Cerdia.mp3');
 player[player_i].add_track(ROOT+Folder+'Martin_Linda_-_Fight_#1.mp3');
 player[player_i].add_track(ROOT+Folder+'Peter_McConnell_-_Duel_With_The_Critic.mp3');
 player[player_i].add_track(ROOT+Folder+'Motoi_Sakuraba_-_Taurus_Demon.mp3');
 player[player_i].add_track(ROOT+Folder+'Dag_Winderlich_-_Voice_of_the_Blade.mp3');
 player[player_i].add_track(ROOT+Folder+'Dag_Winderlich_-_10_Arachnophobia.mp3');
 player[player_i].add_track(ROOT+Folder+'Motoi_Sakuraba_-_Executioners_Chariot.mp3');
 player[player_i].add_track(ROOT+Folder+'Helmkrain_Rodd_-_The_Chase.mp3');
 player[player_i].add_track(ROOT+Folder+'Tilman_Sillescu_-_Native_Village.mp3');
 player[player_i].add_track(ROOT+Folder+'Tilman_Sillescu_-_Isle_of_Dead.mp3');
 player[player_i].add_track(ROOT+Folder+'FlybyNo_-_The_BattleField_II.mp3');
 player[player_i].add_track(ROOT+Folder+'Markus_Schmidt_(The_Cursed_Crusade_OST)_-_The_Fourth_Crusade.mp3');
 player[player_i].add_track(ROOT+Folder+'Alan_Silvestri_-_Final_Battle.mp3');
 player[player_i].add_track(ROOT+Folder+'Magicka_OST_-_Boss_Battle.mp3');
 player[player_i].add_track(ROOT+Folder+'Magicka_OST_-_Battle_of_the_Wizards.mp3');
 player[player_i].add_track(ROOT+Folder+'Jeremy_Soule_-_Battle_Dragon.mp3');
 player[player_i].add_track(ROOT+Folder+'Mychael_and_Jeff_Danna_-_Gawain_And_Arthur_Duel.mp3');
 player[player_i].add_track(ROOT+Folder+'battle1_-_.mp3');
 player[player_i].add_track(ROOT+Folder+'Grant_Kirkhope_-_Troll.mp3');
 player[player_i].add_track(ROOT+Folder+'Russell_Brower,_Neal_Acree,_Sam_Cardon,_Edo_Guidotti_&_Jeremy_Soule_-_The_Wandering_Isle.mp3');
 player[player_i].add_track(ROOT+Folder+'Mark_Morgan_(Planescape_Torment)_-_Sigil.mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Hold_the_Line.mp3');
 player[player_i].add_track(ROOT+Folder+'Isoe_Toshimichi_-_Kimpaku_(fight_2).mp3');
 player[player_i].add_track(ROOT+Folder+'Shigeru_Umebayashi_-_The_Echo_Game_(OST_Shi_Mian_Mai_Fu).mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Together_We_Are_Strong.mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Battle_Against_Time.mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Breaking_the_siege.mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_No_Choices.mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_They_Came_From_Nowhere.mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Rain_of_Blood.mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Enemy_at_the_gates.mp3');
 player[player_i].add_track(ROOT+Folder+'1M1 Music(Vol.2) - Cannonball.mp3');
 player[player_i].add_track(ROOT+Folder+'Erdenstern_-_Invasion_(Into_The_Red).mp3');
 player[player_i].add_track(ROOT+Folder+'Erdenstern_-_Crossing_Swords_With_The_Evil_(Into_The_Red).mp3');
 player[player_i].add_track(ROOT+Folder+'Erdenstern_-_The_Tournament_(Into_The_Red).mp3');
 player[player_i].add_track(ROOT+Folder+'RævJäger_-_In_search_of_Nighons_Power_(Trials_of_Alamar).mp3');
 player[player_i].add_track(ROOT+Folder+'Gate_of_Silence_-_Path_of_Tarnum.mp3');
player[player_i].add_track(ROOT+Folder+'Alice Madness Returns - BattleTheme01.mp3');
player[player_i].add_track(ROOT+Folder+'American McGees Alice (OST) - Centipede.mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Combat Music (by Ben Houge).mp3');
player[player_i].add_track(ROOT+Folder+'Atlas Music - - Titan Storm.mp3');
player[player_i].add_track(ROOT+Folder+'Atli Orvarsson - The Return Of The Eagle (OST Орел 9 легиона).mp3');
player[player_i].add_track(ROOT+Folder+'Audiomachine - Blood and Stone.mp3');
player[player_i].add_track(ROOT+Folder+'Audiomachine - Death Mask Extended.mp3');
player[player_i].add_track(ROOT+Folder+'AudioMachine - Lachrimae.mp3');
player[player_i].add_track(ROOT+Folder+'Basil Poledouris - Anvil Of Crom.mp3');
player[player_i].add_track(ROOT+Folder+'Chris Vrenna - American McGees Alice (OST) - Red Queen.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - Boarding the Enemy Vessel (Into The Blue).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - Gold and Glory (Into The Blue).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - Into The White - 12 - Cold Steel.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - Into The White - 15 - Avalanche.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - Into The White - 18 - Blizzard.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - Into The White - 6- Snow Creatures.mp3');
player[player_i].add_track(ROOT+Folder+'Evequest2 - battletheme.mp3');
player[player_i].add_track(ROOT+Folder+'Fable 3 - Escape.mp3');
player[player_i].add_track(ROOT+Folder+'Fight - Battle.mp3');
player[player_i].add_track(ROOT+Folder+'Greg Chandler - Attack of the Fishmen (OST Call of Cthulhu Dark Corners of the Earth).mp3');
player[player_i].add_track(ROOT+Folder+'Greg Chandler - Blood on the Deck (OST Call of Cthulhu Dark Corners of the Earth).mp3');
player[player_i].add_track(ROOT+Folder+'GRV Music - Neodammerung.mp3');
player[player_i].add_track(ROOT+Folder+'Hans Zimmer - Deshi Basara.mp3');
player[player_i].add_track(ROOT+Folder+'Hanz Zimmer - Navy Seals Battle Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Immediate Music - Dark Side Of Power.mp3');
player[player_i].add_track(ROOT+Folder+'Inon Zur - Guardians.mp3');
player[player_i].add_track(ROOT+Folder+'James Newton Howard - Warriors On the Beach OST Белоснежка и охотник.mp3');
player[player_i].add_track(ROOT+Folder+'Jesper Kyd - Death Brings Hope.mp3');
player[player_i].add_track(ROOT+Folder+'Lineage 2 - Battle.mp3');
player[player_i].add_track(ROOT+Folder+'Music for RPG - BattleTheme.mp3');
player[player_i].add_track(ROOT+Folder+'Music for RPG - Ирландская Боевая Музыка.mp3');
player[player_i].add_track(ROOT+Folder+'ost Angel Sanctuary - Golem Form.mp3');
player[player_i].add_track(ROOT+Folder+'OST L2 - Baiums Battle.mp3');
player[player_i].add_track(ROOT+Folder+'OST The Elder Scrolls V Skyrim - Battle 4.mp3');
player[player_i].add_track(ROOT+Folder+'Pfeifer Broz. Music - Absolute Anthropoid.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - The Dragon Thrashed and Wailed.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - The Harbingers Doom.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Their Hearts Grew Bold.mp3');
player[player_i].add_track(ROOT+Folder+'Satou Naoki - Nigero.mp3');
player[player_i].add_track(ROOT+Folder+'Sinbad Legend of the Seven Seas - The Giant Fish.mp3');
player[player_i].add_track(ROOT+Folder+'Sinbad Legend of the Seven Seas - The Sea Monster.mp3');
player[player_i].add_track(ROOT+Folder+'Solar - Far Away (Orchestral Version).mp3');
player[player_i].add_track(ROOT+Folder+'Sonic Librarian - - Protector Of The Realm.mp3');
player[player_i].add_track(ROOT+Folder+'Soundtrack - Six Glorious Wishes (The 10th Kingdom).mp3');
player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - Battle in the Warrens(Darkest Dungeon OST).mp3');
player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - Combat in the Ruins(Darkest Dungeon OST).mp3');
player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - Mournweald Encounter(Darkest Dungeon OST).mp3');
player[player_i].add_track(ROOT+Folder+'Treacherous Orchestra - Hounds.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell (All Drums Go To Hell - 2007) - 4. Carnival From Hell.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - 19 - Path Of Destruction.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Barrage Of Noise.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Bionics.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Crossword Killer.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Norwegian Pirate.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Shoot To Kill.mp3');
player[player_i].add_track(ROOT+Folder+'Боевая музыка - Волынка.mp3');
player[player_i].add_track(ROOT+Folder+'Бой - Swamp Fight.mp3');
player[player_i].add_track(ROOT+Folder+'Kyle_Gabler,_Ron_Carmel_-_Conflict_of_Interest.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi_Sakimoto_(OST_Final_Fantasy_Tactics)_-_Tension.mp3');
player[player_i].add_track(ROOT+Folder+'Craig_Armstrong_-_Hulk_Smash.mp3');
player[player_i].add_track(ROOT+Folder+'HOMM_4_-_Battle_IV_(vk.comOstHD)_(Heroes_of_Might_and_Magic_4).mp3');
player[player_i].add_track(ROOT+Folder+'Heroes_of_Might_and_Magic_IV_Excalibur_-_Town_Life.mp3');
player[player_i].add_track(ROOT+Folder+'Craig_Armstrong_-_Favela_Escape.mp3');
player[player_i].add_track(ROOT+Folder+'Craig_Armstrong_-_That_Is_The_Target.mp3');
player[player_i].add_track(ROOT+Folder+'Craig_Armstrong_-_Theyre_Here.mp3');
player[player_i].add_track(ROOT+Folder+'Craig_Armstrong_-_Give_Him_Everything_Youve_Got.mp3');
player[player_i].add_track(ROOT+Folder+'Craig_Armstrong_-_Abomination_Alley.mp3');
player[player_i].add_track(ROOT+Folder+'Elliot_Goldenthal_-_Louis_Revenge.mp3');
player[player_i].add_track(ROOT+Folder+'Darksiders_OST_-_battle_with_Abaddon.mp3');
player[player_i].add_track(ROOT+Folder+'Darksiders_OST_-_Darksiders_theme.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Deep_Trouble.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Beasts_of_the_Borderlands.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Ride_to_Destiny.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_The_Battle_Of_Dragons.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Zangarang.mp3');
player[player_i].add_track(ROOT+Folder+'Lind_Erebros__Age_of_Decadence_-_Shadow_Knives_(Аудио_группы_httpvkontakte.ruclub12503448_).mp3');
player[player_i].add_track(ROOT+Folder+'Висельчак_-_Древнее_Зло.mp3');
player[player_i].add_track(ROOT+Folder+'Sascha_Dikiciyan_And_Cris_Velasco_-_Summing_The_Soul-Dragon.mp3');
player[player_i].add_track(ROOT+Folder+'Sascha_Dikiciyan_And_Cris_Velasco_-_Wings_Of_Destruction.mp3');
player[player_i].add_track(ROOT+Folder+'Sascha_Dikiciyan_And_Cris_Velasco_-_Avatar_Of_The_Goddess.mp3');
player[player_i].add_track(ROOT+Folder+'Shunsuke_Kida_-_Phalanx.mp3');
player[player_i].add_track(ROOT+Folder+'Shunsuke_Kida_-_Penetrator.mp3');
player[player_i].add_track(ROOT+Folder+'Music_for_the_fight_-_Final_Battle_-_Introduction.mp3');
player[player_i].add_track(ROOT+Folder+'Music_for_the_fight_-_Temples_Fight.mp3');
player[player_i].add_track(ROOT+Folder+'Music_for_the_fight_-_Final_Battle_2.mp3');
player[player_i].add_track(ROOT+Folder+'Inon_Zur_-_Never_Surrender.mp3');
player[player_i].add_track(ROOT+Folder+'Motoi_Sakuraba_-_Scorpioness_Najka.mp3');
player[player_i].add_track(ROOT+Folder+'Motoi_Sakuraba_-_The_Dukes_Dear_Freja.mp3');
player[player_i].add_track(ROOT+Folder+'Motoi_Sakuraba_-_Royal_Rat_Vanguard.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu (The Last Story) - Order and Chaos.mp3');
player[player_i].add_track(ROOT+Folder+'Shunsuke Kida - Dragon God.mp3');
player[player_i].add_track(ROOT+Folder+'The Dark Messiah of Might and Magic - Summing The Soul-Dragon.mp3');
player[player_i].add_track(ROOT+Folder+'Darkest Dungeon OST - Combat in Ruins.mp3');
player[player_i].add_track(ROOT+Folder+'Darkest Dungeon OST - Battle in the Warrens.mp3');
player[player_i].add_track(ROOT+Folder+'Lind Erebros - The cross Combination.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - battle_2.mp3');
player_i++;
// бодро

/*/
player_i++; 

player[player_i] = new PlayerForm();
 player[player_i].create("Интерес", lt[player_i-1]);
 Folder = 'интерес/';
 
 player[player_i].add_track(ROOT+Folder+'Overlord 2 OST - Minion Band Main.mp3'); 
player_i++; 
//интерес/
/**/

/*/

player[player_i] = new PlayerForm();
 player[player_i].create("Мрачно", lt[player_i-1]);
 Folder = 'мрачно/';
 
 player[player_i].add_track(ROOT+Folder+'Russell Shaw - Sams organ performance.mp3'); 
 player[player_i].add_track(ROOT+Folder+'Martin_Linda_-_Church_Underground.mp3'); 
 player[player_i].add_track(ROOT+Folder+'Phantawalker_-_Path_to_the_Necropolis.mp3'); 
 player[player_i].add_track(ROOT+Folder+'Benoit_Groulx_-_Magic_In_The_Cathedral_(OST_Jonathan_Strange_&_Mr_Norrell).mp3'); 
 player[player_i].add_track(ROOT+Folder+'Benoit_Groulx_-_Strange_Waltz_(OST_Jonathan_Strange_&_Mr_Morrell).mp3'); 
 player[player_i].add_track(ROOT+Folder+'Benoit_Groulx_-_Ladys_Waltz_(OST_Jonathan_Strange_&_Mr_Norrell).mp3');
 player[player_i].add_track(ROOT+Folder+'Benoit_Charest_-_The_Waltz_(OST_Jonathan_Strange_&_Mr_Norrell).mp3');
 player[player_i].add_track(ROOT+Folder+'Lind_Erebros__Age_of_Decadence_-_Requiem_of_the_World_(Аудио_группы_httpvkontakte.ruclub12503448_).mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_MasqueradeE.mp3');
 player[player_i].add_track(ROOT+Folder+'Dead Factory - Streams of dead light.mp3');
player[player_i].add_track(ROOT+Folder+'Fable 3 - Introduction.mp3');
player[player_i].add_track(ROOT+Folder+'Fable 3 - Sanctuary.mp3');
player[player_i].add_track(ROOT+Folder+'FableThe Lost Chapters - Bowerstone Market.mp3');
player[player_i].add_track(ROOT+Folder+'FableThe Lost Chapters - Darkwood.mp3');
player[player_i].add_track(ROOT+Folder+'FableThe Lost Chapters - Greatwood.mp3');
player[player_i].add_track(ROOT+Folder+'FableThe Lost Chapters - Knothole Glade.mp3');
player[player_i].add_track(ROOT+Folder+'FableThe Lost Chapters - Witchwood.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes - The Necropolis.mp3');
player[player_i].add_track(ROOT+Folder+'John Debney - Tar Pit.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight Syndicate - Army of the Dead.mp3');
player[player_i].add_track(ROOT+Folder+'Music for R.P.G. - Вальс.mp3');
player[player_i].add_track(ROOT+Folder+'Russell Shaw - Witchwood.mp3');
player[player_i].add_track(ROOT+Folder+'Kyle_Gabler,_Ron_Carmel_-_Twisted_Carnival.mp3');
player[player_i].add_track(ROOT+Folder+'Некрополис3.mp3');
player[player_i].add_track(ROOT+Folder+'Г._Гродберг_(орган)_-_Бах._Токката_и_фуга_ре_минор,_BWV_565.mp3');
player[player_i].add_track(ROOT+Folder+'Vampire_Hunter_D_Bloodlust_-_Castle_Corridors.mp3');
player[player_i].add_track(ROOT+Folder+'Vampire_Hunter_D_-_Tower.mp3');
player[player_i].add_track(ROOT+Folder+'Elliot_Goldenthal_-_Born_to_Darkness.mp3');
player[player_i].add_track(ROOT+Folder+'Elliot_Goldenthal_-_Theatre_Des_Vampires.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes_VII_-_Mystos_Mountains_(Necropolis_Faction_Theme).mp3');
player[player_i].add_track(ROOT+Folder+'Shunsuke_Kida_-_The_Beginning.mp3');
player[player_i].add_track(ROOT+Folder+'Shunsuke_Kida_-_The_Nexus.mp3');
player[player_i].add_track(ROOT+Folder+'Shunsuke_Kida_-_Old_King_Allant.mp3');
player_i++; 
//мрачно/
/**/

/*/
// Дивнолесье

player[player_i] = new PlayerForm();
 player[player_i].create("Дивнолесье", lt[player_i-1]);
 Folder = 'Дивнолесье/';
 
player[player_i].add_track(ROOT+Folder+'2008 - Fable II Original Soundtrack - Oakfield.mp3');
player[player_i].add_track(ROOT+Folder+'2008 - Fable II Original Soundtrack - Old Town.mp3');
player[player_i].add_track(ROOT+Folder+'2008 - Fable II Original Soundtrack - Westcliff.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of might and magic 2 - City of the Knight.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of Might And Magic 2 The Price Of Loyalty - City of the Sorceress.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes Of Might And Magic 4 - Death.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi Sakimoto (OST Final Fantasy Tactics) - Almas Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi Sakimoto (OST Final Fantasy Tactics) - Brave Story.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi Sakimoto (OST Final Fantasy Tactics) - Heros Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi Sakimoto (OST Final Fantasy Tactics) - Memories.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi Sakimoto (OST Final Fantasy Tactics) - Ovelias Theme.mp3');
player[player_i].add_track(ROOT+Folder+'OST Heroes Of Might And Magic 4 - Academy Of Honor.mp3');
player[player_i].add_track(ROOT+Folder+'Russell Shaw - Albion Awaits.mp3');
player[player_i].add_track(ROOT+Folder+'Russell Shaw - Festival Of Roses.mp3');
player[player_i].add_track(ROOT+Folder+'Russell Shaw - The Crumble Basket.mp3');
player[player_i].add_track(ROOT+Folder+'Russell Shaw - The Lady of Rosewood.mp3');
player[player_i].add_track(ROOT+Folder+'Russell Shaw - Witchwood.mp3');

player_i++; 
//Дивнолесье/
/**/
/*/
// БОЛОТА

player[player_i] = new PlayerForm();
 player[player_i].create("Болото", lt[player_i-1]);
 Folder = 'Болото/';
 
 player[player_i].add_track(ROOT+Folder+'Erdenstern - The Swamp (отличная тема болота).mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern - The Swamp.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes Of Might And Magic 2 - Cracked Ground.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of Might And Magic 2 The Price Of Loyalty - Rolands Campaign.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of Might and Magic 3 - AI THEME 00.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of Might and Magic 3 - Conflux Town.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of might and magic 3 - Dirt.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes Of Might And Magic 3 - Dungeon Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of Might and Magic 3 - Evil Theme Music.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of might and magic 3 - Secret theme.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of Might and Magic 3 - Stronghold.mp3');
player[player_i].add_track(ROOT+Folder+'Heroes of Might and Magic 4 - Elemental Metropolis (order).mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi - Numa no Soko no le (The House at Swamp Bottom).mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - Swamp at Night (1).mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - Swamp at Night.mp3');
player[player_i].add_track(ROOT+Folder+'Kevin Manthei - Marimba.mp3');
player[player_i].add_track(ROOT+Folder+'Koji Kondo - Majoras Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Matt Uelmen - Wilderness.mp3');
player[player_i].add_track(ROOT+Folder+'Michiel van den Bos - Elf Swamp.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu - A Presentiment.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu - Lennas Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu - Nostalgia.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu - Reminiscence.mp3');
player[player_i].add_track(ROOT+Folder+'OST Heroes of Might and Magic 3 - Eternal life by Korben Fly.mp3');
player[player_i].add_track(ROOT+Folder+'OST Heroes of Might and Magic 4 - Swamp lands theme by Korben Fly.mp3');
player[player_i].add_track(ROOT+Folder+'Paul Romero - Dirt Lands on Tyros 3 (Heroes of might and magic 4).mp3');
player[player_i].add_track(ROOT+Folder+'Philippe Charron - Ingame 2 (Disciples 2 OST).mp3');
player[player_i].add_track(ROOT+Folder+'Philippe Charron - Ingame 6 (Disciples 2 OST).mp3');
player[player_i].add_track(ROOT+Folder+'Звуки для видео - музыка.mp3');
player[player_i].add_track(ROOT+Folder+'Унес нные призраками...Joe Hisaishi - The House at Swamp Bottom.mp3');

player_i++; 
//болота музыка/
/**/

/*/
// звуки Болото

player[player_i] = new PlayerForm();
 player[player_i].create("звуки Болото", lt[player_i-1]);
 Folder = 'звуки Болото/';
 
player[player_i].add_track(ROOT+Folder+'WavLibraryNet_Sound4025.mp3');
player[player_i].add_track(ROOT+Folder+'болото - Без названия.mp3');
player[player_i].add_track(ROOT+Folder+'БОЛОТО - Музыка болота.mp3');
player[player_i].add_track(ROOT+Folder+'болото - шум.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки города_лягушки, сверчки - Вблизи ночного болота.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - болото Б.Я. - живые голоса.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Лес после дождя.mp3');
player[player_i].add_track(ROOT+Folder+'Сверчки, лягушки Звуки природы - Поздний вечер на пруду.mp3');
player[player_i].add_track(ROOT+Folder+'Ястреб.mp3');

player_i++; 
//звуки Болото/
/**/

player[player_i] = new PlayerForm();
 player[player_i].create("Светло", lt[player_i-1]); 
 Folder = 'светло/';
 
 player[player_i].add_track(ROOT+Folder+'Sacha Dikiciyan, Cris Velasco - Party Music (Mass Effect 2 Kasumis Stolen Memory OST).mp3');
 player[player_i].add_track(ROOT+Folder+'0_02.mp3');
 player[player_i].add_track(ROOT+Folder+'0_01.mp3');
 player[player_i].add_track(ROOT+Folder+'Logan_Epic_Canto_-_The_Feast_in_Camelot.mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Woods_of_Eremae.mp3');
 player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Dreaming_of_flying.mp3');
 player[player_i].add_track(ROOT+Folder+'3 OST Fable The Lost Chapters - Bowerstone.mp3');
player[player_i].add_track(ROOT+Folder+'Azedan - The celebration of the city.mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi - A Road to Somewhere.mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi - Day Of The River (OST Унесённые призраками).mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi - Howls Moving Castle Theme (вальс из аниме Ходячий замок Хаула - оркестровая версия).mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi - Numa no Soko no le (The House at Swamp Bottom).mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi - Summer.mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi - The Sixth Station.mp3');
player[player_i].add_track(ROOT+Folder+'Lineage 2 OST - Town Theme - 28 - Island Village.mp3');
player[player_i].add_track(ROOT+Folder+'Lineage II OST - Giran Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Thomas Newman - Still Dead.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi_Sakimoto_(OST_Final_Fantasy_Tactics)_-_Ovelias_Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi_Sakimoto_(OST_Final_Fantasy_Tactics)_-_Memories.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi_Sakimoto_(OST_Final_Fantasy_Tactics)_-_Random_Waltz.mp3');
player[player_i].add_track(ROOT+Folder+'Hitoshi_Sakimoto_(OST_Final_Fantasy_Tactics)_-_Under_the_Stars.mp3');
player[player_i].add_track(ROOT+Folder+'Alizbar_-_Fairy_Of_Melted_Snow.mp3');
player[player_i].add_track(ROOT+Folder+'Alizbar_-_Last_Fallen_Leaf.mp3');
player[player_i].add_track(ROOT+Folder+'Alizbar(кельтская_арфа)_-_Шервудский_лес.mp3');
player[player_i].add_track(ROOT+Folder+'Alizbar_&_Christian_Amin_Varkonyi_-_Melting_snowflakes_on_her_hand_(Celtic_harp_&_Hang_Drum).mp3');
player[player_i].add_track(ROOT+Folder+'Alizbar_-_The_island.mp3');
player[player_i].add_track(ROOT+Folder+'Alizbar_-_Dreams.mp3');
player[player_i].add_track(ROOT+Folder+'Alizbar_-_Dwarves_songs_in_hobbits_hole.mp3');
player[player_i].add_track(ROOT+Folder+'Alizbar_-_Gleam_In_Angels_Eye-Drop.mp3');
player[player_i].add_track(ROOT+Folder+'Alizbar_(Кельтская_арфа)_-_Красота_севера.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_The_old_wizard.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Crystal_Cavern.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Alchemist.mp3');
player[player_i].add_track(ROOT+Folder+'Grant_Kirkhope_-_Dalentarth.mp3');
player_i++; 
// светло

player[player_i] = new PlayerForm();
 player[player_i].create("Данж", lt[player_i-1]);
 Folder = 'Данж/';
  
player[player_i].add_track(ROOT+Folder+'3 - Спуск в канализации в поисках оборотня, который вас укусил.mp3');
player[player_i].add_track(ROOT+Folder+'Silverfall OST - Part 5.mp3');
player[player_i].add_track(ROOT+Folder+'Silverfall OST - Part 1.mp3');
player[player_i].add_track(ROOT+Folder+'Меч и Магия 7 - Бездна.mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - The Orc Town.mp3');
player[player_i].add_track(ROOT+Folder+'Kirill Pokrovsky - Memory of the Dragons.mp3');
player[player_i].add_track(ROOT+Folder+'Bobby Prince - Evil Incarnate.mp3');
player[player_i].add_track(ROOT+Folder+'Bobby Prince - The Demons Dead.mp3');
player[player_i].add_track(ROOT+Folder+'Bobby Prince - Countdown to Death.mp3');
player[player_i].add_track(ROOT+Folder+'Philippe Charron - Credits (Disciples 2 OST).mp3');
player[player_i].add_track(ROOT+Folder+'Philippe Charron - Ingame 7 (Disciples 2 OST).mp3');
player[player_i].add_track(ROOT+Folder+'Philippe Charron - Menu Theme (Disciples 2 OST).mp3');
player[player_i].add_track(ROOT+Folder+'Daniel Licht - Downpour Intro.mp3');
player[player_i].add_track(ROOT+Folder+'Alexander Brandon - Underworld II.mp3');
player[player_i].add_track(ROOT+Folder+'07 INSIDEP2 Inside the Pyramid 2 (11-22kj).mp3');  
player[player_i].add_track(ROOT+Folder+'Akira Yamaoka - What a Wonderful World.mp3');  
player[player_i].add_track(ROOT+Folder+'Tom Dvo k - Podzem.mp3');  
player[player_i].add_track(ROOT+Folder+'Tom Dvo k - nekoun.mp3');  
player[player_i].add_track(ROOT+Folder+'Matt Uelmen - Tombs.mp3');  
player[player_i].add_track(ROOT+Folder+'StarCraft - Zerg Briefing Room.mp3');  
player[player_i].add_track(ROOT+Folder+'James Mulvale - Quest for Infamy - 098 065 024 (16-22kj).mp3');  
player[player_i].add_track(ROOT+Folder+'Daniel Licht - Regent Suspense.mp3');  
player[player_i].add_track(ROOT+Folder+'Daniel Licht - Flooded Suspense.mp3');  
player[player_i].add_track(ROOT+Folder+'Christophe H ral - Mysterious Swamps.mp3');  
player[player_i].add_track(ROOT+Folder+'Paul Romero, etc. - Dungeon.mp3');  
player[player_i].add_track(ROOT+Folder+'Jesper Kyd - Before the Storm.mp3');  
player[player_i].add_track(ROOT+Folder+'Iwasaki Taku - Tsumeato.mp3');  
player[player_i].add_track(ROOT+Folder+'Derek Duke, Tracy W. Bush, Glenn Stafford - Dreadlords Plight.mp3');  
player[player_i].add_track(ROOT+Folder+'Russell Shaw - Mystic tunnel.mp3');  
player[player_i].add_track(ROOT+Folder+'Sam Hulick - Dark Waters Flow.mp3');  
player[player_i].add_track(ROOT+Folder+'World of Warcraft The Burning Crusade OST - Black Temple.mp3');  
player[player_i].add_track(ROOT+Folder+'Harry Gregson-Williams - Parasites (ost MGS 5 PP).mp3');
player[player_i].add_track(ROOT+Folder+'Robin Hood The legend of Sherwood - Замок Лейстер.mp3');
player[player_i].add_track(ROOT+Folder+'Robin Hood The legend of Sherwood - Дерби.mp3');
player[player_i].add_track(ROOT+Folder+'Robin Hood The Legend of Sherwood - Cross Alarm.mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XIV A Realm Reborn - The Vault.mp3');
player[player_i].add_track(ROOT+Folder+'WoW OST - Demon Hunter [World of Warcraft Legion].mp3');
player[player_i].add_track(ROOT+Folder+'Final Fantasy XII OST - The Sochen Cave Palace.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - grave_1n.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - dung_2.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - grave_1d.mp3');
player[player_i].add_track(ROOT+Folder+'Сфера Перерождение Sphere reload - dung_1.mp3');
player[player_i].add_track(ROOT+Folder+'Lind Erebros - Lizardman Lands (ТМ).mp3');
player[player_i].add_track(ROOT+Folder+'Lind Erebros - Ancient Crypt.mp3');
player[player_i].add_track(ROOT+Folder+'Kelly Bailey - Our Resurrected Teleport.mp3');
player[player_i].add_track(ROOT+Folder+'Kelly Bailey - Our Resurrected Teleport.mp3');
player[player_i].add_track(ROOT+Folder+'Kelly Bailey - Shadows Fore and Aft.mp3');
player[player_i].add_track(ROOT+Folder+'Steve Baca, Rob King, Paul Romero, Jennifer Wang - Might and Magic VI - The Mandate of Heaven - 06 - Desert Town of Blackshire (Dragonsand Desert) (16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Might and Magic VI - 01.mp3');
player[player_i].add_track(ROOT+Folder+'OST Vampire The Masquerade Redemption - SilverMines.mp3');
player[player_i].add_track(ROOT+Folder+'Darkest Dungeon OST - Main Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Wakfu Music - Black Crow.mp3');
player[player_i].add_track(ROOT+Folder+'Geister [Drakensang The Dark Eye OST].mp3');
player[player_i].add_track(ROOT+Folder+'Sunless Sea OST - Storm, Stone, Salt.mp3');
player[player_i].add_track(ROOT+Folder+'Overlord 2 OST - Wasteland Tension.mp3');
player[player_i].add_track(ROOT+Folder+'Nature Ganganbaigal - The Ritual.mp3');
player[player_i].add_track(ROOT+Folder+'19 )Shunsuke Kida - Armor Spider.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu (The Last Story) - Infiltration.mp3');
player[player_i].add_track(ROOT+Folder+'Nobuo Uematsu (The Last Story) - Disorderly Design.mp3');
player[player_i].add_track(ROOT+Folder+'FlybyNo - Geology [Endless Legend Soundtrack].mp3');
player[player_i].add_track(ROOT+Folder+'VTM01.mp3');
player[player_i].add_track(ROOT+Folder+'VTM02.mp3');
player[player_i].add_track(ROOT+Folder+'VTM03.mp3');
player[player_i].add_track(ROOT+Folder+'VTM04.mp3');
player[player_i].add_track(ROOT+Folder+'WC_02.mp3');
player[player_i].add_track(ROOT+Folder+'WC_01.mp3');
player[player_i].add_track(ROOT+Folder+'DS3_1.mp3');
player[player_i].add_track(ROOT+Folder+'Martin_Linda_-_Ancient_Caves.mp3');
player[player_i].add_track(ROOT+Folder+'Peter_McConnell_-_The_Lungfish_Lair.mp3');
player[player_i].add_track(ROOT+Folder+'Motoi_Sakuraba_-_Pinwheel.mp3');
player[player_i].add_track(ROOT+Folder+'Motoi_Sakuraba_-_Mytha,_the_Baneful_Queen.mp3');
player[player_i].add_track(ROOT+Folder+'Motoi_Sakuraba_-_Covetous_Demon.mp3');
player[player_i].add_track(ROOT+Folder+'Dag_Winderlich_-_Daemons_of_Ancaria.mp3');
player[player_i].add_track(ROOT+Folder+'Motoi_Sakuraba_-_Flexile_Sentry.mp3');
player[player_i].add_track(ROOT+Folder+'The_Temple_Of_Elemental_Evil_-_Elemental_Earth.mp3');
player[player_i].add_track(ROOT+Folder+'The_Temple_Of_Elemental_Evil_-_Elemental_Fire.mp3');
player[player_i].add_track(ROOT+Folder+'The_Temple_Of_Elemental_Evil_-_Nulb_Combat.mp3');
player[player_i].add_track(ROOT+Folder+'Coraline_-_Ghost_Children.mp3');
player[player_i].add_track(ROOT+Folder+'Coraline_-_It_Was_Fantastic.mp3');
player[player_i].add_track(ROOT+Folder+'Coraline_-_The_Hand.mp3');
player[player_i].add_track(ROOT+Folder+'Coraline_-_Wybie_That_Talks.mp3');
player[player_i].add_track(ROOT+Folder+'Matt_Uelmen_-_Spider.mp3');
player[player_i].add_track(ROOT+Folder+'Matt_Uelmen_-_Tombs.mp3');
player[player_i].add_track(ROOT+Folder+'Matt_Uelmen_-_Cave.mp3');
player[player_i].add_track(ROOT+Folder+'Alex_Sokolov_-_Locked_(OST_Выжить_После).mp3');
player[player_i].add_track(ROOT+Folder+'Alex_Sokolov_-_Theme_4_(OST_Выжить_После).mp3');
player[player_i].add_track(ROOT+Folder+'Фентези_-_Наблюдение.mp3');
player[player_i].add_track(ROOT+Folder+'Fantasy_-_Dark_Mage.mp3');
player[player_i].add_track(ROOT+Folder+'Benoit_Groulx_-_The_Magic_Lab.mp3');
player[player_i].add_track(ROOT+Folder+'Benoit_Groulx_-_The_Abduction_Plan_(OST_Jonathan_Strange_&_Mr_Norrell).mp3');
player[player_i].add_track(ROOT+Folder+'Avith_Ortega_-_Cloistral.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Ancient_Mystery.mp3');
player[player_i].add_track(ROOT+Folder+'Inon_Zur_-_Of_Green_and_Grey.mp3');
player[player_i].add_track(ROOT+Folder+'Shunsuke_Kida_-_Maiden_in_Black.mp3');
player[player_i].add_track(ROOT+Folder+'Sascha_Dikiciyan_And_Cris_Velasco_-_Soulmate.mp3');
player[player_i].add_track(ROOT+Folder+'Sascha_Dikiciyan_And_Cris_Velasco_-_The_Dark_Messiah.mp3');
player[player_i].add_track(ROOT+Folder+'Sascha_Dikiciyan_And_Cris_Velasco_-_Awakening.mp3');
player[player_i].add_track(ROOT+Folder+'ghosts_-_.mp3');
player[player_i].add_track(ROOT+Folder+'Grant_Kirkhope_-_Mines_and_Caves.mp3');
player[player_i].add_track(ROOT+Folder+'Grant_Kirkhope_-_Warsworn.mp3');
player[player_i].add_track(ROOT+Folder+'Russell_Brower,_Neal_Acree,_Sam_Cardon,_Edo_Guidotti_&_Jeremy_Soule_-_Sha_(Spirits_of_Hatred).mp3');
player[player_i].add_track(ROOT+Folder+'Penumbra_-_Тема.mp3');
player[player_i].add_track(ROOT+Folder+'Penumbra_-_Поэзия.mp3');
player[player_i].add_track(ROOT+Folder+'Penumbra_-_Theme_For_Overture.mp3');
player[player_i].add_track(ROOT+Folder+'Penumbra_-_4_Некролог.mp3');
player[player_i].add_track(ROOT+Folder+'Penumbra_-_Пенумбра.mp3');
player[player_i].add_track(ROOT+Folder+'Penumbra_-_часть_1.mp3');
player[player_i].add_track(ROOT+Folder+'Wardruna_-_Heimta_Thurs.mp3');
player[player_i].add_track(ROOT+Folder+'Knut_Avenstroup_Haugen_-_Gods_Palm.mp3');
player[player_i].add_track(ROOT+Folder+'Mikko_Tarmia_-_Penumbra_E1_A5.mp3');
player[player_i].add_track(ROOT+Folder+'Vampire_The_Masquerade_Bloodlines_-_Disturbed_and_Twisted.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Spectral_Masquerade.mp3');
player[player_i].add_track(ROOT+Folder+'Висельчак_-_Глаз_Святого.mp3');
player[player_i].add_track(ROOT+Folder+'Висельчак_-_Небытие.mp3');
player[player_i].add_track(ROOT+Folder+'Висельчак_-_Колодец_Душ.mp3');
player[player_i].add_track(ROOT+Folder+'Висельчак_-_Забытая_Могила.mp3');
player[player_i].add_track(ROOT+Folder+'Висельчак_-_Руины.mp3');
player[player_i].add_track(ROOT+Folder+'Висельчак_-_Восстание_Тьмы.mp3');
player[player_i].add_track(ROOT+Folder+'Висельчак_-_Ночь_близка.mp3');
player[player_i].add_track(ROOT+Folder+'Lind_Erebros__Age_of_Decadence_-_Secret_of_the_Mist_City_(Аудио_группы_httpvkontakte.ruclub12503448_).mp3');
player[player_i].add_track(ROOT+Folder+'OST_American_Horror_Story_Season_5_Hotel_-_Main_Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Murgrind_-_Arise_In_Darkness.mp3');
player[player_i].add_track(ROOT+Folder+'Myrrdin_-_To_Behold_an_Ancient_Kingdom.mp3');
player[player_i].add_track(ROOT+Folder+'Apocryphos_&_Kammarheit_&_Atrium_Carceri_-_Cavern_Of_Igneous_Flame.mp3');
player[player_i].add_track(ROOT+Folder+'Apocryphos,_Kammarheit,_Atrium_Carceri_-_Onyx.mp3');
player[player_i].add_track(ROOT+Folder+'Apocryphos_&_Kammarheit_&_Atrium_Carceri_-_A_Lonely_Strain.mp3');
player[player_i].add_track(ROOT+Folder+'Apocryphos_-_Neolithic_Hypnagogia.mp3');
player[player_i].add_track(ROOT+Folder+'Apocryphos_-_Neolithic_Hypnagogia.mp3');
player[player_i].add_track(ROOT+Folder+'Apocryphos_-_The_Language_of_Isolation.mp3');
player[player_i].add_track(ROOT+Folder+'Apocryphos_-_The_Furthest_Sanctuary.mp3');
player[player_i].add_track(ROOT+Folder+'Apocryphos_&_Kammarheit_&_Atrium_Carceri_-_Night_So_Close_To_The_Tongue.mp3');
player[player_i].add_track(ROOT+Folder+'Apocryphos_&_Kammarheit_&_Atrium_Carceri_-_Ones_Atop_The_Unknown.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Caverns.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_The_Ancients.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Valve.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Mystery.mp3');
player[player_i].add_track(ROOT+Folder+'Celestial_Aeon_Project_-_Jesters_Tear.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_Lost.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_The_Mines.mp3');
player[player_i].add_track(ROOT+Folder+'Arathgoth - Tales of the Three Moons.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_Lady_of_the_Dark.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_Into_the_Dark.mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Dungeons (by Ben Houge).mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Kerghans Castle.mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - Mines (by Ben Houge).mp3');
player[player_i].add_track(ROOT+Folder+'Arcanum of... (OST) - The Void.mp3');
player[player_i].add_track(ROOT+Folder+'Dead Factory - Awakening.mp3');
player[player_i].add_track(ROOT+Folder+'Dead Factory - Catatonic Fears.mp3');
player[player_i].add_track(ROOT+Folder+'Dead Factory - Cold Industrial Reality.mp3');
player[player_i].add_track(ROOT+Folder+'Dead Factory - Entalpia.mp3');
player[player_i].add_track(ROOT+Folder+'Dead Factory - NowherE.mp3');
player[player_i].add_track(ROOT+Folder+'FableThe Lost Chapters - Hobbes Cave.mp3');
player[player_i].add_track(ROOT+Folder+'Foglord - Autumnal Solitude.mp3');
player[player_i].add_track(ROOT+Folder+'Foglord - The Tower in the Forest.mp3');
player[player_i].add_track(ROOT+Folder+'Lineage 2 OST - Dungeon Theme - 02 - Abyssal Gathering.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Brackenbury.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - The Endless Paths I.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - The Endless Paths II.mp3');
player[player_i].add_track(ROOT+Folder+'Pillars of Eternity - Woedica.mp3');
player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - A Brief Respite(Darkest Dungeon OST).mp3');
player[player_i].add_track(ROOT+Folder+'Stuart Chatwood - The Hamlet(Darkest Dungeon OST).mp3');
player[player_i].add_track(ROOT+Folder+'Temple of elemental evil - air loop.mp3');
player[player_i].add_track(ROOT+Folder+'The Temple Of Elemental Evil - Elemental Earth.mp3');
player[player_i].add_track(ROOT+Folder+'The Temple Of Elemental Evil - Elemental Water.mp3');
player[player_i].add_track(ROOT+Folder+'The Temple of Elemental Evil - Moathouse exterior level.mp3');
player[player_i].add_track(ROOT+Folder+'The Temple of Elemental Evil - Zuggtmoy.mp3');
player[player_i].add_track(ROOT+Folder+'Неизвестен - Elemental fire loop(Temple of elemental evil).mp3');
player[player_i].add_track(ROOT+Folder+'Подземелья - Древние тоннели (Emerald Rustling - Cave Tales).mp3');
player[player_i].add_track(ROOT+Folder+'Kyle_Gabler_-_The_City_(Little_Inferno_OST).mp3');
player[player_i].add_track(ROOT+Folder+'Apocalyptica_-_Coma.mp3');
player[player_i].add_track(ROOT+Folder+'Marco_dAmbrosio_-_Unduls_Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Vampire_Hunter_D_Bloodlust_-_Meirrs_Pain.mp3');
player[player_i].add_track(ROOT+Folder+'Vampire_Hunter_D_Bloodlust_-_The_Castle_Of_Chaythe.mp3');
player[player_i].add_track(ROOT+Folder+'Darksiders_2_OST_-_Into_The_Shadows.mp3');
player[player_i].add_track(ROOT+Folder+'Jigoku_Shoujo_Mitsuganae_-_The_Six-Script_Lantern.mp3');
player[player_i].add_track(ROOT+Folder+'Xasthur_-_Pyramid_Of_Skulls.mp3');
player[player_i].add_track(ROOT+Folder+'Xasthur_-_Portal_of_Sorrow.mp3');
player[player_i].add_track(ROOT+Folder+'Xasthur_-_Loss_and_Inner_Distortion.mp3');
player[player_i].add_track(ROOT+Folder+'Xasthur_-_Forgotten_Depths_of_Nowhere.mp3');
player[player_i].add_track(ROOT+Folder+'Xasthur_-_Stream_of_Subconsciousness.mp3');
player[player_i].add_track(ROOT+Folder+'Archon_Satani_-_Beyond_All_Thee_Sickness.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_How_Strange....mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Army_of_the_Dead.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Runis_of_Bone_Hill.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Heroes_Valor.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Relic_Uncovered.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Craft_of_the_Wizard.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Secret_Chamber.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Ancient_Temple.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Prelude.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_The_Fens_of_Sargath.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Descent_into_The_Depths.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Stealth_and_Cunning.mp3');
player[player_i].add_track(ROOT+Folder+'Cities_Last_Broadcast_-_Deadpost.mp3');
player[player_i].add_track(ROOT+Folder+'36._Divine_Divinty_-_Lies_and_Chaos.mp3');
player[player_i].add_track(ROOT+Folder+'Yuki_Kajiura_-_Chapter_III,_Remaining_Sense_of_Pain_-_M10+11.mp3');
player[player_i].add_track(ROOT+Folder+'SIMM_-_Crematorium.mp3');
player[player_i].add_track(ROOT+Folder+'Silent_Hill_3_OST_-_Never_Forgive_Me_Never_Forget.mp3');
player[player_i].add_track(ROOT+Folder+'Lustmord_-_Disintegration.mp3');
player[player_i].add_track(ROOT+Folder+'R._Nikolaenko_-_Winter.mp3');
player[player_i].add_track(ROOT+Folder+'Slander_man_-_Baptism.mp3');
player[player_i].add_track(ROOT+Folder+'Ilya_Pechersky_-_Музыка_из_игры_The_LoD_-_Подземелье.mp3');
player[player_i].add_track(ROOT+Folder+'S.T.A.L.K.E.R._-_Подземелье_(Фоновая_музыка).mp3');
player[player_i].add_track(ROOT+Folder+'Alexey_Omelchuk_-_Подземелье_[METRO_2033_OST]_(МУЗЫКА_ИЗ_ИГР__OST_GAMES__САУНДТРЕКИ_httpvk.compublic34348115).mp3');
player[player_i].add_track(ROOT+Folder+'Кингс_Баунти_-_В_подземелье_(в_пещере)_входная_музыка.mp3');
player[player_i].add_track(ROOT+Folder+'Glenn_Stafford_-_Frostmourne.mp3');
player[player_i].add_track(ROOT+Folder+'Might_and_Magic_Heroes_VII_-_Blades_Of_Madness_(Dungeon_Theme).mp3');
player[player_i].add_track(ROOT+Folder+'Кошмар_на_улице_Вязов_-_Главная_тема_(_Фредди_Крюгер_).mp3');
player[player_i].add_track(ROOT+Folder+'Mark_Morgan_-_Dakkon_Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Scary_-_Зловещая_тайна.mp3');
player[player_i].add_track(ROOT+Folder+'Scary_-_Жуткое_Место.mp3');
player[player_i].add_track(ROOT+Folder+'Scary_-_Темно_Фон.mp3');
player[player_i].add_track(ROOT+Folder+'Scary_-_Темно_фон_3.mp3');
player[player_i].add_track(ROOT+Folder+'Scary_-_Темно_фон_4.mp3');
player[player_i].add_track(ROOT+Folder+'Mark_Morgan_-_Underground_Troubles.mp3');
player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Недра", lt[player_i-1]);
 Folder = 'недра/'; 
 
player[player_i].add_track(ROOT+Folder+'Jason Graves - The Enduring Pride.mp3');
player[player_i].add_track(ROOT+Folder+'Kai Rosenkranz - The Old Mine.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - 5.mp3');
player[player_i].add_track(ROOT+Folder+'Alexander Brandon Rik Schaffer - kelemvortemple.mp3');
player[player_i].add_track(ROOT+Folder+'MoozE - Cold-Freezing Out.mp3');
player[player_i].add_track(ROOT+Folder+'MoozE - Tunnels.mp3');
player[player_i].add_track(ROOT+Folder+'MoozE - Mutation.mp3');
player[player_i].add_track(ROOT+Folder+'Kevin MacLeod - The Dread.mp3');
player[player_i].add_track(ROOT+Folder+'Guild Wars NightFall OST - Descent into Madness.mp3');
player[player_i].add_track(ROOT+Folder+'Martin_Linda_-_Clairvoyance.mp3');
player[player_i].add_track(ROOT+Folder+'Martin_Linda_-_Eternity.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки_Космоса_-_Земля.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки_космоса_NASA_-_Магнитосфера_Земли.mp3');
player[player_i].add_track(ROOT+Folder+'звуки_планет_-_Гул_Земли.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки_природы_-_В_глубинах_Земли._Часть_1..mp3');
player[player_i].add_track(ROOT+Folder+'Криодинамика_-Шум_орбиты_Земли.mp3');
player[player_i].add_track(ROOT+Folder+'Мишуринский_Денис_-_Звуки_земли.mp3');
player[player_i].add_track(ROOT+Folder+'Пустое_минское_метро.mp3');
player[player_i].add_track(ROOT+Folder+'Шум_Орбиты_Земли.mp3');
player[player_i].add_track(ROOT+Folder+'Mark_Morgan_-_Flame_of_the_Ancient_World.mp3');
player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Капли", lt[player_i-1]);
 Folder = 'капли/'; 
 
player[player_i].add_track(ROOT+Folder+'Deep into the Earth - Звуки капель воды под землей (Part 1).mp3');
player[player_i].add_track(ROOT+Folder+'Deep into the Earth - Звуки капель воды под землей (Part 2).mp3');
player[player_i].add_track(ROOT+Folder+'Звуки_-_Падающие_капли.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки_природы_-_Капли.mp3');
player_i++; 

/**/
player[player_i] = new PlayerForm();
 player[player_i].create("Ветер", lt[player_i-1]);
 Folder = 'звуки природы/'; 
 
player[player_i].add_track(ROOT+Folder+'Вой ветра - вар.1.mp3');
player_i++; 

player[player_i] = new PlayerForm();
 player[player_i].create("Менестрель", lt[player_i-1]);
 Folder = 'Таверна/'; 
 
player[player_i].add_track(ROOT+Folder+'Менестрель Арекиса.mp3'); 
player_i++; 

player[player_i] = new PlayerForm();
 player[player_i].create("ДАНЖ", lt[player_i-1]);
 Folder = 'Данж/'; 
 
player[player_i].add_track(ROOT+Folder+'Мелодия Арекисских данжей.mp3'); 
player_i++; 
/**/


player[player_i] = new PlayerForm();
 player[player_i].create("Таверна", lt[player_i-1]);
 Folder = 'Таверна/'; 
 
player[player_i].add_track(ROOT+Folder+'Tommy Tallarico, Clint Bajakian, Jared Emerson-Johnson - McGrath Castle.mp3');
player[player_i].add_track(ROOT+Folder+'Tommy Tallarico, Clint Bajakian, Jared Emerson-Johnson - Heres To The Bard (Viking Mix).mp3');
player[player_i].add_track(ROOT+Folder+'Duan - Charming Lovely Nancy.mp3');
player[player_i].add_track(ROOT+Folder+'The Hellblinki Sextet - Pirates Life.mp3');
player[player_i].add_track(ROOT+Folder+'19 IGBGND2 The Crystal Rose (11-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'34 STARTPUB The Yawning Portal (11-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Arany Zoltan - In taberna quando sumus.mp3');
player[player_i].add_track(ROOT+Folder+'Spiritual Seasons - Mick - Maguire.mp3');
player[player_i].add_track(ROOT+Folder+'Spiritual Seasons - Swallowtail Jig.mp3');
player[player_i].add_track(ROOT+Folder+'Spiritual Seasons - Star of the County Down.mp3');
player[player_i].add_track(ROOT+Folder+'RPG Tavern Music - Compilation 2.mp3');
player[player_i].add_track(ROOT+Folder+'Les B tards Du Nord - Reel De La Banshee.mp3');
player[player_i].add_track(ROOT+Folder+'Les B tards Du Nord - Le Fer, La Mer Et La Bi re.mp3');
player[player_i].add_track(ROOT+Folder+'Les B tards Du Nord - Windsong.mp3');
player[player_i].add_track(ROOT+Folder+'Les B tards Du Nord - Vendu Pour Bou re.mp3');
player[player_i].add_track(ROOT+Folder+'Les B tards Du Nord - B tards Du Nord.mp3');
player[player_i].add_track(ROOT+Folder+'The Witcher 3 Wild Hunt OST - Unreleased Gwent Track 2.mp3');
player[player_i].add_track(ROOT+Folder+'Van Canto - A Cappella Epic Power Metal.mp3');
player[player_i].add_track(ROOT+Folder+'Kevin Manthei–Танец гномов.mp3');
player[player_i].add_track(ROOT+Folder+'Таверна_-_Песня_Барда.mp3');
player[player_i].add_track(ROOT+Folder+'Bear_McCreary_-_The_Golden_Vanity.mp3');
player[player_i].add_track(ROOT+Folder+'WoW_-_Dwarf_tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Blizzard_Entertainment_-_Tavern_music_(Dwarfs).mp3');
player[player_i].add_track(ROOT+Folder+'Gaelic_Storm_-_Irish_tavern_music.mp3');
player[player_i].add_track(ROOT+Folder+'Medieval_-_Tavern_music.mp3');
player[player_i].add_track(ROOT+Folder+'Julia_Okrusko_-_Tavern_Dance.mp3');
player[player_i].add_track(ROOT+Folder+'Tavern_music_-_Pirate_Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Irish_Folk_Song_-_Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Zanzarah_-_Tiralin_tavern_song.mp3');
player[player_i].add_track(ROOT+Folder+'Andoran_-_Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Inon_Zur_-_Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Dropkick_Murphys_-_Fuck_you,_Im_drunk.mp3');
player[player_i].add_track(ROOT+Folder+'The_Bards_Tale_soundtrack_-_Beer,_beer,_beer.mp3');
player[player_i].add_track(ROOT+Folder+'Greg_Joy_Rakes_Of_Kildare_Swallow_s_Nest_portasound.ru.mp3');
player[player_i].add_track(ROOT+Folder+'Omnia_-_Tine_Bealtaine.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_The_Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Justin_Bell_(Pillars_of_Eternity)_-_The_Fox_and_the_Farmer.mp3');
player[player_i].add_track(ROOT+Folder+'Kirill_Pokrovsky_-_Medieval_Tears_Alt_(Divinity_Original_Sin_OST).mp3');
player[player_i].add_track(ROOT+Folder+'Kirill_Pokrovsky_-_Bittersweet_Regrets_(Divinity_Original_Sin_OST).mp3');
player[player_i].add_track(ROOT+Folder+'CHUR band & Rejenorst Media - Domra Melody (Remix).mp3');
player[player_i].add_track(ROOT+Folder+'CHUR band - Saga Melody.mp3');
player[player_i].add_track(ROOT+Folder+'Erdenstern_-_The_Tavern_(Into_The_Green).mp3');
player[player_i].add_track(ROOT+Folder+'CHUR band - Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Divinity II Ego Draconis - Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Dragon Age Origins - Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Faun - Rani.mp3');
player[player_i].add_track(ROOT+Folder+'Gaelic Storm - Hills Of Connemara.mp3');
player[player_i].add_track(ROOT+Folder+'Gaelic Storm - Irish tavern music.mp3');
player[player_i].add_track(ROOT+Folder+'Hearthstone - Main Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Icelandic Folk Music - Islandsklukkur.mp3');
player[player_i].add_track(ROOT+Folder+'Inon Zur - Tavern music.mp3');
player[player_i].add_track(ROOT+Folder+'Jeremy Soule - A Winters Tale The Elder Scrolls V Skyrim OST (МУЗЫКА ИЗ ИГР OST GAMES САУНДТРЕКИ НОВОСТИ КОМПЬЮТЕРНЫХ ИГР ТРЕЙЛЕРЫ ОБЗОРЫ ВИДЕО ).mp3');
player[player_i].add_track(ROOT+Folder+'Leo De Lyon - Pinas Theme (Italian Tavern).mp3');
player[player_i].add_track(ROOT+Folder+'Mount & Blade Warband - Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Music for RPG - Таверна (Эолиан).mp3');
player[player_i].add_track(ROOT+Folder+'OST Stronghold 3 - Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Poitin - The Congress Reel.mp3');
player[player_i].add_track(ROOT+Folder+'RPG Tavern Music - Compilation 1.mp3');
player[player_i].add_track(ROOT+Folder+'RPG Tavern Music - Compilation 2.mp3');
player[player_i].add_track(ROOT+Folder+'RPG Tavern Music - Compilation 3.mp3');
player[player_i].add_track(ROOT+Folder+'Stronghold 2 OST - Labyrinth.mp3');
player[player_i].add_track(ROOT+Folder+'Stronghold Legends - The Life of a Gong Farmer.mp3');
player[player_i].add_track(ROOT+Folder+'The Guild 2 Veniсе - 73 - Tavern Музыка Леса - I - Небесная Лютня.mp3');
player[player_i].add_track(ROOT+Folder+'Witcher - Tavern At The End Of World.mp3');
player[player_i].add_track(ROOT+Folder+'World of Warcraft - Таверна.mp3');
player[player_i].add_track(ROOT+Folder+'Ведьмак 2 - Таверна в Гавани.mp3');
player[player_i].add_track(ROOT+Folder+'Невiдомий - Mount and Blade RUS XIII Tavern in Rus.mp3');
player[player_i].add_track(ROOT+Folder+'Стары Ольса - Saltarello.mp3');
player[player_i].add_track(ROOT+Folder+'Стары Ольса - Tryton.mp3');
player[player_i].add_track(ROOT+Folder+'Таверна - Спокойная приличная (Skyrim OST - Around the Fire).mp3');
player[player_i].add_track(ROOT+Folder+'Stan_LePard_-_King_of_Dragon_Pass_(ios)_-_WeDidIt_(16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Stan_LePard_-_King_of_Dragon_Pass_(ios)_-_ReallyReallyGood_(16-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Drolls_-_In_Taberna.mp3');
player[player_i].add_track(ROOT+Folder+'Adam_Skorupa_-_11._Evening_In_The_Tavern_(OST-HD_Ведьмак__The_Witcher)_The_Witcher_Score_(Vk.ComOstHD).mp3');
player[player_i].add_track(ROOT+Folder+'Pazuzu_-_In_A_Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Tartalo_Music_-_Dancing_in_the_Tavern.mp3');
player[player_i].add_track(ROOT+Folder+'Assasins_Creed_4_-_Tavern_Song_#02__Trooper_and_the_Maid.mp3');
player[player_i].add_track(ROOT+Folder+'AC4BF_(Tavern)_-_William_Taylor.mp3');
player[player_i].add_track(ROOT+Folder+'Martin_Best_Mediaeval_Ensemble_-_Leu_chansoneta.mp3');
player[player_i].add_track(ROOT+Folder+'Mediæval_Bæbes_-_Erthe_Upon_Erthe.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Seedy_Tavern.mp3');
player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Река", lt[player_i-1]);
 Folder = 'река/';
 
 
player[player_i].add_track(ROOT+Folder+'Звуки_природы_-_1._Большая_река.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки_природы_-_6._Живая_река.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки_природы_-_Горная_река.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки_природы_-_медленное_течение.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки_природы_-_Река.mp3');
player_i++;

player[player_i] = new PlayerForm();
 player[player_i].create("Ночь лес", lt[player_i-1]);
 Folder = 'ночь/';
 
player[player_i].add_track(ROOT+Folder+'Звуки природы - Болотная сова.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Джунгли (На закате).mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Звуки вечернего леса.mp3');
player[player_i].add_track(ROOT+Folder+'звуки природы - лягушки.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Сверчки.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Цикады.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки Природы - Шум ночи.mp3');
player[player_i].add_track(ROOT+Folder+'Сверчки - (звуки природы).mp3');

player_i++;  


player[player_i] = new PlayerForm();
 player[player_i].create("День лес", lt[player_i-1]);
 Folder = 'день/';
 
//player[player_i].add_track(ROOT+Folder+'Звуки_природы_-_Река.mp3');
player[player_i].add_track(ROOT+Folder+'3D звуки Природы для Оли - УТРО В ЛЕСУ (слушать только в наушниках).mp3');
player[player_i].add_track(ROOT+Folder+'3D-звуки природы - Комар на природе (слушать только в наушниках).mp3');

player[player_i].add_track(ROOT+Folder+'Звуки природы - Спокойствие леса.mp3');
player[player_i].add_track(ROOT+Folder+'Дрозд Звуки природы.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки живой природы - Попугаи.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Дрозд певчий.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Звуки тропического леса после дождя.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Кукушка.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Куропатка виргинская, голуби и кардиналы.mp3');
player[player_i].add_track(ROOT+Folder+'ЗВУКИ ПРИРОДЫ - Лето - лягушки, сверчки и утки.mp3');
player[player_i].add_track(ROOT+Folder+'ЗВУКИ ПРИРОДЫ - Осень - ветер, щебетанье птиц..mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Птицы, сверчки.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Птицы.mp3');

player_i++; 



player[player_i] = new PlayerForm();
 player[player_i].create("Дождь", lt[player_i-1]);
 Folder = 'дождь/';
 
player[player_i].add_track(ROOT+Folder+'Звуки природы - 3D Дождь (слушать в наушниках закрыв глаза).mp3');
player[player_i].add_track(ROOT+Folder+'ЗВУКИ ПРИРОДЫ - Весна - легкий дождь.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Гроза.mp3');
player[player_i].add_track(ROOT+Folder+'ЗВУКИ ПРИРОДЫ - гром и дождь.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки Природы - Раскаты грома и тихий шум дождя.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Шум грозы.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы. - Буря с дождем..mp3');

player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Огонь", lt[player_i-1]);
 Folder = 'огонь/';
 
 
player[player_i].add_track(ROOT+Folder+'Звуки природы - Горящий огонь.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Ночной костер.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Потрескивание поленьев.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Треск костра.mp3');

player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Город", lt[player_i-1]);
 Folder = 'город/';
 
 
player[player_i].add_track(ROOT+Folder+'город китай.mp3');
player[player_i].add_track(ROOT+Folder+'город студенты.mp3');
player[player_i].add_track(ROOT+Folder+'город толпа эхо.mp3');
player[player_i].add_track(ROOT+Folder+'город толпа.mp3');
player[player_i].add_track(ROOT+Folder+'город толпа2.mp3');
player[player_i].add_track(ROOT+Folder+'город толпа3.mp3');
player[player_i].add_track(ROOT+Folder+'город толпа4.mp3');
player[player_i].add_track(ROOT+Folder+'город.mp3');
player[player_i].add_track(ROOT+Folder+'город2.mp3');
player[player_i].add_track(ROOT+Folder+'рынок-толпа.mp3');
player[player_i].add_track(ROOT+Folder+'толпа кафе.mp3');


player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Деревня", lt[player_i-1]);
 Folder = 'деревня/'; 
 
player[player_i].add_track(ROOT+Folder+'деревня загон.mp3');
player[player_i].add_track(ROOT+Folder+'деревня индюки 2.mp3');
player[player_i].add_track(ROOT+Folder+'деревня индюки.mp3');
player[player_i].add_track(ROOT+Folder+'деревня коровы.mp3');
player[player_i].add_track(ROOT+Folder+'деревня куры.mp3');
player[player_i].add_track(ROOT+Folder+'Деревня осел.mp3');
player[player_i].add_track(ROOT+Folder+'деревня пастбище.mp3');
player[player_i].add_track(ROOT+Folder+'деревня пони.mp3');
player[player_i].add_track(ROOT+Folder+'деревня свинарник.mp3');
player[player_i].add_track(ROOT+Folder+'деревня утки.mp3');
player[player_i].add_track(ROOT+Folder+'деревня ферма.mp3');
player[player_i].add_track(ROOT+Folder+'деревня2.mp3');
player[player_i].add_track(ROOT+Folder+'деревня3.mp3');
player[player_i].add_track(ROOT+Folder+'жеревня вечер.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Деревня.mp3');
player[player_i].add_track(ROOT+Folder+'Звуки природы - Рассвет в деревне.mp3');

player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Храм", lt[player_i-1]);
 Folder = 'Храм/'; 
 
player[player_i].add_track(ROOT+Folder+'храм.mp3');
player[player_i].add_track(ROOT+Folder+'Jean Mouton - Verbum bonum suave (The Brabant Ensemble Stephen Rice).mp3');
player[player_i].add_track(ROOT+Folder+'Jean Mouton - Missa Tu es Petrus (The Brabant Ensemble Stephen Rice).mp3');
player[player_i].add_track(ROOT+Folder+'Gregorian - Stop Crying Your Heart Out (Oasis).mp3');
player[player_i].add_track(ROOT+Folder+'Gregorian - Joga (Bj rk).mp3');
player[player_i].add_track(ROOT+Folder+'Ensemble_Organum_-_Versus__Veni_solis_radius.mp3');
player[player_i].add_track(ROOT+Folder+'León_van_der_Stadt_-_Crystals_of_Light.mp3');
player[player_i].add_track(ROOT+Folder+'Fable 3 OST - Loadscreen music.mp3');
player[player_i].add_track(ROOT+Folder+'poyavlenie_bogov.mp3');
player[player_i].add_track(ROOT+Folder+'Григорианское пение - AXION ESTIN OS.mp3');
player[player_i].add_track(ROOT+Folder+'Григорианское пение - Благодарение.mp3');
player[player_i].add_track(ROOT+Folder+'Григорианское_пение_-_Kyrie_Christe_Eleison.mp3');
player[player_i].add_track(ROOT+Folder+'Григорианское_пение,_средневековые_католические_хоралы_-_14.mp3');
player[player_i].add_track(ROOT+Folder+'Григорианское_пение,_средневековые_католические_хоралы_-_12.mp3');
player[player_i].add_track(ROOT+Folder+'Gregorian_chant_(Григорианское_пение)_[club13333245]_-_Regen.mp3');
player[player_i].add_track(ROOT+Folder+'григорианское_пение_-_Laudamus.mp3');
player[player_i].add_track(ROOT+Folder+'Gaudeamus_-_гимн_студентов_на_латинском.mp3');
player[player_i].add_track(ROOT+Folder+'Midnight_Syndicate_-_Eternal_Mystery.mp3');
player[player_i].add_track(ROOT+Folder+'Alla_Francesca_-_Landini_,_Ballata_-_Lasso!_Di_Donna.mp3');
player[player_i].add_track(ROOT+Folder+'Ensenhas_-_Pos_de_chantar_(Гильом_IX,_герцог_Аквитанский)_Live_26.06.13.mp3');
player[player_i].add_track(ROOT+Folder+'Ensemble_Labyrinthus_-_Ecce_torpet_probitas.mp3');
player[player_i].add_track(ROOT+Folder+'Ensemble_Labyrinthus_-_Pange_melos_lacrimosum.mp3');
player[player_i].add_track(ROOT+Folder+'Dominique_Vellard_&_Emmanuel_Bonnardot_-_Da_laudis,_homo,_nova_cantica_(Conductus).mp3');

player_i++; 

// Эпик
player[player_i] = new PlayerForm();
 player[player_i].create("Эпик", lt[player_i-1]);
 Folder = 'Эпик/'; 
 
player[player_i].add_track(ROOT+Folder+'Pitch Hammer - Waves Of Immortals.mp3');
player[player_i].add_track(ROOT+Folder+'Pitch Hammer Music - Titan Armor.mp3');
player[player_i].add_track(ROOT+Folder+'Phil Rey - Renaissance.mp3');
player[player_i].add_track(ROOT+Folder+'AudioActive - Unleash Hell (1).mp3');
player[player_i].add_track(ROOT+Folder+'Audiomachine - Death Mask.mp3');
player[player_i].add_track(ROOT+Folder+'Audiomachine - Legions of Doom.mp3');
player[player_i].add_track(ROOT+Folder+'Brand X Music - Dragons Demise.mp3');
player[player_i].add_track(ROOT+Folder+'Colossal Trailer Music - Resistance.mp3');
player[player_i].add_track(ROOT+Folder+'Daniel Beijbom - Land Of Faraway.mp3');
player[player_i].add_track(ROOT+Folder+'Efisio Cross - Justice.mp3');
player[player_i].add_track(ROOT+Folder+'Epic North Music - Gunmetal.mp3');
player[player_i].add_track(ROOT+Folder+'Epic North Music - Stampede.mp3');
player[player_i].add_track(ROOT+Folder+'Epic Score - Creator of Worlds.mp3');
player[player_i].add_track(ROOT+Folder+'Epic Score - Deadly Prophecy.mp3');
player[player_i].add_track(ROOT+Folder+'Epic Score - Liberators.mp3');
player[player_i].add_track(ROOT+Folder+'Hans Zimmer - Roach And Ghost Death.mp3');
player[player_i].add_track(ROOT+Folder+'Hiroyuki Sawano - XL-TT.mp3');
player[player_i].add_track(ROOT+Folder+'Instrumental Core - Touch The Sun.mp3');
player[player_i].add_track(ROOT+Folder+'Killer Tracks - Island Of Kings (1).mp3');
player[player_i].add_track(ROOT+Folder+'Killer Tracks - Island Of Kings.mp3');
player[player_i].add_track(ROOT+Folder+'Liquid Cinema - Forever.mp3');
player[player_i].add_track(ROOT+Folder+'Louis Viallet - Fight For Glory.mp3');
player[player_i].add_track(ROOT+Folder+'Mark Petrie - From Within.mp3');
player[player_i].add_track(ROOT+Folder+'Nightwish - The End Of All Hope.mp3');
player[player_i].add_track(ROOT+Folder+'Noriyasu Agematsu - The Initiation.mp3');
player[player_i].add_track(ROOT+Folder+'Position Music - Raising the Damned.mp3');
player[player_i].add_track(ROOT+Folder+'Septicflesh - Order of Dracul.mp3');
player[player_i].add_track(ROOT+Folder+'Soundmopi - Return Of The Hero.mp3');
player[player_i].add_track(ROOT+Folder+'Steve Syz - Aeua.mp3');
player[player_i].add_track(ROOT+Folder+'Todd Burns - Maelstrom.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Archangel.mp3');
player[player_i].add_track(ROOT+Folder+'Two Steps From Hell - Dark Ages.mp3');
player[player_i].add_track(ROOT+Folder+'WoW Legion OST - For Azeroth.mp3');
player_i++;

/*/
player[player_i] = new PlayerForm();
 player[player_i].create("Начало", lt[player_i-1]);
 Folder = 'начало/'; 
 
player[player_i].add_track(ROOT+Folder+'Songs To Your Eyes - Magic Rainbow.mp3');
player[player_i].add_track(ROOT+Folder+'Songs To Your Eyes - Incredible Journey.mp3');
player[player_i].add_track(ROOT+Folder+'Songs To Your Eyes - Gulliver.mp3');
player[player_i].add_track(ROOT+Folder+'Songs To Your Eyes - The Last Dragon.mp3');
player[player_i].add_track(ROOT+Folder+'Michael Curran - Civilization V Opening Movie Music.mp3');
player[player_i].add_track(ROOT+Folder+'Yugo Kanno - Threatening.mp3');
player[player_i].add_track(ROOT+Folder+'Yugo Kanno - Nioh -Main Theme-.mp3');
player[player_i].add_track(ROOT+Folder+'James Paget - The Hero Within.mp3');
player[player_i].add_track(ROOT+Folder+'Stephen Harwood Jr. - Brothers In Arms Theme.mp3');
player[player_i].add_track(ROOT+Folder+'NieR Automata OST - Intro.mp3');
player[player_i].add_track(ROOT+Folder+'Titan Quest IT OST - Main Title (DLC).mp3');
player[player_i].add_track(ROOT+Folder+'Marika Suzuki, Akiyuki Morimoto - Main Theme Lost Planet 2.mp3');
player[player_i].add_track(ROOT+Folder+'Marika Suzuki, Akiyuki Morimoto - Title Screen.mp3');
player[player_i].add_track(ROOT+Folder+'Akela Sun - Hope Never Dies.mp3');
player[player_i].add_track(ROOT+Folder+'Jason Graves - Might Magic X.mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaish - The Dragon Boy.mp3');
player[player_i].add_track(ROOT+Folder+'Joe Hisaishi - The Eternal Tree of Life(OST Laputa The Castle in the Sky).mp3');
player[player_i].add_track(ROOT+Folder+'Phil Hamilton - Skyborn OST Free.mp3');
player[player_i].add_track(ROOT+Folder+'Steve Jablonsky - Steamboy OST.mp3');
player[player_i].add_track(ROOT+Folder+'STO OST (Star Trek Online) - Sector Space (Explore 3).mp3');
player[player_i].add_track(ROOT+Folder+'Аллоды Онлайн - Владыки Судеб (OST-HD Аллоды Онлайн) (Vk.Com OstHD).mp3');
player[player_i].add_track(ROOT+Folder+'Аллоды Онлайн - Герои Аллодов (OST-HD Аллоды Онлайн) (Vk.Com OstHD).mp3');

player_i++; 
// начало /



player[player_i] = new PlayerForm();
 player[player_i].create("Нагнетание", lt[player_i-1]);
 Folder = 'нагнетание/'; 
 
player[player_i].add_track(ROOT+Folder+'7 - Вы впервые оказались на теневом плане. Трудно дышать.mp3');
player[player_i].add_track(ROOT+Folder+'Must Save Jane - Teens in the Woods.mp3');
player[player_i].add_track(ROOT+Folder+'Must Save Jane - Congealed Blood.mp3');
player[player_i].add_track(ROOT+Folder+'Must Save Jane - Coming for You.mp3');
player[player_i].add_track(ROOT+Folder+'Must Save Jane - Zombie Hitting.mp3');
player[player_i].add_track(ROOT+Folder+'Yasunori Mitsuda - Chrono Trigger - Main Theme (orch. version).mp3');
player[player_i].add_track(ROOT+Folder+'Nathan Grigg - Ending.mp3');
player[player_i].add_track(ROOT+Folder+'Nathan Grigg - Secrets.mp3');
player[player_i].add_track(ROOT+Folder+'Nathan Grigg - M7 CS skx Fight Loop.mp3');
player[player_i].add_track(ROOT+Folder+'Nathan Grigg - M5 CS2.mp3');
player[player_i].add_track(ROOT+Folder+'Nathan Grigg - Opening.mp3');
player[player_i].add_track(ROOT+Folder+'Garry Schyman - The Girl For The Debt.mp3');
player[player_i].add_track(ROOT+Folder+'Cris Velasco Sascha Dikiciyan - Mass Effect 2 The Arrival Suite.mp3');
player[player_i].add_track(ROOT+Folder+'Greg Chandler - A Dangerous Voyage.mp3');
player[player_i].add_track(ROOT+Folder+'Greg Chandler - Credits.mp3');
player[player_i].add_track(ROOT+Folder+'Greg Chandler - Main Menu.mp3');
player[player_i].add_track(ROOT+Folder+'Greg Chandler - Mastered.mp3');
player[player_i].add_track(ROOT+Folder+'Greg Chandler - Prologue (Arkham Asylum).mp3');
player[player_i].add_track(ROOT+Folder+'Greg Chandler - They Know My Name.mp3');
player[player_i].add_track(ROOT+Folder+'Greg Chandler - Title Calling.mp3');
player[player_i].add_track(ROOT+Folder+'Jason Graves - Airborne Pursuit.mp3');
player[player_i].add_track(ROOT+Folder+'Jason Graves - Commandeered.mp3');
player[player_i].add_track(ROOT+Folder+'Jason Graves - The Enemys Den.mp3');
player[player_i].add_track(ROOT+Folder+'Jason Graves - The Rebellion.mp3');
player[player_i].add_track(ROOT+Folder+'Jason Graves - The Scourge.mp3');
player[player_i].add_track(ROOT+Folder+'Jesper Kyd - Rocky Mountains.mp3');
player[player_i].add_track(ROOT+Folder+'Kelly Bailey - Nova Prospekt.mp3');
player[player_i].add_track(ROOT+Folder+'Kevin Macleod - Pinkamena.mp3');
player[player_i].add_track(ROOT+Folder+'Kevin Manthei - Creepy.mp3');
player[player_i].add_track(ROOT+Folder+'Kota Suzuki, Hideki Okugawa, Akihiko Narita, Seiko Kobuchi - First Encounter.mp3');
player[player_i].add_track(ROOT+Folder+'Kota Suzuki, Hideki Okugawa, Akihiko Narita, Seiko Kobuchi - New Fear.mp3');
player[player_i].add_track(ROOT+Folder+'Kota Suzuki, Hideki Okugawa, Akihiko Narita, Seiko Kobuchi - The Town.mp3');
player[player_i].add_track(ROOT+Folder+'Marilyn Mason (страшная музыка) - Resident Evil Main Title Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Oscar Araujo - Prologue.mp3');
player[player_i].add_track(ROOT+Folder+'Richard Band, Rick Jackson, Ronald Valdez - Descent to Undermountain - 26 UD GEN3 Crypts (11-22kj).mp3');
player[player_i].add_track(ROOT+Folder+'Russell Shaw - In the Country Growing Near.mp3');
player[player_i].add_track(ROOT+Folder+'S U R V I V E - Stranger Things OST - Main Theme (Extended).mp3');
player[player_i].add_track(ROOT+Folder+'WavLibraryNet_Sound2296.mp3');
player[player_i].add_track(ROOT+Folder+'WavLibraryNet_Sound7864.mp3');
player[player_i].add_track(ROOT+Folder+'WavLibraryNet_Sound7865.mp3');
player[player_i].add_track(ROOT+Folder+'Yugo Kanno - Threatening.mp3');
player[player_i].add_track(ROOT+Folder+'А._Новосельцев,_А._Маслов_-_Выжить_После_-_Track_1.mp3');
player[player_i].add_track(ROOT+Folder+'Аллоды Онлайн - Крылатый Ужас (OST-HD Аллоды Онлайн Allods Online) Official (Vk.Com OstHD).mp3');
player[player_i].add_track(ROOT+Folder+'Мрачная музыка - Носферату.mp3');
player[player_i].add_track(ROOT+Folder+'ОЧЕНЬ СТРАШНАЯ МУЗЫКА - Lustmord - Black Star.mp3');
player[player_i].add_track(ROOT+Folder+'Просто страшная музыка - Без слов (Outlast OST).mp3');
player[player_i].add_track(ROOT+Folder+'Самая страшная музыка - Говорят на заднем плане кто-то слышит что его зовут домой.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - 2.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - 3.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Battle 2.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Track 4.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Zombies Theme.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Ален Шутер.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Без названия.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - для комнаты страха.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Закрытая школа.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Из шоу Кто хочет стать милордером.mp3');
player[player_i].add_track(ROOT+Folder+'страшная музыка - страшная музыка (1).mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Страшная Музыка.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - твои страхи.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Темная мелодия.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Трек 11.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - ХЗ откуда, ХЗ какое название.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка - Шкатулка.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка 6 - 6.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка для сталка - сталк.mp3');
player[player_i].add_track(ROOT+Folder+'страшная музыка фон - соседство.mp3');
player[player_i].add_track(ROOT+Folder+'Страшная музыка.. - Алая рука.mp3');


player_i++; 
// начало /
/**/

///////////////////

// Звуки

Folder = '!звуки/'; 
var sounds = new soundsClass();
sounds.add(
	[
		ROOT+Folder+'Ералаш.mp3', 
		ROOT+Folder+'Звуки для видео - Барабаны Бадум-тссс.mp3', 
		ROOT+Folder+'смех1.wav', 
		ROOT+Folder+'смех2.wav', 
		ROOT+Folder+'смех3.wav', 
		ROOT+Folder+'смех4.wav' 
	],
		"LOL"
	); 
sounds.add(ROOT+Folder+'Опыт 6.mp3', "expa");
sounds.add(ROOT+Folder+'Монеты.wav', "money");
sounds.add(ROOT+Folder+'таймер2.wav', "time");
//sounds.add(ROOT+Folder+'портал 0.wav', "portal");
sounds.add(ROOT+Folder+'Гонг2.mp3', "warning");
sounds.add(
	[
		ROOT+Folder+'Поворот.mp3',
		ROOT+Folder+'Звуки для видео - Супрайз мазафака.mp3',
		ROOT+Folder+'Звуки для видео - ТА ДА ДА ДАААМ.mp3',
		ROOT+Folder+'Звуки для видео - Внезапный звук.mp3',
		ROOT+Folder+'Звуки Для Видео - Тревожная музыка.mp3',
	]
		, "eye"
	); 
sounds.add(
	[
		ROOT+Folder+'вжух.wav',
		ROOT+Folder+'Звуки для видео - Превращение.mp3',
		ROOT+Folder+'Звуки для видео - Волшебство.mp3',
	]
	, "magic"
	);

// проверка файлов
mus_check();

// start//

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
			console.log("#"+btn+" clicked!");
		} else {
			clearInterval(timer)
		}
	},500);
}
clickTopButtons();
/*
player[player_i] = new PlayerForm();
 player[player_i].create("Звуки", lt[player_i-1]);
 Folder = '!звуки/'; 
 
player[player_i].add_track(ROOT+Folder+'EXPERNCE.mp3');

player_i++; 

*/
	
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
		if($("#dbg").length<1)			
			$("body").append("<div id='dbg'></div><div class='mod_win' id='mw_add_tracks'>"+path+folder+block+btns+"</div>");
	});
	
	$("body").on("click", "#mw_add_tracks .doit_new", function(){
		var path=$("#mw_add_tracks .path").val();
		var folder=$("#mw_add_tracks .folder").val();
		var list=$("#mw_add_tracks .blck").val();
		var strs = list.split("\n");
		
		//console.log(strs[1]);
		if(path.slice(-1)!="/")
			path+="/";
		if(folder.slice(-1)!="/")
			folder+="/";
		
		var result = [];
		
		player[player_i] = new PlayerForm();
		player[player_i].create(folder.substring(0, folder.length - 1));		
		
		for(i=0; i< strs.length && strs[i].length>0; i++)
		{
			result[i]=path+folder+strs[i];
			if(result[i].length>0)
			 player[player_i].add_track(result[i]);
		}
		//console.log(result[1]);
		player_i++; 
		$("#dbg").remove();
		$("#mw_add_tracks").remove();
	});
	
	// / список
	

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
		console.log(n_fs);
		$(".tracks").css('font-size', n_fs+"px");
	});
	$("body").on("click", "#p_em_dn", function(){
		var fs=$(".tracks").css('font-size');
		n_fs=parseFloat(fs, 10)-3;
////		console.log(n_fs);
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
	$("body").keyup(function(eventObject){
		var id=0, ev=0, nm=0;
		var keyCode = eventObject.which;
		//alert(keyCode);
		switch(keyCode)
		{ //vol up
			case 49: id=1; ev="vol_up"; //1
				break;
			case 50: id=2; ev="vol_up"; //2
				break;
			case 51: id=3; ev="vol_up"; //3
				break;
			case 52: id=4; ev="vol_up"; //4
				break;
			case 53: id=5; ev="vol_up"; //5
				break;
			case 54: id=6; ev="vol_up"; //6
				break;
			case 55: id=7; ev="vol_up"; //7
				break;
			case 56: id=8; ev="vol_up"; //8
				break;
			case 57: id=9; ev="vol_up"; //9
				break;
			case 48: id=10; ev="vol_up"; //0
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
var auds=document.getElementsByTagName('audio');
	for (var i=0;i<auds.length;i++){
        addEvent(auds[i], 'ended', a_ended);
       // addEvent(auds[i], 'error', a_fail(e));
	   auds[i].addEventListener(events[i], onEvent, false);
		//$(auds[i]).addEventListener('ended', onEndFunc);
	////	console.log("event added //"+i);
    }


// invalidate audio source (will fire abort, emptied, and error)
var emptyAudio = function() {
    console.error("Проблема с аудио");
};	

}); 