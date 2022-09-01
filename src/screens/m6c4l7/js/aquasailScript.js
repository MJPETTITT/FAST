//javascript
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var addonScale = globaldefScale;
var maxScale = globalmaxscale;
var currentScale = 0;
var zoomLevel = 0;
var zoomVal = 0;
var oneTimeSet = true;
var scalePos = 0;
var sprite;
var spriteAnimator;	
var rightSprite;
var moveStep = 0;
var simImgPath = 'assets/images/simulation/';
var zoomPos = {
	left:'leftMov',
	up:'topMov',
	right:'rightMov',
	down:'bottomMov'
};
var orderImgs = ["token5000","token1000","token100"];
var smallBoatPos = [[70,80],[66,70],[74,80],[70,80]];
var aquaValues = {
	supls_1:{data:['tokenRawMat','token1000','token100'],val:[0,0,0],areaTotal:0},
	emps_2:{data:['tokenWages','token1000','token100'],val:[0,0,0],areaTotal:0},
	fgw_3:{data:['tokenfinGoods'],val:[0],areaTotal:0},
	rmw_4:{data:['tokenRawMat'],val:[0],areaTotal:0},
	asslines1_5:{data:['tokenfinGoods','tokenRawMat','tokenWages'],val:[0,0,0],areaTotal:0},
	asslines2_5:{data:['tokenfinGoods','tokenRawMat','tokenWages'],val:[0,0,0],areaTotal:0},
	asslines3_5:{data:['tokenfinGoods','tokenRawMat','tokenWages'],val:[0,0,0],areaTotal:0},
	asslines4_5:{data:['tokenfinGoods','tokenRawMat','tokenWages'],val:[0,0,0],areaTotal:0},
	cash_6:{data:['token5000','token1000','token100'],val:[2,4,12],areaTotal:15200},
	post_7:{data:[],val:[],areaTotal:0},
	accspay_8:{data:[],val:[],areaTotal:0},
	bankdt_9:{data:['token100'],val:[0],areaTotal:0},
	equity_10:{data:['token100'],val:[0],areaTotal:0},
	accsrec_11:{data:[],val:[],areaTotal:0},
	shareholds_12:{data:['token5000','token1000'],val:[0,0],areaTotal:0},
	bank_13:{data:['token5000','token1000','token100'],val:[0,0,0],areaTotal:0},
	tax_14:{data:['token100'],val:[0],areaTotal:0},
	services_15:{data:['token100'],val:[0],areaTotal:0},
	propagt_16:{data:['token5000','token1000'],val:[0,0],areaTotal:0},
	cust_17:{data:['tokenfinGoods','token5000','token1000','token100'],val:[0,0,0,0],areaTotal:0},
};

var aquaSteps = {	
	step_0:{
		text:'<h3>PAY FOR SERVICES</h3><p>In order to make the sailboats ready to be sold, you first need to pay all the services of this first quarter. Remember that you have to pay your CEO, utilities, and others. Services amount to 800 per quarter. You have to pay this, and in return you get intangible inputs. These allow you to move your 4 sailboats from the assembly hall to the warehouse of finished goods.</p>',
		questTxt:'First move 800 from <b>cash</b> to services, as payment for the services you have received.',
		feedback:'no',
		questPanel:'yes',
		stayScreen:'no',
		clickelem:'cashsprite_6',
		customCursor:'yes',
		flip:'yes',
		dualFlip:'no',
		singledrop:'no',
		updateArea:'yes',
		cursorImage:[8],
		cursorArrayClass:["token100"],		
		customCursorSel:'servicessprite_15',			
		postBox:'',
		cashValues:[4,4,2],
		customcash:'yes',		
		areaData:[2,4,4],
		areaDataTotal:14400,
		areaData1:[8],
		areaDataTotal1:800,
		cashData:[4,4,2],
		cashTotal:14400,	
		changeSprite:'yes',
		changeSrc:'services_sprite_a6',		
		complete:false
	},
	step_1:{
		text:'<h3>WELL DONE!</h3><p>You successfully moved the tokens from <b>cash</b>.</p>',
		questTxt:'Now move a token representing a finished sailboat from each of the 4 assembly lines (4 tokens in total) to the warehouse of finished goods.',
		feedback:'no',
		questPanel:'yes',
		stayScreen:'no',
		clickelem:'asslines1sprite_5',
		customCursor:'yes',
		flip:'yes',
		dualFlip:'no',
		singledrop:'no',
		updateArea:'yes',
		cursorImage:[4],
		cursorArrayClass:["tokenfinGoods1500"],		
		customCursorSel:'fgwsprite_3',			
		postBox:'',
		cashValues:[2,4,4],
		customcash:'yes',		
		areaData:[0,0,0],
		areaDataTotal:0,
		areaData1:[4],
		areaDataTotal1:6000,
		cashData:[4,4,2],
		cashTotal:14400,	
		changeSprite:'yes',
		assemblyLinesSprite:'def',	
		changeSrc:'finishedgood_sprite_a6',		
		complete:false	
	},
	step_2:{
		text:'<h3>Well Done!</h3><p>You successfully moved the tokens from the assembly lines.</p>',
		questTxt:'',
		feedback:'yes',
		questPanel:'no',
		stayScreen:'no',
		clickelem:'',
		customCursor:'',
		updateArea:'no',
		customCursorSel:'',	
		changeSprite:'no',
		post:'',
		postClass:'bankPost',
		postImg:'postit-24000',	
		complete:true		
	}		
}

