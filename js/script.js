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
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener(type, fn, false);
}

$(document).ready(function(){
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
	PlayerForm.prototype.create = function(name, lt)
		{			
		num = $(".player_form").length;
		this.name = name;
		
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
		this.f_play=1;
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
	console.log("c_vol: "+c_vol);
	document.getElementById(a_id).volume = nnum;
	$("#"+a_id).trigger('play');
	console.log("n_vol: "+document.getElementById(a_id).volume);
	//setInterval(function(){alert(1);}, 2000);
	var timer = setInterval(
			function(){
				//alert(1);
				console.log(document.getElementById(a_id).volume+" < "+c_vol);
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
				console.log("vol: "+document.getElementById(a_id).volume);
				}, 300);
				
	
	
	console.log("vol2: "+document.getElementById(a_id).volume);
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
	console.log("tr_num after = "+player[id].track_num);
	
	//переключаем активный элемент
	$(".player_form[data-name="+id+"]").children(".pf_list").children(".tr_line").removeClass("active");
	$(".player_form[data-name="+id+"]").children(".pf_list").children(".tr_line").eq(player[id].track_num-1).addClass("active");
	
	// переключаем трек
	start_play(id);
}
function volume(id, vol){
	var el = $(".player_form[data-name="+id+"]").find("input[type=range]");	
	 console.log("el.val: "+el.val());
	
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
	console.log("cur: "+cur);
	 
	 t_max=max-min;
	 t_cur=cur-min;
	 need = t_cur*100/t_max;
	 console.log("el.val: "+el.val());
	 
	 el.next(".vol_num").text(need+"%");
	 player[id].mus_vol=need/100;
	 if( player[id].mus_vol>1)
		  player[id].mus_vol=1;
	  if( player[id].mus_vol<0)
		   player[id].mus_vol=0;
	 console.log("player[id].mus_vol: "+player[id].mus_vol);
	a_id="a_"+id;
	/*if(id<10)
		a_id="a_0"+id;*/	
	el.val(cur);
	document.getElementById(a_id).volume=player[id].mus_vol;
}
function a_ended(){
	console.log("music ended");
	var id=$(this).closest(".player_form").attr("data-name");
	next_active_track(id);
	start_play(id);
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
	 console.log("id form ="+id);
	
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
		console.log("element for pause: "+a_id);
		
		if($("#p_smooth").prop("checked"))
			{
			// плавное evtymitybt звука
			//var c_vol = $("#"+a_id).volume;
			var c_vol = document.getElementById(a_id).volume
			var nnum= 0.1;
			console.log("c_vol: "+c_vol);
			//document.getElementById(a_id).volume = nnum;
			$("#"+a_id).trigger('play');
			console.log("n_vol: "+document.getElementById(a_id).volume);
			//setInterval(function(){alert(1);}, 2000);
			var timer = setInterval(
					function(){
						//alert(1);
						console.log(document.getElementById(a_id).volume+" < "+c_vol);
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
						console.log("vol: "+document.getElementById(a_id).volume);
						}, 200);
						
			
			
			console.log("vol2: "+document.getElementById(a_id).volume);
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
//// /события
 
 var player_i = 1;
 var player = [];
 
 player[player_i] = new PlayerForm();
 player[player_i].create("Спокойное", lt[player_i-1]);

player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Age of Empires III - - Geddovmagushpa.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Ah-Nee-Mah (Diane & David Arkenstone) - Ancient Spirits.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/American Conquest - Indeans Prelude.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/American Conquest Music - MayaNewIndeans2.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Arcanum of... (OST) - Caladon (by Ben Houge).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Arcanum of... (OST) - Cities (by Ben Houge).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Arcanum of... (OST) - Quintarra (by Ben Houge).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Arcanum of... (OST) - Tarant (by Ben Houge).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Arcanum of... (OST) - The Tarant Sewers.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Arcanum of... (OST) - Tulla (by Ben Houge).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Arcanum of... (OST) - Wilderness (by Ben Houge).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/CHUR band & Rejenorst Media - RUSVaegirs Travel (Remix).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/CHUR band & Rejenorst Media - Swadian Infantry (Remix).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Coeur De Pirate - Comme Des Enfants.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Coeur de Pirate - Hymn of Light.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Coeur de Pirate - Jupiters Lightning.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Coeur de Pirate - Leave Your Castle.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Coeur de Pirate - Little Girl, Gen.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Coeur de Pirate - Magnas Heart.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Coeur de Pirate - Metal Gleamed in the Twilight.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Coeur de Pirate - Off to Sleep.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Coeur de Pirate - Patches of Sky.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Danny Elfman & Russell Shaw - Bowerlake.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Danny Elfman - Main Titles.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Die Verbannten Kinder Evas - May No Tears Stain This Holy Ground.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Erdenstern - Bride Of The Ocean (Into The Blue).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Erdenstern - Foreign Waters (Into The Blue).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Erdenstern - In the Doldrums (Into The Blue).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Erdenstern - On Deck (Into The Blue).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Erdenstern - The Forest.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Erdenstern - The Storm (Into The Blue).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Excellent Track - Lineage 2 OST - 42.Rune Township Theme - Home of Winds.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Existence (Margot Reisinger) - Between Earth And Sky.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Fable 3 - Хмарская долина.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Forest Swords - Hood.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Garry Schyman - Dancers on a String OST Bioshock.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Garry Schyman - Pairbond (Bioshock 2 Theme).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Geoff Knorr - Pocatello Peace - Shoshone - Shoshone Sun Dance Songs.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Harry Gregson-Williams - From Western Woods to Beaversdam.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Hearthstone Fun - The Arena Awaits.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Heroes - Kira say....mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Ian Smith - Hiawatha Peace - Iroquois - Ho, Ho, Watanay.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Jeremy Soule - Peaceful life.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Jeremy Soule - The Bannered Mare.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Jeremy Soule - Through the ages.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Jesper Kyd - Aphelion (OST Гостья The Host 2013).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Jesper Kyd - City Of Jerusalem.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Jesper Kyd - City of Rome.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/John Renbourn - Alman Melancholy Galliard.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/John Renbourn - Bransle Gay Bransle de Bourgogne.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/John Renbourn - Lamento di Tristan La Rotta.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/John Renbourn - My Johnny was a Shoemaker Westron Wynde Scarborough Fair.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/John Renbourn - Sarabande.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/John Renbourn - The Lady and the Unicorn.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/John Renbourn - Trotto Saltarello.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/John Renbourn - Veri Floris Triple Ballade.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Kai Rosenkranz - Ardea (Gothic OST).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Kai Rosenkranz - Faring Explore.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Kai Rosenkranz - From Silden To Trelis(OST Gothic 3).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Kai Rosenkranz - Gothic II OST - The Harbor.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Kai Rosenkranz - Harbor City - Day (OST Risen).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Kai Rosenkranz - Trelis Night.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/klive - Lomavatn.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/L2 OST - Gracia Town Theme - Gracia.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Lamento Beyond the void - Ransen.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Lineage 2 - Dion.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Lineage 2 OST - Aden.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Lineage 2 OST - Heine.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Ludovico Einaudi - Fly.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Magicka 2 - Main Theme.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Michael Curran - Montezuma Peace - Aztec - Cora Mitote Song from Santa Teresa.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Michiel van den Bos - Elf Swamp.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Music for R.P.G. - Farewell.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Music for R.P.G. - Sayuris Theme.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Neverwinter Nights 2 - Day in City Docks.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Pillars of Eternity - Dyrford.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Pillars of Eternity - Dyrwood.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Pillars of Eternity - Elmshore.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Pillars of Eternity - Encampment.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Pillars of Eternity - Engwith.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Pillars of Eternity - Gilded Vale.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Pillars of Eternity - Ondras Gift.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Pillars of Eternity - Twin Elms.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Princess Mononoke OST - The Battle Drums.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Rejenorst Media - Lord and Land.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Risen OST - The Great Swamp.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Robert L. Euvino - Castle Jam.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Robert L. Euvino - Harpy 1.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Robert L. Euvino - Harpy 2.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Robert L. Euvino - Harpy 3.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Robert L. Euvino - Sad Times.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Robert L. Euvino - Two Mandolins.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Russel Shaw - Fable 3 - Execution.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Stronghold - Mattsjig.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Stronghold OST - Castlejam.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Stuart Chatwood - A Brief Respite(Darkest Dungeon OST).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Stuart Chatwood - Terror And Madness (Darkest Dungeon OST).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Stuart Chatwood - The Hamlet(Darkest Dungeon OST).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/TES III Morrowind - Main Theme (Guitar Remix).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Thomas Newman - Any Other Name.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Vangelis - El Greco Movement I.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/спокойно/Wardruna - Ar var alda.mp3');
player_i++;

player[player_i] = new PlayerForm();
 player[player_i].create("Бодро", lt[player_i-1]);
 
 player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/1M1 Music(Vol.2) - Cannonball.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Alice Madness Returns - BattleTheme01.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/American McGees Alice (OST) - Centipede.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Arcanum of... (OST) - Combat Music (by Ben Houge).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Atlas Music - - Titan Storm.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Atli Orvarsson - The Return Of The Eagle (OST Орел 9 легиона).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Audiomachine - Blood and Stone.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Audiomachine - Death Mask Extended.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/AudioMachine - Lachrimae.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Basil Poledouris - Anvil Of Crom.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Chris Vrenna - American McGees Alice (OST) - Red Queen.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Erdenstern - Boarding the Enemy Vessel (Into The Blue).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Erdenstern - Gold and Glory (Into The Blue).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Erdenstern - Into The White - 12 - Cold Steel.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Erdenstern - Into The White - 15 - Avalanche.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Erdenstern - Into The White - 18 - Blizzard.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Erdenstern - Into The White - 6- Snow Creatures.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Evequest2 - battletheme.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Fable 3 - Escape.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Fight - Battle.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Greg Chandler - Attack of the Fishmen (OST Call of Cthulhu Dark Corners of the Earth).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Greg Chandler - Blood on the Deck (OST Call of Cthulhu Dark Corners of the Earth).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/GRV Music - Neodammerung.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Hans Zimmer - Deshi Basara.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Hanz Zimmer - Navy Seals Battle Theme.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Immediate Music - Dark Side Of Power.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Inon Zur - Guardians.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/James Newton Howard - Warriors On the Beach OST Белоснежка и охотник.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Jesper Kyd - Death Brings Hope.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Lineage 2 - Battle.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Music for RPG - BattleTheme.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Music for RPG - Ирландская Боевая Музыка.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/ost Angel Sanctuary - Golem Form.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/OST L2 - Baiums Battle.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/OST The Elder Scrolls V Skyrim - Battle 4.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Pfeifer Broz. Music - Absolute Anthropoid.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Pillars of Eternity - The Dragon Thrashed and Wailed.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Pillars of Eternity - The Harbingers Doom.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Pillars of Eternity - Their Hearts Grew Bold.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Satou Naoki - Nigero.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Sinbad Legend of the Seven Seas - The Giant Fish.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Sinbad Legend of the Seven Seas - The Sea Monster.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Solar - Far Away (Orchestral Version).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Sonic Librarian - - Protector Of The Realm.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Soundtrack - Six Glorious Wishes (The 10th Kingdom).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Stuart Chatwood - Battle in the Warrens(Darkest Dungeon OST).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Stuart Chatwood - Combat in the Ruins(Darkest Dungeon OST).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Stuart Chatwood - Mournweald Encounter(Darkest Dungeon OST).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Treacherous Orchestra - Hounds.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Two Steps From Hell (All Drums Go To Hell - 2007) - 4. Carnival From Hell.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Two Steps From Hell - 19 - Path Of Destruction.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Two Steps From Hell - Barrage Of Noise.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Two Steps From Hell - Bionics.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Two Steps From Hell - Crossword Killer.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Two Steps From Hell - Norwegian Pirate.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Two Steps From Hell - Shoot To Kill.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Боевая музыка - Волынка.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/бодро/Бой - Swamp Fight.mp3');
player_i++; 

player[player_i] = new PlayerForm();
 player[player_i].create("Мрачно", lt[player_i-1]);
 
 player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/Dead Factory - Streams of dead light.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/Fable 3 - Introduction.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/Fable 3 - Sanctuary.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/FableThe Lost Chapters - Bowerstone Market.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/FableThe Lost Chapters - Darkwood.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/FableThe Lost Chapters - Greatwood.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/FableThe Lost Chapters - Knothole Glade.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/FableThe Lost Chapters - Witchwood.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/Heroes - The Necropolis.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/John Debney - Tar Pit.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/Midnight Syndicate - Army of the Dead.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/Music for R.P.G. - Вальс.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/мрачно/Russell Shaw - Witchwood.mp3');
player_i++; 

player[player_i] = new PlayerForm();
 player[player_i].create("Светло", lt[player_i-1]);
 
 player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/3 OST Fable The Lost Chapters - Bowerstone.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Azedan - The celebration of the city.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Joe Hisaishi - A Road to Somewhere.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Joe Hisaishi - Day Of The River (OST Унесённые призраками).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Joe Hisaishi - Howls Moving Castle Theme (вальс из аниме Ходячий замок Хаула - оркестровая версия).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Joe Hisaishi - Numa no Soko no le (The House at Swamp Bottom).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Joe Hisaishi - Summer.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Joe Hisaishi - The Sixth Station.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Lineage 2 OST - Town Theme - 28 - Island Village.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Lineage II OST - Giran Theme.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/светло/Thomas Newman - Still Dead.mp3');
player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Данж", lt[player_i-1]);
 
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Arathgoth - Tales of the Three Moons.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Arcanum of... (OST) - Dungeons (by Ben Houge).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Arcanum of... (OST) - Kerghans Castle.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Arcanum of... (OST) - Mines (by Ben Houge).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Arcanum of... (OST) - The Void.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Dead Factory - Awakening.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Dead Factory - Catatonic Fears.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Dead Factory - Cold Industrial Reality.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Dead Factory - Entalpia.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Dead Factory - NowherE.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/FableThe Lost Chapters - Hobbes Cave.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Foglord - Autumnal Solitude.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Foglord - The Tower in the Forest.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Lineage 2 OST - Dungeon Theme - 02 - Abyssal Gathering.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Pillars of Eternity - Brackenbury.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Pillars of Eternity - The Endless Paths I.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Pillars of Eternity - The Endless Paths II.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Pillars of Eternity - Woedica.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Stuart Chatwood - A Brief Respite(Darkest Dungeon OST).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Stuart Chatwood - The Hamlet(Darkest Dungeon OST).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Temple of elemental evil - air loop.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/The Temple Of Elemental Evil - Elemental Earth.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/The Temple Of Elemental Evil - Elemental Water.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/The Temple of Elemental Evil - Moathouse exterior level.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/The Temple of Elemental Evil - Zuggtmoy.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Неизвестен - Elemental fire loop(Temple of elemental evil).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Данж/Подземелья - Древние тоннели (Emerald Rustling - Cave Tales).mp3');
player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Таверна", lt[player_i-1]);
 
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/CHUR band & Rejenorst Media - Domra Melody (Remix).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/CHUR band - Saga Melody.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/CHUR band - Tavern.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Divinity II Ego Draconis - Tavern.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Dragon Age Origins - Tavern.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Faun - Rani.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Gaelic Storm - Hills Of Connemara.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Gaelic Storm - Irish tavern music.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Hearthstone - Main Theme.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Icelandic Folk Music - Islandsklukkur.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Inon Zur - Tavern music.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Jeremy Soule - A Winters Tale The Elder Scrolls V Skyrim OST (МУЗЫКА ИЗ ИГР OST GAMES САУНДТРЕКИ НОВОСТИ КОМПЬЮТЕРНЫХ ИГР ТРЕЙЛЕРЫ ОБЗОРЫ ВИДЕО ).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Leo De Lyon - Pinas Theme (Italian Tavern).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Mount & Blade Warband - Tavern.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Music for RPG - Таверна (Эолиан).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/OST Stronghold 3 - Tavern.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Poitin - The Congress Reel.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/RPG Tavern Music - Compilation 1.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/RPG Tavern Music - Compilation 2.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/RPG Tavern Music - Compilation 3.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Stronghold 2 OST - Labyrinth.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Stronghold Legends - The Life of a Gong Farmer.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/The Guild 2 Veniсе - 73 - Tavern Музыка Леса - I - Небесная Лютня.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Witcher - Tavern At The End Of World.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/World of Warcraft - Таверна.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Ведьмак 2 - Таверна в Гавани.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Невiдомий - Mount and Blade RUS XIII Tavern in Rus.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Стары Ольса - Saltarello.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Стары Ольса - Tryton.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/Таверна/Таверна - Спокойная приличная (Skyrim OST - Around the Fire).mp3');
player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("День лес", lt[player_i-1]);
 
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/3D звуки Природы для Оли - УТРО В ЛЕСУ (слушать только в наушниках).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/3D-звуки природы - Комар на природе (слушать только в наушниках).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/Дрозд Звуки природы Голоса птиц - Звуки природы Голоса птиц рыбалка охота снасти туризм отдых природа снаряжение оружие ножи баня шашлык природа грибы ягоды.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/Звуки живой природы - Попугаи.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/Звуки природы - Дрозд певчий.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/Звуки природы - Звуки тропического леса после дождя.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/Звуки природы - Кукушка.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/Звуки природы - Куропатка виргинская, голуби и кардиналы.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/ЗВУКИ ПРИРОДЫ - Лето - лягушки, сверчки и утки.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/ЗВУКИ ПРИРОДЫ - Осень - ветер, щебетанье птиц..mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/Звуки природы - Птицы, сверчки.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/день/Звуки природы - Птицы.mp3');
player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Ночь лес", lt[player_i-1]);
 
player[player_i].add_track('D:/Cloud/DnD/Музыка/ночь/Звуки природы - Болотная сова.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/ночь/Звуки природы - Джунгли (На закате).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/ночь/Звуки природы - Звуки вечернего леса.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/ночь/звуки природы - лягушки.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/ночь/Звуки природы - Сверчки.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/ночь/Звуки природы - Цикады.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/ночь/Звуки Природы - Шум ночи.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/ночь/Сверчки - (звуки природы).mp3');

player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Дождь", lt[player_i-1]);
 
player[player_i].add_track('D:/Cloud/DnD/Музыка/дождь/Звуки природы - 3D Дождь (слушать в наушниках закрыв глаза).mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/дождь/ЗВУКИ ПРИРОДЫ - Весна - легкий дождь.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/дождь/Звуки природы - Гроза.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/дождь/ЗВУКИ ПРИРОДЫ - гром и дождь.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/дождь/Звуки Природы - Раскаты грома и тихий шум дождя.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/дождь/Звуки природы - Шум грозы.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/дождь/Звуки природы. - Буря с дождем..mp3');

player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Огонь", lt[player_i-1]);
 
player[player_i].add_track('D:/Cloud/DnD/Музыка/огонь/Звуки природы - Горящий огонь.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/огонь/Звуки природы - Ночной костер.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/огонь/Звуки природы - Потрескивание поленьев.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/огонь/Звуки природы - Треск костра.mp3');

player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Город", lt[player_i-1]);
 
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/город китай.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/город студенты.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/город толпа эхо.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/город толпа.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/город толпа2.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/город толпа3.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/город толпа4.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/город.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/город2.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/рынок-толпа.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/город/толпа кафе.mp3');


player_i++; 


player[player_i] = new PlayerForm();
 player[player_i].create("Деревня", lt[player_i-1]);
 
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня загон.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня индюки 2.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня индюки.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня коровы.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня куры.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/Деревня осел.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня пастбище.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня пони.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня свинарник.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня утки.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня ферма.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня2.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/деревня3.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/жеревня вечер.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/Звуки природы - Деревня.mp3');
player[player_i].add_track('D:/Cloud/DnD/Музыка/деревня/Звуки природы - Рассвет в деревне.mp3');


player_i++; 


 /*
 track_11 = new TrLine();
 track_12 = new TrLine();
 track_13 = new TrLine();
 track_11.create(1, 'D:/Cloud/DnD/Музыка/спокойно/Arcanum of... (OST) - Caladon (by Ben Houge).mp3');');
 track_12.create(1, 'D:/Cloud/DnD/Музыка/спокойно/Coeur de Pirate - Little Girl, Gen.mp3');
 track_13.create(1, 'D:/Cloud/DnD/Музыка/спокойно/Forest Swords - Hood.mp3');
 */
	/*add_player_form();	
	add_track(1);
	add_track(1);
	add_track(1);
	add_track(1);
	add_track(1);
*/




 // следующий трек
 /*
	var auds=document.getElementsByTagName('audio');
	for (var i=0;i<auds.length;i++){
        addEvent(auds[i], 'ended', a_ended);
    }
	*/
	/*
	$("body").on("ended", "audio", function(){
		console.log("some audio ended");
	});
	$("body").on("playing", "audio", function(){
		console.log("some audio ended");
	});
	*/
	var onEndFunc = function() { // функция, вызываемая при окончании
                             // воспроизведения
  // какие-то действия
	//alert(111);
	}
	
	
	// создание списка воспроизведение
	
	$("body").on("click", ".make_list", function(){
		// модальное окно
		var f_name = $(this).closest(".player_form").find(".pf_name").text();
		var path = "<input type='text' class='path' placeholder='path' value='D:/Cloud/DnD/Музыка/'>";
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
		var path = "<input type='text' class='path' placeholder='path' value='D:/Cloud/DnD/Музыка/'>";
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
		console.log(n_fs);
		$(".tracks").css('font-size', n_fs+"px");
	});
	$("body").on("click", "#p_hide", function(){
		$(".btn.hide").each(function(){
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
		switch(eventObject.which)
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
				
			
		}
		console.log("id: "+id+" ev: "+ev);
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
	});
	// / кнопки
	
	
var auds=document.getElementsByTagName('audio');
	for (var i=0;i<auds.length;i++){
        addEvent(auds[i], 'ended', a_ended);
		//$(auds[i]).addEventListener('ended', onEndFunc);
		console.log("event added //"+i);
    }
//$("audio").addEventListener('ended', onEndFunc); // подписываем функцию
                                             // на окончание видео
//player.removeEventListener(‘ended’, onEndFunc); // отписываем функции
                                                // от окончания видео
		

}); 