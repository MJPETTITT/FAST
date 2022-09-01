var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Refer to your workbook to find the ratios you need to calculate these figures.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly calculated the ROA.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var bal_feedback_text=["Refer to the table above to find the correct calculation.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","The working capital requirement is 253."]
var getAnswet=[];
var correctAnswer=['2900','24200','24200','39300'];
var cash_bal=['','','',''];
var BS_correctAnswer=['1321','253'];
var showAnswer=['38000','38000'];
var tot_equity=['','14000'];
var clickCount=1;			
var next_page=false;			


$(document).ready(function(){
	
	$('.btn-text,.btn-icon,.btn-info').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.downToggle').off('click').on('click', toggleContent);
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
		{	//$('.overlayWorkbook').css('display','block');
			$('.question').show();
			$('.question1').hide();
			$('.move-box-holder').show();
			$('.contentStep').html("Input the correct figures and calculate Aquasail's margin, assets turnover and return on assets (ROA) for Year 1. Input the percentage figures to 2 decimal places, rounding up or down as needed. The figures you need are in the Year 1 <b>balance sheet</b>. Round your calculation to the nearest second decimal place.");
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
		}
	})
	
	
	$('.workbook').find('.submit').on('click',function(){
		if($('.question1').css('display')=='none'||!$('.question').hasClass('question1')){
			$('.workbook-input').each(function(i,k){
				console.log($(".workbook-input").eq(i).val())
				
				getAnswet[i]=Number($('.workbook-input').eq(i).val());
				correctAnswer[i]=Number(correctAnswer[i]);
				if(getAnswet[i]==correctAnswer[i])
				{
					$('.workbook-input').eq(i).parent().removeClass('incorrect').addClass('correct')
					$('.workbook-input').eq(i).attr('disabled','disabled')
				}
				else{
					$('.workbook-input').eq(i).parent().addClass('incorrect')
				}
				cash_bal[i]=Number($(".workbook-input").eq(i).val());
			})
				var MA=Number(cash_bal[0])/Number(cash_bal[1])*100;
				var AT=Number(cash_bal[2])/Number(cash_bal[3]);
				var ROA=MA*AT;
				$('.cash_statement').find('.autoFill').eq(0).text(isNaN(MA)?MA=0:MA.toFixed(2));
				$('.cash_statement').find('.autoFill').eq(1).text(isNaN(AT)?AT=0:AT.toFixed(2));
				$('.cash_statement').find('.autoFill').eq(2).text(isNaN(ROA)?ROA=0:ROA.toFixed(2));
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
				/* var autofillVal=Number($(".balancesheet-input").eq(i).val())+Number(tot_equity[i]);
				$('.balance_statement').find('.autoFill').eq(i).text(autofillVal); */
			})
		}
		if(JSON.stringify(getAnswet)==JSON.stringify(correctAnswer)) {
			$('.submit').addClass('disabled');
			//$('.cash_statement').find('.autoFill').removeClass('autoFill');
			$('.feedback-holder').hide();
			$('.overlayWorkbook').find('.feedback-holder').find('.title-text').html(feedback_title[2]);
			$('.overlayWorkbook').find('.feedback-holder').find('.primary-text p').html(feedback_text[2]);
			console.log($('.question1').css('display')=='block',!$('.question').hasClass('question1'))
			 if($('.question1').css('display')=='block'||!$('.question').hasClass('question1')){ 
				 $('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');   
				$('.feedback-holder').find('.btn-close').hide();
				changeIndex = 5;
				wbooksubIndex = 0;
				pushWbookClass[34] = 'showData_34';
				complete_page();
				enableNextBtn(); 
				
			 }
			else{
				$('.cash_statement').find('.submit').remove();
				$('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
				$('.feedback-holder').find('.show').text('CONTINUE');
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
				$('.overlayWorkbook').find('.feedback-holder').find('.title-text').html(feedback_title[0])
				$('.overlayWorkbook').find('.feedback-holder').find('.primary-text p').html(feedback_text[0])
				//$('input[type="number"]').prop('disabled', true);
				setTimeout(function(){$('.feedback-holder').show();},200)
			}
			else{
				$('.feedback-holder').hide();
				$('.overlayWorkbook').find('.feedback-holder').find('.title-text').html(feedback_title[1])
				$('.overlayWorkbook').find('.feedback-holder').find('.primary-text p').html(feedback_text[1])
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
				if($('.question1').css('display')=='none'||!$('.question').hasClass('question1')){
					$('.workbook-input').each(function(i,k){
						$('.workbook-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.workbook-input').eq(i).parent().removeClass('incorrect');
						//var autofillVal=Number(correctAnswer[i])+cash_bal;
					});
						$('.cash_statement').find('.autoFill').eq(0).text('11.98');
						$('.cash_statement').find('.autoFill').eq(1).text('0.62');
						$('.cash_statement').find('.autoFill').eq(2).text('7.38');
				}
				else{
					$('.balancesheet-input').each(function(i,k){
						$('.balancesheet-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.balancesheet-input').eq(i).parent().removeClass('incorrect');
						//var autofillVal=Number(correctAnswer[i])+cash_bal;
						//$('.balance_statement').find('.autoFill').eq(i).text(showAnswer[i]);
					})
				}
			}
			else{	
				// if(!next_page){
					// $('.question').hide();
					// $('.statementPop').show();
					// $('.balance_statement').show();
					
					// correctAnswer=BS_correctAnswer;
					// feedback_text=bal_feedback_text;
					// clickCount=1;
					// $('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
					// $('.feedback-holder').find('.show').text('');
				// }
				// else{
					$('.overlayWorkbook').hide();
					$('.question-holder').removeClass('multiselection');
					$('.FirstState').css('display','flex');
					
				// }
			}
		}
		
	})
	
	$(".workbook-input").on('focus',function(){
		$(this).parent().removeClass('incorrect');
	})
	$(".workbook-input").on('keyup change',function(){
		$(this).parent().removeClass('incorrect');
		
		var isValid=true;
		$(".workbook-input").each(function(i){
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
			console.log(numKey)
			if (numKey != 8 && numKey != 0 && numKey != 45 && numKey != 46 && (numKey < 48 || numKey > 57)) {        
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