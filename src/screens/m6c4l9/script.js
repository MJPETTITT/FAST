var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Refer to the Year 2 financial documents to find the figures you need.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly calculated the current ratio."]
var feedback_text2=["You have correctly calculated the acid test."]
var feedback_text3=["You have correctly calculated the net working capital."]
var feedback_text4=["You have correctly calculated the Year 2 liquidity ratios.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var getAnswet=[];
var correctAnswer=['13200','5000'];
var correctAnswer2=['8200','5000'];
var correctAnswer3=['13200','5000'];
var correctAnswer4=['6600','5000','2000'];

var cash_bal=['2.64','1.64','8200','9600'];
var BS_correctAnswer=['38000','24000'];
var showAnswer=['38000','38000'];
var tot_equity=['','14000'];
var cellHeight=['125','225','275','345'];
var clickCount=1;			
var stepCount=1;
var contentStep2=["Input the correct figures for the <b>acid test</b>, which you will find in the Y2 <b>balance sheet</b> in the workbook. The acid test will then be calculated automatically."];
var contentStep3=["Input the correct figures for the <b>net working capital</b>, which you will find in the Y2 <b>balance sheet</b> in the workbook. The net working capital will then be calculated automatically."];
var contentStep4=["Input the correct figures for the <b>working capital requirement</b>, which you will find in the Y2 <b>balance sheet</b> in the workbook. The working capital requirement will then be calculated automatically."];


$(document).ready(function(){
	$('.overlayWorkbook').css('display','flex')
	$('.downToggle').off('click').on('click', toggleContent);	
	$('.btn-text,.btn-icon,.btn-info').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.btn-text,.btn-icon,.btn-info').mouseleave(function(){
		$('.btn-text').removeClass('over');
		$('.btn-icon').removeClass('over');
		$('.btn-info').removeClass('over');
	})
	$('.moves-box-holder .btn-icon').click(function(){
	
		$('.moves-box-holder').toggleClass('expanded');
		
	})
	$('.btn-info').click(function(){
	
		$('.info-overlay,.btn-info').toggleClass('expanded');
	
	})

	$('.btn-text').on('click',function(){
		var targetId = $(this).attr('data-Id');
	
	
		if(targetId==0)
		{
			$('.question').show();
			$('.question1').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('Input the correct figures for the current ratio, which you will find in the Y2 <b>balance sheet</b> in the workbook. The current ratio will then be calculated automatically.');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
		}
		else if(targetId==1)
		{
			$('.question').show();
			$('.move-box-holder').show();
			$('.contentStep').html('Update the <b>balance sheet</b> (on the right) to show the increase of 24000 <b>Cash</b> on the left hand side, and the addition of 24000 <b>bank debt</b> on the right hand side.');
			
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','2');
			
			correctAnswer=BS_correctAnswer;
			feedback_text=bal_feedback_text;
			clickCount=1;
		}
		
	
	
	})
	
	$('.submit').on('click',function(){
		if($('.question1').css('display')=='none'||!$('.question').hasClass('question1')){
			$('.step'+stepCount).find('.workbook-input').each(function(i,k){
				console.log($(".workbook-input").eq(i).val())
				
				getAnswet[i]=$('.workbook-input').eq(i).val();
				if(getAnswet[i]==correctAnswer[i])
				{
					$('.step'+stepCount).find('.workbook-input').eq(i).parent().removeClass('incorrect').addClass('correct')
					$('.step'+stepCount).find('.workbook-input').eq(i).attr('disabled','disabled')
				}
				else{
					$('.step'+stepCount).find('.workbook-input').eq(i).parent().addClass('incorrect')
				}
				//var autofillVal=Number($(".workbook-input").eq(i).val())+Number(cash_bal[i]);
			})
				var autofillVal=0;
				var CA = Number($('.step'+stepCount).find(".workbook-input").eq(0).val())/Number($('.step'+stepCount).find(".workbook-input").eq(1).val());
				var AT = Number($('.step'+stepCount).find(".workbook-input").eq(0).val())/Number($('.step'+stepCount).find(".workbook-input").eq(1).val());
				var NWC = Number($('.step'+stepCount).find(".workbook-input").eq(0).val()) - Number($('.step'+stepCount).find(".workbook-input").eq(1).val());
				var WCR = Number($('.step'+stepCount).find(".workbook-input").eq(0).val()) + Number($('.step'+stepCount).find(".workbook-input").eq(1).val()) - Number($('.step'+stepCount).find(".workbook-input").eq(2).val());
				if(stepCount==1)autofillVal=isNaN(CA)?CA=0:CA.toFixed(2);
				if(stepCount==2)autofillVal=isNaN(AT)?AT=0:AT.toFixed(2);
				if(stepCount==3)autofillVal=NWC;
				if(stepCount==4)autofillVal=WCR;
				
				$('.cash_statement').find('.step'+stepCount).find('.autoFill').eq(0).text(autofillVal);
		}
		else {
			$('.balancesheet-input').each(function(i,k){
				
				getAnswet[i]=$('.balancesheet-input').eq(i).val();
				if(getAnswet[i]==correctAnswer[i])
				{
					$('.balancesheet-input').eq(i).parent().removeClass('incorrect').addClass('correct')
					$('.balancesheet-input').eq(i).attr('disabled','disabled')
				}
				else{
					$('.balancesheet-input').eq(i).parent().addClass('incorrect')
				}
				var autofillVal=Number($(".balancesheet-input").eq(i).val())+Number(tot_equity[i]);
				$('.balance_statement').find('.autoFill').eq(i).text(autofillVal);
			})
		}
		if(JSON.stringify(getAnswet)==JSON.stringify(correctAnswer)) {
			$('.submit').addClass('disabled');
			//$('.cash_statement').find('.autoFill').removeClass('autoFill');
			$('.feedback-holder').hide();
			$('.feedback-holder').find('.title-text').html(feedback_title[2]);
			$('.feedback-holder').find('.primary-text p').html(feedback_text[2]);
			 if(($('.question1').css('display')=='block'||!$('.question').hasClass('question1'))&&stepCount==4){ 
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');  
				$('.feedback-holder').find('.btn-close').hide();
				$('#btn-workbook').addClass('overlay-btn-highlight');
				changeIndex = 4;
				wbooksubIndex = 1;
				pushWbookClass[49] = 'showData_49';
				complete_page();
				enableNextBtn();
			 }
			else{
				//$('.cash_statement').find('.submit').remove();
				$('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
				$('.feedback-holder').find('.show').text('NEXT');
				//pushWbookClass[2] = 'showData_2';	
			} 
			/*$('.move-box-holder').css('z-index','0');*/
			setTimeout(function(){$('.feedback-holder').show();},200);
			
			
		}
		else
		{
			if(clickCount<3)
			{
				$('.feedback-holder').hide();
				$('.feedback-holder').find('.title-text').html(feedback_title[0])
				$('.feedback-holder').find('.primary-text p').html(feedback_text[0])
				//$('input[type="number"]').prop('disabled', true);
				setTimeout(function(){$('.feedback-holder').show();},200)
			}
			else{
				$('.feedback-holder').hide();
				$('.feedback-holder').find('.title-text').html(feedback_title[1])
				$('.feedback-holder').find('.primary-text p').html(feedback_text[1])
				$('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
				$('.feedback-holder').find('.show').text('SHOW ME');
				//$('input[type="number"]').prop('disabled', true);
				setTimeout(function(){$('.feedback-holder').show();},200)
			}
			clickCount++;
		}	
	})
	$('.show').on('click',function(){
		//$('input[type="number"]').prop('disabled', false);
		$('.feedback-holder').hide();
		if(!$('.btn-close').hasClass('btn-icon'))
		{
			if($('.feedback-holder').find('.show').text()=='SHOW ME')
			{
				$('.submit').addClass('disabled');
				$('.incorrect input').val('');
				console.log($('.question1').css('display')=='none'||!$('.question').hasClass('question1'),$('.question1').css('display')=='none',!$('.question').hasClass('question1'))
				if($('.question1').css('display')=='none'||!$('.question').hasClass('question1')){
					$('.step'+stepCount).find('.workbook-input').each(function(i,k){
						$('.step'+stepCount).find('.workbook-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.step'+stepCount).find('.workbook-input').eq(i).parent().removeClass('incorrect');
						//var autofillVal=Number(correctAnswer[i])+cash_bal;
					});
						$('.cash_statement').find('.step'+stepCount).find('.autoFill').eq(0).text(cash_bal[stepCount-1]);
						
				}
				else{
					$('.balancesheet-input').each(function(i,k){
						$('.balancesheet-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.balancesheet-input').eq(i).parent().removeClass('incorrect');
						//var autofillVal=Number(correctAnswer[i])+cash_bal;
						$('.balance_statement').find('.autoFill').eq(i).text(showAnswer[i]);
					})
				}
			}
			else{
				$('.cash_statement').find('.step'+stepCount).find('.numbers90').each(function(i,k){
					$('.cash_statement').find('.step'+stepCount).find('.numbers90').eq(i).html($('.step'+stepCount).find('.numbers90').eq(i).children().val()).removeClass('correct').addClass('static');					
				}); 
				stepCount++;
				$('.step'+stepCount).show();
				$('.contentStep').html(eval('contentStep'+stepCount));
				$('.question .headitems .celldivider').css('height',cellHeight[stepCount-1]+'px');
				
				correctAnswer=eval('correctAnswer'+stepCount);
				feedback_text[2]=eval('feedback_text'+stepCount);
				clickCount=1;
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');
				/* $('.question').hide();
				$('.statementPop').show(); */
				/*$('.statementPop').find('.title-text').text('CASH STATEMENT: LABOUR')
				 $('.statementPop').find('.primary-text').html('<p>Now, update the Year 1, Quarter 1 Cash Statement to record the Cash outflow of 2000 in Wages and the impact of that Cash outflow on the Cash Balance.</p>');
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');
				
				$('.workbook-input').each(function(i,k){
					$('.cash_statement').find('.workbook-input').eq(i).parent().html($('.workbook-input').eq(i).val()).removeClass('correct').addClass('static');
				}); */
			}
		}
		
	})
	
	$(".workbook-input").on('focus',function(){
		$(this).parent().removeClass('incorrect');
	})
	$(".workbook-input").on('keyup change',function(){console.log(stepCount)
		$(this).parent().removeClass('incorrect');
		
		var isValid=true;
		$('.step'+stepCount).find(".workbook-input").each(function(i){
			var element = $(this);
			if (element.val() == '') {
			   isValid = false;
			}
		})
		if(isValid)
		$('.submit').removeClass('disabled');
	});
	$(".balancesheet-input").on('keyup change',function(){
		$(this).parent().removeClass('incorrect');
		
		var isValid=true;
		$(".balancesheet-input").each(function(i){
			var element = $(this);
			if (element.val() == '') {
			   isValid = false;
			}
		})
		if(isValid)
		$('.submit').removeClass('disabled');
	}); 
	$('input').click(function(){
		$(this).focus();
	})
	$('input[type="number"]').keypress(function (e) { 
			var numKey = e.keyCode || e.which;		
			if (numKey != 8 && numKey != 0 && numKey != 45 && (numKey < 48 || numKey > 57)) {        
				return false;
		}
	});
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
})