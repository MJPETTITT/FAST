
// SCORM Variables declaration
var Lesson_location="";
var currentPage_location="";

//VARIABLE DECLARATION
var storageData;
var standardTop = 48;
var activeIndex = 0;
var changeIndex = 0;
var wbooksubIndex = 0;
var activeClass='dummy';
var	modNo = 1;
var	chapNo = 1;
var lesNo = 1;
var listData;
var moduleLength;
var FWBdataPassInfo;
var cur_click;
var complete_currentPage=false;
var complete_LocalPage=false;
var completestage;
var navComStage;
var wbookfield = {
	defW:80,
	animW:220,
	animSpeed:400
}
var page_navigation=[{M:"0",C:"0",L:"0"}];
var moduleArray=[];
var chapterArray=[];
var lessonArray=[];
var FWBdata;
var docInnerHeight = 0;
var isAquasil = false;
var storedNames;	
var wbookArray = [];
var aquaPopAnimPos = [9,8,7,6,10,11,12,13,14,15,0,1,2,4,3,5];
var aquasilVisitPos = 0;
var globaldefScale = 0.05;
var globalmaxscale = 0.85;
var pushWbookClass = [];
var currentPage,currentPage1;
var sailboatSpeed = 1000;
var sailboatTempo = 0.75;
var sailboatFade = 400;

//Animation variables
var fishTempo = 1.2;
var shockTempo = 2;
var leafTempo_1 = 0.80,leafTempo_2 = 0.85,leafTempo_3 = 0.86,leafTempo_4 = 0.84,leafTempo_5 = 0.82,leafTempo_6 = 0.85,leafTempo_7 = 0.88,leafTempo_8 = 0.91,leafTempo_9 = 0.94,leafTempo_10 = 0.97,leafTempo_11= 1.00,leafTempo_12 = 1.03;
var fishingTempo = 0.65;
var fish1StartTime = 15000;
var fish2StartTime = 15000;
var fish1fading = 1250;
var fish2fading = 1500;
var fish1RandomPos = [[1200,2990],[1150,2830],[1430,2970],[1160,3180],[1140,3150],[1340,2990],[1200,3160],[1360,3010],[1130,3130],[1290,3130]];
var fish2RandomPos = [[1240,520],[1040,520],[1150,430],[1410,520],[1410,590],[1210,520],[1210,710],[1650,710],[1700,730],[1510,840],[1460,630],[1600,840]];

//INITIAL SET UP
$(document).ready(function(){
	
	//LMS intialisation
	/* doLMSInitialize();
	// To get the value for lesson location
	setTimeout(function(){
		Lesson_location = doLMSGetValue("cmi.core.lesson_location");
		currentPage_location = doLMSGetValue("cmi.suspend_data")
	},100);	 */ 
	
	
	$.getJSON("./js/json/navigation.json",function(data){
		FWBdata = data;
		menuListCreation(FWBdata);		
	});
	//fetching data
	/*    storedNames = JSON.parse(localStorage.getItem('storageData'));
	  currentPage1 = JSON.parse(localStorage.getItem('currentPage'));
      console.log("storedNames",storedNames,currentPage1)  */
	 //local storage fetch
	/* setTimeout(function(){
		if(storedNames!=null)recover_data(storedNames,currentPage1);
	},120) */    
	 //scorm storege fetch
	/* setTimeout(function(){
		if(Lesson_location!='')recover_data(Lesson_location,currentPage_location);
	},120) */  

	//Scorm Data Need to Fetch to Initialize the Page
	$(".btn-continue").off('click').on('click',getStart);
	
	
	
	$("#btn_home,#btn-workbook,#btn-aquasail,#pdfDownload,.btn-close-wbook,.btn-download-pdf").hover(function(event) {
		$(this).addClass('over');
	},function (event) {
		$(this).removeClass('over');
	});
	
	$("#btn_home").off('click').on('click',menuBtnClickFun);
	$(".menu-overlay").off('click').on('click',menuBtnClickFun);
	$('.wiconbutton').on('click', wbookIcon);
	$('.wiconbutton').each(function(){
		$(this).attr('data-state',' ');
	});
	$('.wiconbutton').find('.sub-item').each(function(){
		$(this).attr('data-state',' ');
	});	
	
	$('#btn-workbook,#btn-aquasail').on('click', runWorkBook);
	$.getJSON("./js/json/wbookData.json",function(data){
		wbookArray = data;			
		$('.wiconbutton').eq(2).trigger('click');
		activeIndex = 2;
		changeIndex = 2;
	});
	//$('.wiconbutton').eq(2).attr('data-state','active');	//$('.wiconbutton').eq(2).find('.sheet-sub-holder').find('.sub-item').eq(0).css({'opacity':'1','backgroundColor':'rgb(255,255,255)','color':'#004c97'});
	//$('.wiconbutton').eq(2).find('.sheet-sub-holder').find('.sub-item').eq(0).attr('data-state','active');
	//$('#btn-workbook,#btn-aquasail').on('click', runWorkBook);
	$('.btn-close-wbook,.overlay').on('click', closeWorkBook);	
	$('.wiconbutton').on('mouseenter', showSheetBtnOverWB);
	$('.wiconbutton').on('mouseleave', showSheetBtnOutWB);
	$('.sheet-sub-holder .sub-item').on('mouseover', showOverWB);
	$('.sheet-sub-holder .sub-item').on('mouseout', showOutWB);	
	
	$('.wiconbutton').find('.sub-item').on('click', appendWbookData);
	createAquasail();
	
	disablePrevBtn();
	//disableNextBtn();
	
});

window.onload = function(){			
	docInnerHeight = $(document).innerHeight();		
	var ovrlayH = docInnerHeight-standardTop;		
	$('.overlay,.overlayAquasil,.aquasilCont').css('height',ovrlayH+"px");			
	$(window).on('resize', goWindowResize);			
	showZoomNav();	
	$('.aquasilBg').mousedown(function(e){e.preventDefault()})
}

function goWindowResize(){	
	docInnerHeight = $(document).innerHeight();
	var ovrlayH = docInnerHeight-standardTop;
	$('.overlay,.overlayAquasil,.aquasilCont').css('height',ovrlayH+"px");
	if(isAquasil) canvasResize();	
}

