var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Refer to the Year 2 financial documents to find the figures you need.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly calculate the profitability ratio for Year 2: ROA margin."]
var feedback_text0=["The ROA formula is <b>margin</b> x <b>assets turnover</b>."]
var feedback_text2=["You have correctly calculate the profitability ratio for Year 2: ROA assets turnover."]
var feedback_text3=["You have correctly calculate the profitability ratio for Year 2: ROA."]
var feedback_text4=["You have correctly calculate the profitability ratio for Year 2: Financial leverage effect."]
var feedback_text5=["You have correctly calculate the profitability ratio for Year 2: ROA before tax."]
var feedback_text6=["You have correctly calculated the Year 2 profitability ratios.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var contentStep2=["Calculate the <b>assets turnover</b> for Year 2. Add in the appropriate figures from the workbook and the calculations will be completed automatically. "];
var contentStep3=["Calculate the <b>ROA</b> for Year 2. The formula is margin x assets turnover."];
var contentStep4=["Complete the average cost of liabilities by adding in the figures from the workbook for interest costs and liabilities. Then calculate the percentage figure.<br/><br/>Then add in the Y2 liabilities and equity figures. The <b>financial leverage effect</b> for Year 2 will then be automatically calculated. "];
var contentStep5=["Complete the ROE before tax by adding in the figures from the workbook for <b>profit before tax</b> and <b>equity</b>. The <b>ROE before tax</b> for Year 2 will then be automatically calculated. "];
var contentStep6=["Complete the ROE after tax by adding in the figures from the workbook for <b>profit after tax</b> and <b>equity</b>. The <b>ROE after tax</b> for Year 2 will then be automatically calculated. "];
var getAnswet=[];
var correctAnswer=['3700','24200'];
var correctAnswer2=['24200','26800'];
var correctAnswer3=['13.76'];
var correctAnswer4=['1200','11000','10.91','11000','15800'];
var correctAnswer5=['2500','15800'];
var correctAnswer6=['1500','15800'];

var cash_bal=['15.29','0.9','','','15.83','9.50'];
var cash_bal1=['2.9','0.69','2.02'];
var BS_correctAnswer=['38000','24000'];
var showAnswer=['38000','38000'];
var tot_equity=['','14000'];
var cellHeight=['125','225','275','345'];
var clickCount=1;			
var stepCount=1;

$(document).ready(function(){
	$('.overlayWorkbook').css('display','flex');
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
			$('.step1').show();
			$('.bsy').show();
			$('.question1').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('Calculate the <b>margin</b> for Year 2. Add in the appropriate figures from the workbook and the calculations will be completed automatically.');
			
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
				
				getAnswet[i]=$('.step'+stepCount).find('.workbook-input').eq(i).val();
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
				var autofillVal1=[];
				var MA = Number($('.step'+stepCount).find(".workbook-input").eq(0).val())/Number($('.step'+stepCount).find(".workbook-input").eq(1).val())*100;
				var AT = Number($('.step'+stepCount).find(".workbook-input").eq(0).val())/Number($('.step'+stepCount).find(".workbook-input").eq(1).val());
				var ACL = Number(13.76) - Number($('.step'+stepCount).find(".workbook-input").eq(2).val());
				var LIE = Number($('.step'+stepCount).find(".workbook-input").eq(3).val()) / Number($('.step'+stepCount).find(".workbook-input").eq(4).val()) ;
				var RBT = (Number($('.step'+stepCount).find(".workbook-input").eq(0).val()) / Number($('.step'+stepCount).find(".workbook-input").eq(1).val())+0.0001)*100 ;
				var RAT = Number($('.step'+stepCount).find(".workbook-input").eq(0).val()) / Number($('.step'+stepCount).find(".workbook-input").eq(1).val())*100 ;
				//RAT=Number(RAT.toFixed(1));
				var FLE=ACL*LIE;
				if(stepCount==1)autofillVal=isNaN(MA)?MA=0:MA.toFixed(2);
				if(stepCount==2)autofillVal=isNaN(AT)?AT=0:AT.toFixed(1);

				if(stepCount==4){autofillVal1[0]=isNaN(ACL)?ACL=0:ACL.toFixed(1);autofillVal1[1]=isNaN(LIE)?LIE=0:LIE.toFixed(3).slice(0,-1);autofillVal1[2]=isNaN(FLE)?FLE=0:FLE.toFixed(2);}
				if(stepCount==5)autofillVal=isNaN(RBT)?RBT=0:RBT.toFixed(2);
				if(stepCount==6)autofillVal=isNaN(RAT)?RAT=0:Number(RAT.toFixed(1)).toFixed(2);
				console.log(autofillVal1)
				$('.step'+stepCount).find('.autoFill').eq(0).text(autofillVal);
				if(stepCount==4){
					$('.step'+stepCount).find('.autoFill').eq(0).text(autofillVal1[0]);
					$('.step'+stepCount).find('.autoFill').eq(1).text(autofillVal1[1]);
					$('.step'+stepCount).find('.autoFill').eq(2).text(autofillVal1[2]);
				}
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
			 if(($('.question1').css('display')=='block'||!$('.question').hasClass('question1')) && stepCount==6){ 
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');  
				$('.feedback-holder').find('.btn-close').hide();
				$('#btn-workbook').addClass('overlay-btn-highlight');
				changeIndex = 5;
				wbooksubIndex = 1;
				pushWbookClass[50] = 'showData_50';
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
				if(stepCount==3)$('.feedback-holder').find('.primary-text p').html(feedback_text0[0])
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
						$('.step'+stepCount).find('.autoFill').eq(0).text(cash_bal[stepCount-1]);
						if(stepCount==4){
							$('.step'+stepCount).find('.autoFill').eq(0).text(cash_bal1[0]);
							$('.step'+stepCount).find('.autoFill').eq(1).text(cash_bal1[1]);
							$('.step'+stepCount).find('.autoFill').eq(2).text(cash_bal1[2]);
						}
						
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
				/* $('.cash_statement').find('.step'+stepCount).find('.numbers90').each(function(i,k){
					$('.cash_statement').find('.step'+stepCount).find('.numbers90').eq(i).html($('.step'+stepCount).find('.numbers90').eq(i).children().val()).removeClass('correct').addClass('static');					
				}); */ 
				$('.question').hide();
				stepCount++;
				$('.step'+stepCount).show();
				$('.bsy').show();
				$('.contentStep').html(eval('contentStep'+stepCount));
				//$('.question .headitems .celldivider').css('height',cellHeight[stepCount-1]+'px');
				
				correctAnswer=eval('correctAnswer'+stepCount);
				feedback_text[2]=eval('feedback_text'+stepCount);
				clickCount=1;
				getAnswet=[];
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
			if (numKey != 8 && numKey != 0 && numKey != 46 && numKey != 45 && (numKey < 48 || numKey > 57)) {        
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