$(document).ready(function(){	
	$('#zoomIn').off('click').on('click', goZoomIn).css('opacity','1');
	$('#zoomOut').off('click').css('opacity','0.5');
	$('.pan-btn').off('click').on('click', navAquasail);
	$('.aquasailPop,.postit-container').draggable({containment:'.aquasilCont'});	
	$('.downToggle').off('click').on('click', toggleContent);	
	isAquasil = true;			
	$('.aquasilInner').html(aquaSteps['step_'+moveStep].text);
	$('.contentStep').html(aquaSteps['step_'+moveStep].questTxt);	
	for(var i=0;i<Object.keys(aquaLegends).length;i++)
		{
			var legObj = Object.keys(aquaLegends)[i];
			var lbl = aquaLegends[legObj].txt;
			var lp = aquaLegends[legObj].lpos;
			var tp = aquaLegends[legObj].tpos; 
			$('.legendDis').append('<div class="legendAqua" data-label="'+lbl+'" style="left:'+lp+'px;top:'+tp+'px;">'+lbl+'</div>');
		}
			
	$('.zoompan,.legend,.legendAqua').css('display','none');	
	$("#closePanel,#postitBtn,#postitClose").hover(function(event) {
		$(this).addClass('over');
	},function (event) {
		$(this).removeClass('over');
	});
	$('#closePanel').off('click').on('click',hidePopNext);	
	$('#postitBtn').off('click').on('click',validateAns);	
	$('.aquasilCont').on('mousemove', cursorMoving).off('mousemove');
	$('#postitClose').off('click').on('click',closePost);
	
	var sound = document.createElement('audio');
	sound.id = 'audiobg';	
	sound.loop = true;
	sound.src = 'assets/audios/ambient.mp3';
	sound.type = 'audio/mpeg';
	document.body.appendChild(sound);
	$('#audiobg').trigger('play');	
	$('.zoompan').css('display','block');	
	$('#map-btn').css('background-color','#981d97');	
	$('#map-btn').removeClass('animating');	
	var ovrlayH = docInnerHeight-standardTop;		
	$('.aquasilCont').css('height',ovrlayH+"px");
	defaultCashValues(6,2,0);	
	var minH = parseInt($('.aquasailPop').css('min-height')) - $('.aquasilInner').height();
	$('.aquasailPop').css('min-height',minH);
	/* $('#btn-aquasail').prop('disabled', true); */
	
});



function appendSmallBoats(){
	for(var i=1;i<5;i++){		
		$('#asslines'+i+'sprite_5').empty();
		$('#asslines'+i+'sprite_5').append('<img src="'+simImgPath+'smallboat.png" style="position:absolute;top:'+smallBoatPos[i-1][0]+'px;left:'+smallBoatPos[i-1][1]+'px;"/>');
	}
}

function cursorMoving(e){	
	var leftPos = ((e.clientX)-$(this).offset().left)+15;
	var topPos = ((e.clientY)-$(this).offset().top)-0;	
	$('.mouseCursor').css('left', leftPos).css('top',topPos);
}