var getStart = function(){
	$('#btn-aquasail').removeClass('overlay-btn-highlight');
	$('#btn-workbook').removeClass('overlay-btn-highlight');
	$('#btn-aquasail').prop('disabled', false);
	$('.welcome_container').hide();
	if(Lesson_location!=''||storedNames!=null){
	//recover_data(storedNames,currentPage1);
	//recover_data(Lesson_location,currentPage_location);
	$(".page_holder").load('src/screens/m1c1/index.html');
	}else{
		$(".page_holder").load('src/screens/m1c1/index.html');
		$('#m0c0').parent().prev().trigger('click');
	}
	all_function()//option delete
}
/*----------Menu Button Click function----------*/
var menuBtnClickFun = function(){
	$('#btn_home .line-02').hasClass('line2_1') ? $('#btn_home .line-02').removeClass('line2_1') : setTimeout(function(){$('#btn_home .line-02').addClass('line2_1')},10);
	$('#btn_home .line-01').hasClass('line1_1') ? $('#btn_home .line-01').removeClass('line1_1') : setTimeout(function(){$('#btn_home .line-01').addClass('line1_1')},10);
	$('#btn_home .line-03').hasClass('line3_1') ? $('#btn_home .line-03').removeClass('line3_1') : setTimeout(function(){$('#btn_home .line-03').addClass('line3_1')},10);
	if($('.menu_wrapper').hasClass('menu_open')){
		$('.menu-overlay').hide();
		$('.menu_wrapper').removeClass('menu_open')}
	else {
		$('.menu-overlay').show();
		$('.menu_wrapper').addClass('menu_open');
	}
	if($('.overlay').css('z-index')>1)
	$('.overlay').trigger('click');
}

/*----------Menu Creation function----------*/
var menuListCreation = function(FWBdata){

	FWBdataPassInfo = FWBdata.modules;
	listData = FWBdata.modules;
	moduleLength = listData.length;
	$('.menu_wrapper').append('<button data-ui="pdfDownload" data-path="assets/pdf/workbook-download.pdf" class="btn-download-pdf clickable btn-icon">Workbook</button><img class="course-logo" src="assets/images/logo-fast-primer.svg">');
	
	$(".btn-download-pdf").hover(function(event) {
		$(this).addClass('over');
	},function (event) {
		$(this).removeClass('over');
	});
	
	$('.btn-download-pdf').off('click').on('click', function(){
		var getPath = $(this).attr('data-path');
		window.open(getPath, '_blank', 'width=1024, height=768');	
	});
	
	for(var i=0;i<moduleLength;i++){
				$('.menu_wrapper').append('<div id="module_list_'+i+'" class="module_list menu_NotClick"></div>');
				$('#module_list_'+i).append('<div id="m'+i+'" class="module'+i+' module"></div>');
				$('.menu_wrapper').append('<div id="chapter_list_'+i+'" class="chapter_list"></div>');
				$("#m"+i).html(listData[i].modName);
				$("#m"+i).css({"padding":"10px","margin-bottom":"0px"});
				$("#m"+i).css({"padding-left": "50px","text-indent":" -30px"});
		for(var j=0;j<listData[i].chapters.length;j++){
				var temp='m'+i+'c'+j;
				$('#chapter_list_'+i).append('<div id='+temp+' class="chapter'+i+' chapter subMenu_NotClick"></div>');
				$("#"+temp).html(listData[i].chapters[j].title);
				$('#chapter_list_'+i).append('<div id="lesson_list'+i+'_'+j+'" class="lesson_list"></div>');//option
			for(var k=0;k<listData[i].chapters[j].lessons.length;k++){
				var temp='m'+i+'c'+j+'l'+k;
				$('#lesson_list'+i+'_'+j).append('<div id='+temp+' class="lesson"></div>');
				$("#"+temp).html(listData[i].chapters[j].lessons[k].title);	
				$('#lesson_list'+i+'_'+j).prev().css({"padding-left":"60px","color":"#00a3ad"}).addClass('lessonHead lessonHead'+i+'_'+j);
			}
		}
		
	}
	$('.lesson_list').each(function(i,v){
		if($(this).children().length==0)
		{$(this).remove()} 
	})
	
	$('.chapter_list').hide();
	$('.lesson_list').hide();
	
	$(".module_list").eq(modNo-1).removeClass("menu_NotClick").addClass('menu_Clickable');

	$("#chapter_list_"+(modNo-1)).find('.chapter').eq(chapNo-1).removeClass("subMenu_NotClick").addClass('subMenu_Clickable').addClass('completed current_screen');
	$("#chapter_list_"+(modNo-1)).find('.chapter').eq(chapNo-1).addClass('completed');
	$("#chapter_list_"+(modNo-1)).find('.chapter').eq(chapNo).removeClass("subMenu_NotClick").addClass('subMenu_Clickable');  
	hoverClassSetFun();	
	$('.menuListCont').show();//option
	
/*----------Menu Heading Click function----------*/
	$(".menu_Clickable").off('click').on('click',menuClickFun);
	$(".prevBtn_clickable").off('click').on('click',nav_prevClkFun);
	$(".nextBtn_clickable").off('click').on('click',nav_nextClkFun);
}
function all_function(){
	//$("#chapter_list_"+(modNo-1)).find('.chapter').removeClass("subMenu_NotClick").addClass('subMenu_Clickable');//option
	$(".chapter_list").find('.chapter').removeClass("subMenu_NotClick").addClass('subMenu_Clickable');//option
	$(".lesson_list").find('.lesson').removeClass("lesson_NotClick").addClass('lesson_Clickable');//option 
	$(".module_list").removeClass("menu_NotClick").addClass('menu_Clickable');//option 
	$(".menu_Clickable").off('click').on('click',menuClickFun);
	$(".subMenu_Clickable").off('click').on('click',subMenuClickFun);
	hoverClassSetFun();	
}
var menuClickFun = function(e){
	e.stopImmediatePropagation();

	/* //option delete start//
	
	if($(this).attr('id')=='module_list_1')
	{
		$(".module_list").eq(modNo).addClass("menu_NotClick").removeClass('menu_Clickable');
		$(".module1 ").removeClass('menuHoverClass');//option delete
		return;
	}
	//option delete end// */
		cur_click = $(this).attr('id').split('_')[2];
		if($(this).next().css('display')!='block')
		$('.chapter_list').hide();
		$('#chapter_list_'+cur_click).toggle();//option
		$(".menu_Clickable").removeClass('subMenuOpened');
		$(this).addClass('subMenuOpened');
		//$(this).toggleClass('subMenuOpened');
		hoverClassSetFun();	
		$(".subMenu_Clickable").off('click').on('click',subMenuClickFun);		
		return false;		
}

var subMenuClickFun = function(e){
	e.stopImmediatePropagation();	
	if($(this).next().hasClass('lesson_list')){
		if($(this).next().css('display')!='block')
		$(".lesson_list").hide();
		$(this).next().toggle();
		$(".lesson_Clickable").off('click').on('click',lessonClickFun);
	}
	else{
	var cur_click = $(this).attr('id');//.split('_')[2];
		var target_Id = $(this).attr('id').match(/[\d\.]+|\D+/g);	//alternate
		var moduleNo = target_Id[1];
		var scrNo = target_Id[3];
		moduleNo = Number(moduleNo)+1;
		scrNo = Number(scrNo)+1;
		modNo = moduleNo;
		chapNo = scrNo; 
		$('.subMenu_Clickable').removeClass('current_screen');
		$(this).addClass('current_screen');
		$('#btn-aquasail').removeClass('overlay-btn-highlight');
		$('#btn-workbook').removeClass('overlay-btn-highlight');
		$('#btn-aquasail').prop('disabled', false);
		$('.zoompan').css('display','none');
		$(".page_holder").empty();
		$(".page_holder").load('src/screens/m'+modNo+'c'+chapNo+'/index.html');
		if(!listData[modNo-1].chapters[chapNo-1].StepsCompleted) disableNextBtn();
		else enableNextBtn();
		
		currentPage='m'+modNo+'c'+chapNo;
		current_page_load();
	}	
	if(!$(this).hasClass('lessonHead'))menuBtnClickFun();	
	$('#audiobg').remove();	
	return false;
}

var lessonClickFun = function(e){
	e.stopImmediatePropagation();
		var cur_click = $(this).attr('id');//.split('_')[2];
		var target_Id = $(this).attr('id').match(/[\d\.]+|\D+/g);	//alternate
		var moduleNo = target_Id[1];
		var scrNo = target_Id[3];
		var lesScrNo = target_Id[5];
		moduleNo = Number(moduleNo)+1;
		scrNo = Number(scrNo)+1;
		lesScrNo = Number(lesScrNo)+1;
		modNo = moduleNo;
		chapNo = scrNo; 
		lesNo =	lesScrNo;
		$('.lesson_Clickable').removeClass('current_screen');
		$(this).addClass('current_screen');
		$('#btn-aquasail').removeClass('overlay-btn-highlight');
		$('#btn-workbook').removeClass('overlay-btn-highlight');
		$('#btn-aquasail').prop('disabled', false);
		$('.zoompan').css('display','none');
		$(".page_holder").empty();
		$(".page_holder").load('src/screens/m'+modNo+'c'+chapNo+'l'+lesNo+'/index.html');
		if(!listData[modNo-1].chapters[chapNo-1].lessons[lesNo-1].StepsCompleted) disableNextBtn();
		else enableNextBtn();
		
		menuBtnClickFun();
		currentPage='m'+modNo+'c'+chapNo+'l'+lesNo;
		current_page_load();
		$('#audiobg').remove();	
		return false;
}

var hoverClassSetFun = function(){

	$('.module,.chapter,.lesson').removeClass('menuHoverClass');
	$('.menu_Clickable').each(function(k,v){
		 $('#module_list_'+k).hasClass('subMenuOpened') ? $('#module_list_'+k).children().removeClass('menuHoverClass') :  $('#module_list_'+k).children().addClass('menuHoverClass');
	});
	$('.subMenu_Clickable').addClass('menuHoverClass');
	$('.subMenu_Clickable').each(function(i,v){
		if($('.subMenu_Clickable').eq(i).next().hasClass('lesson_list'))
		{$('.lesson_list').prev().removeClass('menuHoverClass');}
	})
	$('.lesson_Clickable').addClass('menuHoverClass');
}