function canvasResize(){	
	var aquaW = $('.aquasilCont').width();
	var aquaH = $('.aquasilCont').height();
	var canvasBW = $('.canvasBase').width();
	var canvasBH = $('.canvasBase').height();
	
	var leftPos = -(canvasBW - aquaW)/2;
	var topPos = -(canvasBH - aquaH)/2;
	scalePos = (aquaH/canvasBH)+zoomVal+addonScale;			
	$('.canvasBase').stop().animate({
		  transform: 'translate('+leftPos+'px, '+topPos+'px) scale('+(scalePos)+') '
		},400,function(){			
	});	
	oneTimeSet = true;	
}

function hidePopNext(){
	if(typeof(rightSprite) != 'undefined') stopSprite();
	
	var checkComplete = aquaSteps['step_'+moveStep].complete;
	if(checkComplete){
		$('.overlayAquasil').css('display','none');
		goAquasailWorkBook();
		return;
	}
	var keepScreen = aquaSteps['step_'+moveStep].stayScreen;
	$('.area-info-box-holder').css('display','none');	
	if(keepScreen == 'yes'){
		moveStep++;
		$('.aquasilInner').html(aquaSteps['step_'+moveStep].text);
		$('.aquasailPop').css('left','0px').css('top','0px');
	}
	else
	{
		$('.overlayAquasil').css('display','none');
		$('[data-common="commonSprite"]').off('click').on('click', runSprite);
		var currElem = aquaSteps['step_'+moveStep].clickelem;
		var showqpanel = aquaSteps['step_'+moveStep].questPanel;	
		if(showqpanel == 'yes'){ 
			$('.contentStep').html(aquaSteps['step_'+moveStep].questTxt);
			$('.move-box-holder').fadeIn(200);
		}
		childAnim(currElem);
	}	
	$('[data-common="commonSprite"]').each(function(a,b){
		if($(this).parent().attr('data-flip') == 'flip'){
			var getAnimator = window[$(this).attr('class')+'_Animator'];			
			getAnimator.reverse();
			getAnimator.play();
			$(this).parent().attr('data-flip','normal');
			$(this).parent().children().eq(0).css('display','block');
			$(this).parent().children().eq(1).css('display','none');	
		}
	});	
}

function showPopNext(){		
	moveStep++;	
	$('.mouseCursor').css('display','none');				
	$('.aquasilCont').off('mousemove');		
	var checkComplete = aquaSteps['step_'+moveStep].complete;	
	$('[data-common="commonSprite"]').off('click').css('cursor','default');	
	$('.aquasilInner').html(aquaSteps['step_'+moveStep].text);
	$('.aquasailPop').css('left','0px').css('top','0px');
	$('.overlayAquasil').css('display','flex');
	$('#closePanel').text('Continue');
	$('.move-box-holder').fadeOut(200);
		
	var feedTick = (aquaSteps['step_'+moveStep].feedback == 'yes')?'block':'none';
	$('.move-feedback-box-holder').css('display',feedTick); 
	if(moveStep <= 1) appendSmallBoats();
	
	if(checkComplete){		
		//$('#closePanel').css('display','none');		
		stopSprite();		
		$('[data-common="commonSprite"]').each(function(a,b){
			if($(this).parent().attr('data-flip') == 'flip'){
				var getAnimator = window[$(this).attr('class')+'_Animator'];			
				getAnimator.reverse();
				getAnimator.play();
				$(this).parent().attr('data-flip','normal');
				$(this).parent().children().eq(0).css('display','block');
				$(this).parent().children().eq(1).css('display','none');	
			}
		});
		$('.area-info-box-holder').css('display','none');
		var checkPost = aquaSteps['step_'+moveStep].post;
		if(checkPost == 'yes'){
			var postgeClass = aquaSteps['step_'+moveStep].postClass;
			var postGetImg = aquaSteps['step_'+moveStep].postImg;
			$('.'+postgeClass).find('img').attr('src',simImgPath+postGetImg+'.jpg')
			$('.'+postgeClass).css('display','block');
		}
	}		
	var minH = parseInt($('.aquasailPop').css('min-height')) - $('.aquasilInner').height();
	$('.aquasailPop').css('min-height',minH);	
}	
	
function runSprite(event){	
	var getNo = $(this).attr('class').split('_')[1];
	var getClass = $(this).attr('class').split('_')[0];
	var selector = $('#'+getClass+'sprite_'+getNo);
	var getAnimator = window[$(this).attr('class')+'_Animator'];	
	var backgroundPos = selector.css('backgroundPosition').split(" ");
	var xPos = backgroundPos[0];	
	
	if(aquaSteps['step_'+moveStep].clickelem == 'asslines1sprite_5'){
		var splitString = String(getClass.match(/\D+/g));
		if(splitString == 'asslines'){
			setAssemblyGroup();
			getClass = 'asslines';
			getNo = 5;
			aquaSteps['step_'+moveStep].clickelem = 'asslinessprite_5';
		}
	} 
	
	if(parseInt(xPos) == 0){
		$(this).parent().attr('data-flip','flip');
		if(selector.attr('data-forward') == 1) getAnimator.reverse();	
        
		showAreaInfo($(this));
		if(aquaSteps['step_'+moveStep].customCursor != 'yes')
			{				
				if((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem){
					var cashGetStep1 = aquaSteps['step_'+moveStep].customcash;						
					if(cashGetStep1 == 'yes'){						
						aquaSteps['step_'+moveStep].areaData = aquaSteps['step_'+moveStep].areaData1; 
						aquaSteps['step_'+moveStep].areaDataTotal = aquaSteps['step_'+moveStep].areaDataTotal1;
						againElemUpdate($(this));
						showAreaInfo($(this));
					}					
					stopSprite();	
					showPopNext();
					return;	
				}
				else{							
					errorPop();			
				}
			}
		else
			{
				if(aquaSteps['step_'+moveStep].postBox == 'yes'){					
					if((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem){						
						writePost();			
					}
					else{							
						errorPop();			
					}
				}
			}
		if(aquaSteps['step_'+moveStep].flip == 'yes')
			{
				if((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem){						
					$(this).parent().attr('data-flip','flip');	
					againAreaUpdate($(this));	
					$('.area-info-box-holder').css('display','block');											
					//getAnimator.stop();
					//getAnimator.reverse();
					var currElem = aquaSteps['step_'+moveStep].customCursorSel;
					aquaSteps['step_'+moveStep].clickelem = currElem;
					aquaSteps['step_'+moveStep].flip = 'no';					
					stopSprite();
					$('.postCursor').css('display','none');
					var imgName = aquaSteps['step_'+moveStep].cursorImage;
					orderImgs = aquaSteps['step_'+moveStep].cursorArrayClass;
					appendArray(imgName);
					var leftPos = ((event.clientX)-$('.aquasilCont').offset().left)+10;
					var topPos = ((event.clientY)-$('.aquasilCont').offset().top)-0;	
					$('.mouseCursor').css('left', leftPos).css('top',topPos);
					$('.mouseCursor').css('display','block');
					var cashGetStep1 = aquaSteps['step_'+moveStep].customcash;					
					if(cashGetStep1 == 'yes'){
						againElemUpdate($(this));
						showAreaInfo($(this));
					}
					updateCashValues();
					//defaultCashValues();
					$('.aquasilCont').off('mousemove').on('mousemove', cursorMoving);
					$('.aquasilCont').trigger('mousemove');					
					childAnim(currElem);					
				}
				else{					
					errorPop();
				}
			}
		getAnimator.play({
			tempo: 3,	
			onFrame: function(){
				//console.log(spriteAnimator2.currentFrame())
			},
			onStop: function() {
				if(getAnimator.currentFrame() >= 29 && ((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem)){
					//if(aquaSteps['step_'+moveStep].clickelem == 'fgwsprite_3') stopSprite();
				}	
			}
		});
		var checkDoubleSel = $(this).parent().attr('data-dual');
		if(checkDoubleSel=="dual"){
			$(this).parent().children().eq(0).css('display','none');
			$(this).parent().children().eq(1).css('display','block');
		}
	}
	else
	{		
		selector.attr('data-forward', 1);
		$('.area-info-box-holder').css('display','none');
		getAnimator.reverse();
        getAnimator.play();
		$(this).parent().attr('data-flip','normal');		
		if(aquaSteps['step_'+moveStep].customCursor == 'yes'){			
			if((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem){				
				$(this).parent().attr('data-flip','flip');	
				//againAreaUpdate($(this));	
				$('.area-info-box-holder').css('display','block');					
				againElemUpdate($(this));
				showAreaInfo($(this));
				if(aquaSteps['step_'+moveStep].changeSprite == 'yes'){
					var updateImg = aquaSteps['step_'+moveStep].changeSrc;
					var url = selector.css('background-image');
					var img = url.replace(/(url\(|\)|")/g, '');
					img = img.substring(img.lastIndexOf('/')+1, img.length);					
					selector.css('background-image','url('+simImgPath+updateImg+'.png),url('+simImgPath+img+')');
					var delayRemove = window.setTimeout(function(){
						selector.css('background-image','url('+simImgPath+updateImg+'.png)');
						window.clearTimeout(delayRemove);
					},100);		
				}
				getAnimator.stop();
				getAnimator.reverse();
				aquaSteps['step_'+moveStep].flip = 'no';				
				var currElem = aquaSteps['step_'+moveStep].customCursorSel;
				aquaSteps['step_'+moveStep].clickelem = currElem;
				aquaSteps['step_'+moveStep].customCursor = 'no';					
				stopSprite();
				$('.postCursor').css('display','none');
				var imgName = aquaSteps['step_'+moveStep].cursorImage;
				orderImgs = aquaSteps['step_'+moveStep].cursorArrayClass;
				appendArray(imgName);
				var leftPos = ((event.clientX)-$('.aquasilCont').offset().left)+10;
				var topPos = ((event.clientY)-$('.aquasilCont').offset().top)-0;	
				$('.mouseCursor').css('left', leftPos).css('top',topPos);
				$('.mouseCursor').css('display','block');
				$('.aquasilCont').off('mousemove').on('mousemove', cursorMoving);
				$('.aquasilCont').trigger('mousemove');			
				
				if(aquaSteps['step_'+moveStep].dualFlip == 'yes'){
					var setString = (aquaSteps['step_'+moveStep].singledrop == 'yes')?'no':'yes';
					aquaSteps['step_'+moveStep].customCursor = setString;					
					aquaSteps['step_'+moveStep].dualFlip = 'no';
					aquaSteps['step_'+moveStep].changeSrc = aquaSteps['step_'+moveStep].changeSrc1;	
					aquaSteps['step_'+moveStep].areaData = aquaSteps['step_'+moveStep].areaData1; 
					aquaSteps['step_'+moveStep].areaDataTotal = aquaSteps['step_'+moveStep].areaDataTotal1;
					childAnim(currElem);					
				}
				else{
					var cashGetStep1 = aquaSteps['step_'+moveStep].customcash;
					if(cashGetStep1 == 'yes'){					
						aquaSteps['step_'+moveStep].areaData = aquaSteps['step_'+moveStep].areaData1; 
						aquaSteps['step_'+moveStep].areaDataTotal = aquaSteps['step_'+moveStep].areaDataTotal1;
						againElemUpdate($(this));
						showAreaInfo($(this));
					}					
					closeSprite();
					showPopNext();
				}
			}
			else{			
				errorPop();
			}
		}
		else
		{
			if((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem){
				var cashGetStep1 = aquaSteps['step_'+moveStep].customcash;					
				if(cashGetStep1 == 'yes'){					
					aquaSteps['step_'+moveStep].areaData = aquaSteps['step_'+moveStep].areaData1; 
					aquaSteps['step_'+moveStep].areaDataTotal = aquaSteps['step_'+moveStep].areaDataTotal1;
					againElemUpdate($(this));
					showAreaInfo($(this));
				}							
				stopSprite();					
				showPopNext();	
			}
			else{			
				errorPop();
			}
		}
		var checkDoubleSel = $(this).parent().attr('data-dual');
		if(checkDoubleSel=="dual"){
			$(this).parent().children().eq(0).css('display','block');
			$(this).parent().children().eq(1).css('display','none');
		}
	}
}

function closeSprite(){
	$('[data-common="commonSprite"]').each(function(a,b){
		if($(this).parent().attr('data-flip') == 'flip'){
			var getAnimator = window[$(this).attr('class')+'_Animator'];			
			getAnimator.reverse();
			getAnimator.play();
			$(this).parent().attr('data-flip','normal');
			$(this).parent().children().eq(0).css('display','block');
			$(this).parent().children().eq(1).css('display','none');	
		}
	});	
}

function setAssemblyGroup(){
	var checktype = aquaSteps['step_'+moveStep].assemblyLinesSprite;
	if(checktype != 'def'){
		for(var i=1;i<5;i++){				
			var updateImg = "asslines"+i+"_sprite_"+checktype;
			var assSelector = $('#asslines'+i+'sprite_5');
			var url = assSelector.css('background-image');
			var img = url.replace(/(url\(|\)|")/g, '');
			img = img.substring(img.lastIndexOf('/')+1, img.length);					
			assSelector.css('background-image','url('+simImgPath+updateImg+'.png),url('+simImgPath+img+')');
			var delayRemove = window.setTimeout(function(){
				assSelector.css('background-image','url('+simImgPath+updateImg+'.png)');
				window.clearTimeout(delayRemove);
			},100);
		}
	}
	else{
		for(var i=1;i<5;i++){
			$('#asslines'+i+'sprite_5').empty();	
			var updateImg = "asslines"+i+"_sprite";
			var assSelector = $('#asslines'+i+'sprite_5');
			var url = assSelector.css('background-image');
			var img = url.replace(/(url\(|\)|")/g, '');
			img = img.substring(img.lastIndexOf('/')+1, img.length);					
			assSelector.css('background-image','url('+simImgPath+updateImg+'.png),url('+simImgPath+img+')');
			var delayRemove = window.setTimeout(function(){
				assSelector.css('background-image','url('+simImgPath+updateImg+'.png)');
				window.clearTimeout(delayRemove);
			},100);
		}
	}
}

function updateCashValues(){
	var val100 = aquaSteps['step_'+moveStep].cashValues[0];
	var val1000 = aquaSteps['step_'+moveStep].cashValues[1];
	var val5000 = aquaSteps['step_'+moveStep].cashValues[2];
	$('.tray_100,.tray_1000,.tray_5000').empty();
	for(var i=0;i<val100;i++){
		$('.tray_100').append('<img src="assets/images/simulation/token100.png" style="top:'+(i*(-6))+'px" class="absPos" width="55px"/>')
	}
	for(var j=0;j<val1000;j++){
		$('.tray_1000').append('<img src="assets/images/simulation/token1000.png" style="top:'+(j*(-6))+'px" class="absPos" width="55px"/>')
	}
	for(var k=0;k<val5000;k++){
		$('.tray_5000').append('<img src="assets/images/simulation/token5000.png" style="top:'+(k*(-6))+'px" class="absPos" width="55px"/>')
	}	
}

function defaultCashValues(a100,b1000,c5000){	
	$('.tray_100,.tray_1000,.tray_5000').empty();
	for(var i=0;i<a100;i++){
		$('.tray_100').append('<img src="assets/images/simulation/token100.png" style="top:'+(i*(-6))+'px" class="absPos" width="55px"/>')
	}
	for(var j=0;j<b1000;j++){
		$('.tray_1000').append('<img src="assets/images/simulation/token1000.png" style="top:'+(j*(-6))+'px" class="absPos" width="55px"/>')
	}
	for(var k=0;k<c5000;k++){
		$('.tray_5000').append('<img src="assets/images/simulation/token5000.png" style="top:'+(k*(-6))+'px" class="absPos" width="55px"/>')
	}
}

function showAreaInfo(ctcls)
	{
		$('.token-holder').empty();		
		var areaName = ctcls.parent().attr('data-value');	
		var ctSelector = ctcls.attr('class'); 	
		$('.area-info-title').text(areaName);		
		for(var i=0;i<aquaValues[ctSelector]['data'].length;i++){
			var token = aquaValues[ctSelector]['data'][i];
			var getVal = aquaValues[ctSelector]['val'][i];			
			$('.token-holder').append('<div class="'+token+'">'+getVal+'</div>');
		}		
		$('.value-total').find('span').html(aquaValues[ctSelector]['areaTotal']);
		$('.area-info-box-holder').css('display','block');
	}
	
function againAreaUpdate(elem){	
	var cashArray = aquaSteps['step_'+moveStep].cashData; 	
	for(var i=0;i<cashArray.length;i++){
		$('.cash-box-title').find('div').eq(i).text(cashArray[i]);		
	}	
	$('.cash-total').find('span').html(aquaSteps['step_'+moveStep].cashTotal);	
}

function againElemUpdate(elem){
	var findSel = elem.attr('class');
	aquaValues[findSel]['val'] = aquaSteps['step_'+moveStep].areaData; 
	aquaValues[findSel]['areaTotal'] = aquaSteps['step_'+moveStep].areaDataTotal;	
	var splitString = String(findSel.match(/\D+/g)[0]);	
	if(splitString == 'asslines'){
		for(var i=1;i<5;i++){			
			findSel = 'asslines'+i+'_5';
			aquaValues[findSel]['val'] = aquaSteps['step_'+moveStep].areaData;
			aquaValues[findSel]['areaTotal'] = aquaSteps['step_'+moveStep].areaDataTotal;	
		}
	}
}

function validateAns(e){
	var crctAns = Number($(this).attr('data-correct'));
	var inputVal = Number($('#postit-input').val());	
	if(inputVal == crctAns){
		$('.postPop').css('display','none');		
		$('.all_tray,.total-value-holder').css('display','none');	
		var imgName = aquaSteps['step_'+moveStep].cursorImage;				
		$('.postCursor').attr('src',simImgPath+imgName+'.svg');
		$('.postCursor').css('display','block');
		var leftPos = ((e.clientX)-$('.aquasilCont').offset().left)+10;
		var topPos = ((e.clientY)-$('.aquasilCont').offset().top)-0;	
		$('.mouseCursor').css('left', leftPos).css('top',topPos);
		$('.mouseCursor').css('display','block');
		$('.aquasilCont').off('mousemove').on('mousemove', cursorMoving);		
		aquaSteps['step_'+moveStep].customCursor = 'no';
		stopSprite();		
		var currElem = aquaSteps['step_'+moveStep].customCursorSel;	
		aquaSteps['step_'+moveStep].clickelem = currElem;			
		childAnim(currElem);
	}
	else
	{
		$('.postit-message').css('display','block');		
	}
}

function appendArray(arr){	
	var getArray = arr;
	var arrlen = getArray.length;
	var addonCount = 0;
	var totalCash = 0;
	$('.all_tray').empty();	
	for(var j=0;j<arrlen;j++){
		var trayimg = orderImgs[j];		
		for(var i=0;i<getArray[j];i++){			
			$('.all_tray').append('<img src="assets/images/simulation/'+trayimg+'.png" style="top:'+((i*(-5))-addonCount)+'px" class="absPos" width="36px"/>')
		}
		var getNumber = Number(orderImgs[j].match(/\d+/g));
		totalCash += getNumber*getArray[j];
		addonCount += Number(getArray[j])*5;		
	}
	if(trayimg == 'tokenfinGoods1500'){
		totalCash = aquaSteps['step_'+moveStep].cursorImage+" boats";		
	}
	$('.total-value-holder p').text(totalCash);
	var alltrayHeight = (($('.all_tray').children().length)*5)/2;
	$('.all_tray').css('top', alltrayHeight+5);
}

function closePost(){
	$('.postPop').css('display','none');
	$('.postit-message').css('display','none');
}

function writePost(){
	$('.postPop').css('display','flex');
}

function errorPop(){
	if($('.postPop').css('display') == 'flex') return;
	$('.errorMsg').stop();	
	$('.errorMsg').fadeIn(200, function(){
		$('.errorMsg').delay(1500).fadeOut(200);
	})
}

function childAnim(sel){	
	rightSprite = $('#'+sel);	
	rightSprite.stop().animate({
		transform: 'translate(0px,7px)'
	},300,function(){
		rightSprite.stop().animate({
			transform: 'translate(0px, 0px)'
		},300,function(){
			childAnim(sel)
		})
	})  
}

function stopSprite(){
	rightSprite.stop().animate({
		transform: 'translate(0px, 0px)'
	},0)
	rightSprite.clearQueue();
	rightSprite.stop();	
}
	
//Zoom & Navigation
function goZoomIn(e){
	e.stopImmediatePropagation();	
	if(oneTimeSet){currentScale = ((maxScale - scalePos)/3)}
	if(zoomLevel < 3)	
		{	
			zoomLevel++;		
			zoomVal = currentScale*zoomLevel;		
			$('#zoomOut').off('click').on('click', goZoomOut).css('opacity','1');
			canvasResize();
			oneTimeSet = false;	
	}
	if(zoomLevel >= 3)	
		{
			$('#zoomIn').off('click').css('opacity','0.5');
		}		
}

function goZoomOut(e){
	e.stopImmediatePropagation();		
	if(zoomLevel > 0)
	{
		zoomLevel--;
		zoomVal = currentScale*zoomLevel;	
		$('#zoomIn').off('click').on('click', goZoomIn).css('opacity','1');	
		canvasResize();
		oneTimeSet = false;	
	}
	if(zoomLevel <= 0)
	{
		$('#zoomOut').off('click').css('opacity','0.5');
	}	
}	

function navAquasail(event)
	{		
		//event.preventDefault();
		var dir = $(this).attr('data-direction');
		if(zoomPos[dir] == 'leftMov' || zoomPos[dir] == 'rightMov'){
			var pos = (zoomPos[dir] == 'leftMov')?+150:-150;
			var movePos = parseInt($('.canvasBase').css('left'))+pos;		
			$('.canvasBase').stop().animate({left:movePos},400);
		}
		else{
			var pos = (zoomPos[dir] == 'topMov')?+150:-150;
			var movePos = parseInt($('.canvasBase').css('top'))+pos;		
			$('.canvasBase').stop().animate({top:movePos},400);
		}		
	}

function toggleContent()
	{
		if($('.contentStep').height() < 40) return;
		var rotateval = $(this).attr('data-rot');
		if(rotateval == 225){
			var animval = 45;
			$(this).attr('data-rot', animval);
			$('.move-box-holder').css('height','60px');
			$('.contentStep').css('line-height','26px').css('padding-top','6px');
			$(this).find('i').css('top','5px');
		}
		else
		{
			var animval = 225;
			$(this).attr('data-rot', animval);
			$('.move-box-holder').css('height','auto');
			$('.contentStep').css('line-height','18px').css('padding-top','10px');
			$(this).find('i').css('top','8px');
		}
		$(this).find('i').stop().animate({
			transform: 'rotate('+animval+'deg)'
		},200)
	}

/* $('input[name="number"]').keypress(function (e) { 
	var numKey = e.keyCode || e.which;	
    if (numKey != 8 && numKey != 0 && (numKey < 48 || numKey > 57)) {        
        return false;
    }
}); */
	
var goAquasailWorkBook = function(){
	$('#btn-aquasail').prop('disabled', false);
	$('#btn-aquasail').addClass('overlay-btn-highlight');
	$('#audiobg').trigger('pause');	
	aquasilVisitPos = 6;
	var aquavisit = $('.aquasail').attr('data-position');	
	if(aquavisit < aquasilVisitPos){
		$('.aquasail').attr('data-position', aquasilVisitPos);
		setRecentAquasail();
	}
	$('.overlayWorkbook').css('display','flex');
}

//Sprites setter
function setSprite(){	
	
	supls_1 = $('#suplssprite_1');	
	supls_1_Animator = supls_1.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	emps_2 = $('#empssprite_2');	
	emps_2_Animator = emps_2.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	fgw_3 = $('#fgwsprite_3');	
	fgw_3_Animator = fgw_3.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	rmw_4 = $('#rmwsprite_4');	
	rmw_4_Animator = rmw_4.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	asslines1_5 = $('#asslines1sprite_5');	
	asslines1_5_Animator = asslines1_5.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	asslines2_5 = $('#asslines2sprite_5');	
	asslines2_5_Animator = asslines2_5.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	asslines3_5 = $('#asslines3sprite_5');	
	asslines3_5_Animator = asslines3_5.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	asslines4_5 = $('#asslines4sprite_5');	
	asslines4_5_Animator = asslines4_5.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	cash_6 = $('#cashsprite_6');	
	cash_6_Animator = cash_6.spriteAnimator({
		cols: 1,
		rows: 1,		
	});
	
	post_7 = $('#postsprite_7');	
	post_7_Animator = post_7.spriteAnimator({
		cols: 1,
		rows: 1,		
	});
	
	accspay_8 = $('#accspaysprite_8');	
	accspay_8_Animator = accspay_8.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	bankdt_9 = $('#bankdtsprite_9');	
	bankdt_9_Animator = bankdt_9.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	equity_10 = $('#equitysprite_10');	
	equity_10_Animator = equity_10.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	accsrec_11 = $('#accsrecsprite_11');	
	accsrec_11_Animator = accsrec_11.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	shareholds_12 = $('#shareholdssprite_12');	
	shareholds_12_Animator = shareholds_12.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	bank_13 = $('#banksprite_13');	
	bank_13_Animator = bank_13.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	tax_14 = $('#taxsprite_14');	
	tax_14_Animator = tax_14.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	services_15 = $('#servicessprite_15');	
	services_15_Animator = services_15.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	propagt_16 = $('#propagtsprite_16');	
	propagt_16_Animator = propagt_16.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	cust_17 = $('#custsprite_17');	
	cust_17_Animator = cust_17.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
}