var nav_prevClkFun = function(e){
	e.stopImmediatePropagation();
	isAquasil = false;
	$('#audiobg').remove();
	$('.zoompan').css('display','none');
		if(!lesNo == 0 && lesNo > 1){
				lesNo = Number(lesNo) - 1;
		}
		else if(!chapNo == 0 && chapNo > 1){
			chapNo = Number(chapNo) - 1;
			var lesChildLength = FWBdataPassInfo[modNo-1].chapters[chapNo-1].lessons.length;
			lesNo =lesChildLength;
			//console.log('lesNo1 '+lesNo)
		}else if(modNo == 1 && chapNo == 1 ){
			
			return true;
		}else{
			if(!modNo == 0 && modNo > 1){
				modNo = Number(modNo) - 1;
			}else{
				modNo = modNo;
			}
		
			var subChildLength = FWBdataPassInfo[modNo-1].chapters.length;
			var lesChildLength1 = FWBdataPassInfo[modNo-1].chapters[chapNo-1].lessons.length;
			chapNo = subChildLength;
			lesNo =FWBdataPassInfo[modNo-1].chapters[chapNo-1].lessons.length;			
			
			
		}
		
		if(modNo == 1 && chapNo == 1 ){disablePrevBtn();}
	$(".page_holder").empty();
	$('.chapter').removeClass('current_screen');
	$('.lesson').removeClass('current_screen');
	//console.log('m'+modNo+'c'+chapNo+'l'+lesNo)
	if($("#m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo-1)).parent().hasClass('lesson_list')||$("#m"+(modNo-1)+"c"+(chapNo-1)).hasClass('lessonHead'+(modNo-1)+'_'+(chapNo-1))){
		$(".page_holder").load('src/screens/m'+modNo+'c'+chapNo+'l'+lesNo+'/index.html');
		$("#m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo-1)).addClass('current_screen');
		currentPage='m'+modNo+'c'+chapNo+'l'+lesNo;
	}
	else{
		$(".page_holder").load('src/screens/m'+modNo+'c'+chapNo+'/index.html');
		$("#m"+(modNo-1)+"c"+(chapNo-1)).addClass('current_screen');
		currentPage='m'+modNo+'c'+chapNo;
	}
	$('#btn-aquasail').removeClass('overlay-btn-highlight');
	$('#btn-workbook').removeClass('overlay-btn-highlight');
	
	$('#btn-aquasail').prop('disabled', false);
	$("#nav_nextBtn").removeClass('nextBtn_notClickable').addClass('nextBtn_clickable');
	if($('.menu_wrapper').hasClass('menu_open'))menuBtnClickFun();
		
		 if($("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass('lesson_list')){
			$('.lesson_list').css('display','none');
			$("#m"+(modNo-1)+"c"+(chapNo-1)).trigger('click');
		}
		current_page_load();
}

var nav_nextClkFun = function(e){
	e.stopImmediatePropagation();
	isAquasil = false;
	$('.zoompan').css('display','none');
	$('#audiobg').remove();
	enablePrevBtn();
	var subChildLength = FWBdataPassInfo[modNo-1].chapters.length;
	var lesChildLength = FWBdataPassInfo[modNo-1].chapters[chapNo-1].lessons.length;
	if(lesChildLength > 0)complete_currentPage=listData[modNo-1].chapters[chapNo-1].lessons[lesNo-1].StepsCompleted
	else complete_currentPage=listData[modNo-1].chapters[chapNo-1].StepsCompleted;
	if(complete_currentPage)
	{
		e.stopImmediatePropagation();
		top_navigation();
		var subChildLength = FWBdataPassInfo[modNo-1].chapters.length;
		var lesChildLength = FWBdataPassInfo[modNo-1].chapters[chapNo-1].lessons.length;
		if(!lesNo == 0 && lesNo < lesChildLength){
				lesNo = Number(lesNo) + 1;
			}
		else if(!chapNo == 0 && chapNo < subChildLength){
			chapNo = Number(chapNo) + 1;
			lesNo =1;
		}else if(modNo == moduleLength && chapNo == subChildLength ){
			disableNextBtn();
			return true;
		}else{
			if(!modNo == 0 && modNo > moduleLength){
				modNo = modNo;
			}else{
				modNo = Number(modNo) + 1;
			}
			chapNo = 1;
			lesNo =1;
			
		}
		hoverClassSetFun();
		/* //option delete start
		if(modNo==2)return;
		//option delete end */
		$(".page_holder").empty();
		$('.chapter').removeClass('current_screen');
		$('.lesson').removeClass('current_screen');
		
		if($("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass('lesson_list')){
			$("#m"+(modNo-1)+"c"+(chapNo-1)).next().show()
			$(".page_holder").load('src/screens/m'+modNo+'c'+chapNo+'l'+lesNo+'/index.html');
			$("#m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo-1)).removeClass("lesson_NotClick").addClass('lesson_Clickable').addClass('current_screen');
			if(!listData[modNo-1].chapters[chapNo-1].lessons[lesNo-1].StepsCompleted)disableNextBtn();
			
			currentPage='m'+modNo+'c'+chapNo+'l'+lesNo;

		}
		else{
			$(".page_holder").load('src/screens/m'+modNo+'c'+chapNo+'/index.html');
			$("#m"+(modNo-1)+"c"+(chapNo-1)).removeClass("subMenu_NotClick").addClass('subMenu_Clickable').addClass('current_screen');
			if(!listData[modNo-1].chapters[chapNo-1].StepsCompleted)disableNextBtn();
			currentPage='m'+modNo+'c'+chapNo;
		}
		$('#btn-aquasail').removeClass('overlay-btn-highlight');
		$('#btn-workbook').removeClass('overlay-btn-highlight');
		$('#btn-aquasail').prop('disabled', false);
		
	}
	if($('.menu_wrapper').hasClass('menu_open'))menuBtnClickFun();
	//console.log('$("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass("lesson_list")',$("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass('lesson_list'))
	if($("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass('lesson_list')){
		$('.lesson_list').css('display','none');
		$("#m"+(modNo-1)+"c"+(chapNo-1)).trigger('click');
	} 	 
	current_page_load();
}

var enablePrevBtn = function(){
	$("#nav_prevBtn").removeClass('prevBtn_notClickable').addClass('prevBtn_clickable');
	$(".prevBtn_clickable").off('click').on('click',nav_prevClkFun);
}
var disablePrevBtn = function(){
	$("#nav_prevBtn").removeClass('prevBtn_clickable').addClass('prevBtn_notClickable');
}

var disableNextBtn = function(){
	$("#nav_nextBtn").removeClass('nextBtn_clickable').addClass('nextBtn_notClickable');
	$(".nextBtn_clickable").off('click')//.on('click',nav_nextClkFun);
}
var setData;
var complete_page = function(){	
	var getCurrentPage;
	if($("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass('lesson_list')){
		if(!$("#m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo-1)).hasClass('completed'))
		{setData="m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo-1);}

		$("#m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo-1)).addClass('completed');
		getCurrentPage = "m"+modNo+"c"+chapNo+"l"+lesNo;
	}
	else{ 
		if(!$("#m"+(modNo-1)+"c"+(chapNo-1)).hasClass('completed'))
		{setData="m"+(modNo-1)+"c"+(chapNo-1);}
	
		$("#m"+(modNo-1)+"c"+(chapNo-1)).addClass('completed');
		getCurrentPage = "m"+modNo+"c"+chapNo;
	}
	
	var aquapos = Number($('.aquasail').attr('data-position'));
	var wbboklen = pushWbookClass.length;
	var setDataFirst = setData.split("_")[0];
	setData = setDataFirst+'_a'+aquapos+'w'+wbboklen;
	$('.aquasail').attr('data-position');
		
	var findPos = $.inArray(getCurrentPage,lessonNav);
	var lesChildLength = FWBdataPassInfo[modNo-1].chapters[chapNo-1].lessons.length;
	if(lesChildLength > 0)complete_LocalPage=listData[modNo-1].chapters[chapNo-1].lessons[lesNo-1].StepsCompleted
	else complete_LocalPage=listData[modNo-1].chapters[chapNo-1].StepsCompleted;
	if(complete_LocalPage)
	{
		if(findPos != -1){
			console.log(scorePos[getCurrentPage]);
		}
	}
	//local storege
	/*   localStorage.setItem('storageData', JSON.stringify(setData));   */
	
	//scorm storege
	/* doLMSSetValue("cmi.core.lesson_location", setData);
	doLMSCommit();  */
}

var lessonNav = ["m3c1l7","m3c2l15","m3c3l9","m3c4l10","m4c12","m5c15","m6c1l6","m6c3l2","m6c4l13","m7c12"];
var scorePos = {
	"m3c1l7":"10",
	"m3c2l15":"20",
	"m3c3l9":"30",
	"m3c4l10":"40",
	"m4c12":"50",
	"m5c15":"60",
	"m6c1l6":"70",
	"m6c3l2":"80",
	"m6c4l13":"90",
	"m7c12":"100"
}
var enableNextBtn = function(){
	var subChildLength = FWBdataPassInfo[modNo-1].chapters.length;
	var lesChildLength = FWBdataPassInfo[modNo-1].chapters[chapNo-1].lessons.length;
	$("#nav_nextBtn").removeClass('nextBtn_notClickable').addClass('nextBtn_clickable');
	$(".nextBtn_clickable").off('click').on('click',nav_nextClkFun);
	if(lesChildLength > 0)listData[modNo-1].chapters[chapNo-1].lessons[lesNo-1].StepsCompleted=true;
	else listData[modNo-1].chapters[chapNo-1].StepsCompleted=true;
	if(lesChildLength!=lesNo && lesNo < lesChildLength){
		$("#m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo)).removeClass("lesson_NotClick").addClass('lesson_Clickable');
		
	}
	else if(subChildLength!=chapNo){
		$("#m"+(modNo-1)+"c"+(chapNo)).removeClass("subMenu_NotClick").addClass('subMenu_Clickable');
		$("#m"+(modNo-1)+"c"+(chapNo)+"l"+(0)).removeClass("lesson_NotClick").addClass('lesson_Clickable');
		
	}
	else{
	
		$(".module_list").eq(modNo).removeClass("menu_NotClick").addClass('menu_Clickable');
		$(".module").eq(modNo-1).addClass('completed');
		$("#m"+(modNo)+"c"+(0)).removeClass("subMenu_NotClick").addClass('subMenu_Clickable');

		$(".menu_Clickable").off('click').on('click',menuClickFun);
		$(".lessonHead"+(modNo)+"_"+(lesNo-1)).removeClass("subMenu_NotClick").addClass('subMenu_Clickable');
	
		$("#m"+(modNo)+"c"+(lesNo-1)+"l"+(0)).removeClass("lesson_NotClick").addClass('lesson_Clickable');

	}
	//console.log("complete:: "+modNo+" :: "+chapNo);
	hoverClassSetFun();	
	$(".subMenu_Clickable").off('click').on('click',subMenuClickFun);
	$(".lesson_Clickable").off('click').on('click',lessonClickFun);
	top_navigation();
}

var loadstart = false;
function current_page_load(){
	//console.log('m'+modNo+'c'+chapNo+'l'+lesNo)
	/* doLMSSetValue("cmi.suspend_data", currentPage);
	doLMSCommit();*/
	/* localStorage.setItem('currentPage', JSON.stringify(currentPage));	 */
	if(typeof(rightSprite) != 'undefined') stopSprite();
	if(typeof stopAssembly === 'function'){
		stopAssembly();
	}	
	if(typeof fishAnimation1 === 'function'){
		$('#fish_1').clearQueue();
		$('#fish_1').stop();
	}
	if(typeof fishAnimation2 === 'function'){
		$('#fish_2').clearQueue();
		$('#fish_2').stop();
	}
	if(loadstart) {
		  // if($("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass('lesson_list')){
			// $('.lesson_list').css('display','none');
			// $("#m"+(modNo-1)+"c"+(chapNo-1)).trigger('click');
			// } 
		setTimeout(function(){	
			if($('#chapter_list_'+(modNo-1)).css('display') == 'none')  $("#module_list_"+(modNo-1)).trigger('click');	
		},10)
	}
	loadstart = true;
	if($('.overlay').css('z-index')>1)
	$('.overlay').trigger('click'); 
}
/*----------------WORK BOOK POP UP----------------*/
var wbookIcon = function(){	
	var ctClick = $(this);	
	if(ctClick.index() != activeIndex){	
		$('.wiconbutton').each(function(){
			$(this).attr('data-state',' ');		
		});
		$('.wiconbutton').find('.sub-item').each(function(){
			$(this).attr('data-state',' ');
			$(this).css({color:'#fff',backgroundColor:'rgb(0,0,0,0)',opacity:0.5});
		});	
		ctClick.css({backgroundColor:'rgb(0,0,0,0)'});
		$('.wiconbutton').eq(ctClick.index()).attr('data-state','active');
		$('.wiconbutton').eq(ctClick.index()).find('.sheet-sub-holder').find('.sub-item').eq(0).attr('data-state','active');		
		$('.workbook-viewer').empty();			
		$('.workbook-viewer').html(wbookArray.woorkbookData['workbook'+ctClick.index()+'_child0']);
		$.each(pushWbookClass, function(ind, elem){		
			$('.'+elem).css('visibility','visible');
		});
		$('.workbook-viewer').children().css('display','none').fadeIn(500,function(){
			
		});	
		$('.workbook-viewer').scrollTop(0);
		
		$('.wiconbutton').eq(activeIndex).stop().animate({width:wbookfield.defW},200, function(){
			ctClick.css({backgroundColor:'rgb(0,0,0,0)'});
			//ctClick.find('.sheet-sub-holder').css('opacity',0.5);
			ctClick.stop().animate({width:wbookfield.animW},wbookfield.animSpeed);
			$('.wiconbutton').eq(activeIndex).find('.sheet-sub-holder').find('.sub-item').eq(0).css({'opacity':'1','background':'#fff','color':'#004c97'})
		});	
	}	
	activeIndex = ctClick.index();
	changeIndex = activeIndex;	
}

var setAquasailState = function(){
	$('.item-holder').css('display','none');	
	$('.item-holder').each(function(){
		$(this).removeClass('open');					
	});
}

var runWorkBook = function(){
	if($('.menu_wrapper').hasClass('menu_open'))menuBtnClickFun();
	setAquasailState();	
	$('.overlay').css('z-index','15')
	var clickedClass = $(this).attr('data-class');
	var deactiveClass = (clickedClass == "innerWorkbook")?'aquasail':'innerWorkbook';
	
	if(activeClass != clickedClass){		
		$('.'+deactiveClass).css({'display':'none'});	
		$('.overlay').css('background','none');			
		$('.'+deactiveClass).stop().animate({  textIndent:0 }, {
			step: function(now,fx) {
			  $(this).css('transform','scale('+now+')'); 
			},
		duration:0,easing:'easeOutExpo'});
	}	
	$('.'+clickedClass).css('display','block');
	var scaleval = Number($('.'+clickedClass).css('transform').split('(')[1].split(')')[0].split(',')[0]);
	var setScale = (scaleval > 0.0)?0.0:1;
	var setColor = (scaleval > 0.0)?'rgba(0,0,0,0)':'rgba(162, 162, 162, 0.9)';		
	if(clickedClass == 'innerWorkbook'){			
		if(activeIndex != changeIndex){
			$('.wiconbutton').eq(changeIndex).trigger('click');
			var setTime = window.setTimeout(function(){
				$('.wiconbutton').eq(changeIndex).find('.sub-item').eq(wbooksubIndex).trigger('click');						
				window.clearTimeout(setTime);
			},320);
		}
	}	
	$('.'+clickedClass).stop();
	$('.'+clickedClass).clearQueue();	
	$('.overlay').stop().animate({backgroundColor:setColor},300);		
	$('.'+clickedClass).stop().animate({  textIndent:setScale }, {
    step: function(now,fx) {
		$(this).css('transform','scale('+now+')');					
    },
    duration:700,easing:'easeOutExpo',complete:function(){
		if(activeSetColor!=null) {
			$('.item-holder').eq(getIndex).find('.minus').css('height','16px').css('background-color',activeSetColor);
		}
				
		if(setScale == 0) {$('.overlay').css('z-index','0');}	
		if((activeClass == "aquasail") && (setScale >= 1)){				
			for(var i=0;i<aquaPopAnimPos.length;i++){
				$('.item-holder').eq(aquaPopAnimPos[i]).css('display','none');
				$('.item-holder').eq(aquaPopAnimPos[i]).stop().delay(i*60).fadeIn(150);
			}
		}		
		$.each(pushWbookClass, function(ind, elem){			
			$('.'+elem).css('visibility','visible');
		});	
	}
	});	
	activeClass = clickedClass;	
}

var closeWorkBook = function(e){
	if (e.target !== this) return;
	$('.overlay').stop().animate({backgroundColor:'rgba(0,0,0,0)'}, 300, function(){
		$('.overlay').css('z-index','0');			
	});
	$('.'+activeClass).stop().animate({  textIndent:0 }, {
    step: function(now,fx) {
		$(this).css('transform','scale('+now+')');		
    },
    duration:600,easing:'easeOutExpo'});
}

var showSheetBtnOverWB = function(e){
	e.stopPropagation();
	var actChild = $(this); 	
	var checkState = actChild.attr('data-state');		
	if(checkState != 'active'){
		actChild.clearQueue();
		actChild.stop().animate({backgroundColor:'rgb(255,255,255,0.3)'}, 250);
	}
}

var showSheetBtnOutWB = function(e){
	e.stopPropagation();
	var actChild = $(this); 
	var checkState = $(this).attr('data-state');
	if(checkState != 'active'){		
		actChild.animate({backgroundColor:'rgb(0,0,0,0)'}, 80);
	}
}

var showOverWB = function(){
	var checkState = $(this).attr('data-state');
	if(checkState != 'active'){
		$(this).stop().animate({color:'#004c97',backgroundColor:'rgb(255,255,255,1)',opacity:1}, 250);
	}
}

var showOutWB = function(){
	var checkState = $(this).attr('data-state');
	if(checkState != 'active'){
		$(this).stop().animate({color:'#fff',backgroundColor:'rgb(0,0,0,0)',opacity:0.5}, 100);
	}
}

var appendWbookData = function(){
	var getIndex = $(this).index();
	$('.workbook-viewer').empty();		
	$('.workbook-viewer').html(wbookArray.woorkbookData['workbook'+activeIndex+'_child'+getIndex+'']);
	$.each(pushWbookClass, function(ind, elem){		
		$('.'+elem).css('visibility','visible');
	});	
	$('.workbook-viewer').children().css('display','none').fadeIn(500, function(){		
		
	});
	$(this).closest('.wiconbutton').find('.sub-item').each(function(){
		$(this).attr('data-state',' ');
		$(this).css({color:'#fff',backgroundColor:'rgb(0,0,0,0)',opacity:0.5});
	});	
	$('.workbook-viewer').scrollTop(0);
	$(this).attr('data-state','active');
	$(this).css({color:'#004c97',backgroundColor:'rgb(255,255,255,1)',opacity:1});
}

var createAquasail = function(){
	$('.hotspot-holder').empty();
	for(var i=0;i<Object.keys(aquaLegends).length;i++)
		{
			var legObj = Object.keys(aquaLegends)[i];
			var lbl = aquaLegends[legObj].txt;				
			$('.hotspot-holder').append('<div data-ui="item" style="z-index:'+(i+1)+'" data-color="#981d97" class="item-holder clickable global" data-index="0" data-label="'+lbl+'"><div class="item-icon"><span class="plus"></span><span class="minus"></span></div><h4 class="item-label-closed">'+lbl+'</h4><div class="item-content"><h4 class="item-label">'+lbl+'</h4><div class="total-holder"> <span class="total-label"> TOTAL: </span><span class="total-value">0</span></div></div></div>');			
			if(lbl == 'Customers' || lbl == 'Finished Goods Warehouse'){				
				$('.total-holder').eq(i).find('.total-value').text('0 boats');
			}
		}
	$('.item-holder[data-label="Post-it"]').remove();	
	$(".item-holder").hover(function(event) {
		var setColor = $(this).attr('data-color');	
		$(this).addClass('over');
		$(this).not('.open').find('.item-icon').children().stop().animate({backgroundColor:'#fff'}, 300);
		$(this).not('.open').find('.item-icon').css('background-color', setColor);
	},function (event) {
		var setColor = $(this).attr('data-color');		
		$(this).removeClass('over');		
		$(this).not('.open').find('.item-icon').children().stop().animate({backgroundColor:setColor}, 300);
		$(this).not('.open').find('.item-icon').css('background-color','#fff');
	});
	$(".item-holder").off('click').on('click', activeAquaPop);
}

var activeSetColor = null;
var getIndex = null;
var activeAquaPop = function(){
	var ctElem = $(this);
	var setColor = ctElem.attr('data-color');
	if(!ctElem.hasClass('open')){
		if(activeSetColor!=null) {
			$('.item-holder').eq(getIndex).find('.minus').css('height','16px').css('background-color',activeSetColor);
		}
		ctElem.find('.total-holder').css('display','block');
		$('.item-holder').removeClass('open');				
		ctElem.addClass('open');
		ctElem.find('.item-icon').find('.plus').stop().animate({backgroundColor:setColor},300);
		ctElem.find('.item-icon').css('background-color','#fff');			
		ctElem.find('.item-icon').find('.minus').css('height','0px');
		activeSetColor = setColor;
		getIndex = ctElem.index();
	}
	else{	
		ctElem.find('.total-holder').css('display','none');
		ctElem.removeClass('open');	
		ctElem.find('.item-icon').css('background-color',setColor);		
		ctElem.find('.item-icon').children().animate({backgroundColor:'#fff'},300);
		ctElem.find('.item-icon').find('.minus').css('height','16px');
	}		
}

function rgb2hex(rgb) {
     if (  rgb.search("rgb") == -1 ) {
          return rgb;
     } else {
          rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
          function hex(x) {
               return ("0" + parseInt(x).toString(16)).slice(-2);
          }
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
     }
}

function top_navigation()
	{
		//console.log($("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass('lesson_list'))
		if($("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass('lesson_list')){
			$("#lesson_list"+(modNo-1)+"_"+(chapNo-1)).find('.lesson').each(function(i){
					if($(this).hasClass('completed'))completestage=true;
					else completestage=false;
			})
			if(completestage){
				$("#m"+(modNo-1)+"c"+(chapNo-1)).addClass('completed');
				$("#n"+modNo+"_"+chapNo).removeClass('in-progress').addClass('complete');
				$("#lesson_list"+(modNo-1)+"_"+(chapNo-1)).next().length==0?$("#n"+(modNo+1)).addClass('in-progress').removeClass('incomplete'):$("#n"+(modNo)+"_"+(chapNo+1)).addClass('in-progress').removeClass('incomplete');
			}

		}
		else{
			$("#chapter_list_"+(modNo-1)).find('.chapter').each(function(i){
				if($(this).hasClass('completed'))completestage=true;
				else completestage=false;
			}) 
			if(completestage)
			{
				$("#n"+modNo).removeClass('in-progress').addClass('complete');
				//$("#m"+(modNo-1)+"c"+(chapNo-1)).next().length==0?$("#n"+(modNo+1)+"_"+(lesNo)).addClass('in-progress').removeClass('incomplete'):$("#n"+(modNo+1)).addClass('in-progress').removeClass('incomplete');
				//$("#m"+(modNo)+"c"+(chapNo-1)).next().length==0?$("#n"+(modNo+1)).addClass('in-progress').removeClass('incomplete'):$("#n"+(modNo+1)+"_"+(lesNo)).addClass('in-progress').removeClass('incomplete');
				
				if($("#m"+(modNo-1)+"c"+(chapNo-1)).next().length==0)
				{$(".n"+(modNo+1)).eq(0).addClass('in-progress').removeClass('incomplete')}
				
				//console.log(modNo,chapNo,lesNo,$("#m"+(modNo-1)+"c"+(chapNo-1)).next().length==0)
			}	
		}
		if(completestage)
		{
			 $("#progress .section").each(function(i){
				$('#s'+(i+1)+' .sub-section').each(function(j){
					if($(this).hasClass('complete'))navComStage=true;
					else navComStage=false;	
				}); 
				if(navComStage)
				{
					$('#s'+(i+1)+' .completion').show();
					$('#s'+(i+1)).removeClass('incomplete').addClass('complete');
				}	
			})
			 $("#progress .section").eq(modNo-1).find('.sub-section').each(function(i){
				if($(this).hasClass('complete'))navComStage=true;
				else navComStage=false;	
			}) 
			if(navComStage)$("#progress .section .completion").eq(modNo-1).show(); //enable 
		}
}
function recover_data(data,CPage)
{
	//$('.welcome_container').hide();
	var split_data=data.split("_");
	var split1 = data.split("_")[1];
	var Id = split_data[0].match(/[\d\.]+|\D+/g);
	var moduleNo = Id[1];
	var scrNo = Id[3];
	var lesScrNo = Id[5];	
	var aqua_id=split1.match(/[\d\.]+|\D+/g);
	aquasilVisitPos = aqua_id[1];
	if(aquasilVisitPos > 0) setRecentAquasail();
	
	var work_id=aqua_id[3];
	for(var i=0;i<work_id;i++){
		pushWbookClass[i] = 'showData_'+i;
	}
	
	//console.log(pushWbookClass,data,CPage)
	
	//lesScrNo=isNaN(lesScrNo)?lesScrNo=0:lesScrNo;
	//console.log("lesScrNo",lesScrNo)
	moduleNo = Number(moduleNo)+1;
	scrNo = Number(scrNo)+1;
	lesScrNo = Number(lesScrNo)+1;
	modNo = moduleNo;
	chapNo = scrNo; 
	lesNo =	lesScrNo;
	//console.log(Id,modNo,chapNo,lesNo)
	for(var i=0;i<modNo;i++){
		$(".module_list").eq(i).removeClass("menu_NotClick").addClass('menu_Clickable');
		for(var j=0;j<chapNo;j++){
			if(i<(modNo-1))
			{	
				$("#module_list_"+i).removeClass("menu_NotClick").addClass('menu_Clickable');
				$("#module_list_"+i).find('.module').addClass('completed');
				$("#chapter_list_"+i).find('.chapter').removeClass("subMenu_NotClick").addClass('subMenu_Clickable').addClass('completed');
				$("#chapter_list_"+i).find('.chapter').next().find('.lesson').removeClass("lesson_NotClick").addClass('lesson_Clickable').addClass('completed');
			}
			$('.subMenu_Clickable').removeClass('current_screen');		
			$("#chapter_list_"+i).find('.chapter').eq(j).removeClass("subMenu_NotClick").addClass('subMenu_Clickable').addClass('current_screen');
			if($("#m"+(modNo-1)+"c"+(chapNo-1)).next().hasClass('lesson_list'))
			{$("#m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo-1)).addClass('completed');}
			else 
			{$("#chapter_list_"+i).find('.chapter').eq(j).addClass('completed');}
			for(var k=0;k<lesNo;k++){
				if(i<(modNo-1)&&j<(chapNo-1)){
					$("#chapter_list_"+(modNo-1)).find('.chapter').eq(j).removeClass("subMenu_NotClick").addClass('subMenu_Clickable').addClass('completed');
					$("#lesson_list"+(modNo-1)+'_'+j).find('.lesson').removeClass("lesson_NotClick").addClass('lesson_Clickable').addClass('completed');
				}
				$('.lesson_Clickable').removeClass('current_screen');
				$("#lesson_list"+i+'_'+j).find('.lesson').eq(k).removeClass("lesson_NotClick").addClass('lesson_Clickable').addClass('completed current_screen');
			}
		} 
	}
	hoverClassSetFun();
	$(".menu_Clickable").off('click').on('click',menuClickFun);
	
	

	if($("#m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo-1)).parent().hasClass('lesson_list')||$("#m"+(modNo-1)+"c"+(chapNo-1)).hasClass('lessonHead'+(modNo-1)+'_'+(chapNo-1))){
		//$(".page_holder").load('src/screens/m'+modNo+'c'+chapNo+'l'+lesNo+'/index.html');
		setData="m"+(modNo-1)+"c"+(chapNo-1)+"l"+(lesNo-1);
	}
	else{
		//$(".page_holder").load('src/screens/m'+modNo+'c'+chapNo+'/index.html');
		setData="m"+(modNo-1)+"c"+(chapNo-1);
	} 
	
	enablePrevBtn();
	enableNextBtn();
	
			//fetch StepsCompleted
			var modtest=modNo-1;
			var chptest=chapNo-1;
			var lestest=lesNo-1;
			var trunc=isNaN(lestest)?false:true;
			//var lesNo=isNaN(lestest)?lesNo=0:lesNo;
	if(isNaN(lesNo)){lesNo=0}
			StepComplet();
			function StepComplet(){
				for(var i=0;i<=modtest;i++){
					var temp;
					for(var j=0;j<listData[i].chapters.length;j++){
							temp='m'+i+'c'+j;
							if (!trunc){
								if (temp =='m'+modtest+'c'+chptest){
									listData[i].chapters[j].StepsCompleted=true;
									return;
								}
							}
						for(var k=0;k<listData[i].chapters[j].lessons.length;k++){
							temp='m'+i+'c'+j+'l'+k;
							listData[i].chapters[j].lessons[k].StepsCompleted=true;
							if (temp =='m'+modtest+'c'+chptest+'l'+lestest){
								return;
							}
						}
						listData[i].chapters[j].StepsCompleted=true;
					}
				}
			}
		//navigation-fill
		for(var i=1;i<=modNo;i++){
		
			for(var j=1;j<chapNo;j++){
			
				$("#n"+i+"_"+j).removeClass('in-progress').addClass('complete');
			}
			if($("#n"+modNo).parent().attr('id')=='s3'||$("#n"+modNo+"_"+chapNo).parent().attr('id')=='s4')
			{
				$("#s2").find(".les_sec").removeClass('in-progress').addClass('complete');
			}else if($("#n"+modNo).parent().attr('id')=='s5')
			{
				$("#s4,#s2").find(".les_sec").removeClass('in-progress').addClass('complete');
			}

			 if($("#m"+(modNo-1)+"c"+(chapNo-1)).next().length==0)
				$("#n"+(i+1)+"_1").addClass('in-progress').removeClass('incomplete');
			else 
				$("#n"+i+"_"+j).addClass('in-progress').removeClass('incomplete');
			$("#n"+(i-1)).removeClass('in-progress').addClass('complete');
			$("#n"+(i)).addClass('in-progress').removeClass('incomplete');

		}
		//navigation-Tick
			$("#progress .section").each(function(i){
				$('#s'+(i+1)+' .sub-section').each(function(j){
					if($(this).hasClass('complete'))navComStage=true;
					else navComStage=false;	
				}); 
				if(navComStage)
				{
					$('#s'+(i+1)+' .completion').show();
					$('#s'+(i+1)).removeClass('incomplete').addClass('complete');
				}	
			})
			 $("#progress .section").eq(modNo-1).find('.sub-section').each(function(i){
				if($(this).hasClass('complete'))navComStage=true;
				else navComStage=false;	
			}) 
			if(navComStage)$("#progress .section .completion").eq(modNo-1).show(); //enable 
		//option delete start//
		if(modNo==5){
		$(".module_list").eq(modNo).addClass("menu_NotClick").removeClass('menu_Clickable');//option delete
		$(".module1 ").removeClass('menuHoverClass');//option delete  
		}
		//option delete end//
			
			
		//Current Page Loading start//
		
		var pag = CPage.match(/[\d\.]+|\D+/g);
		var cmoduleNo = pag[1]-1;
		var cscrNo = pag[3]-1;
		var clesScrNo = pag[5]-1;
		var clesScrNo1=isNaN(clesScrNo)?true:false;
		//console.log(cmoduleNo,cscrNo,clesScrNo)
	
		
			if(clesScrNo1)
			{
				$('#m'+cmoduleNo+'c'+cscrNo).trigger('click');
				$('#m'+cmoduleNo+'c'+cscrNo).parent().prev().trigger('click');
			}
			else{
				$('#m'+cmoduleNo+'c'+cscrNo+'l'+clesScrNo).trigger('click');
				$('#m'+cmoduleNo+'c'+cscrNo+'l'+clesScrNo).parent().prev().trigger('click');
				
					$('#m'+cmoduleNo+'c'+cscrNo+'l'+clesScrNo).parent().prev().parent().prev().trigger('click');
				
				//console.log(cmoduleNo,cscrNo,clesScrNo)
			}
		if($('.menu_wrapper').hasClass('menu_open'))menuBtnClickFun();
		
		setTimeout(function(){
			$('#btn_home .line-02').removeClass('line2_1')
			$('#btn_home .line-01').removeClass('line1_1')
			$('#btn_home .line-03').removeClass('line3_1')
		},10);
		//Current Page Loading end//
}
