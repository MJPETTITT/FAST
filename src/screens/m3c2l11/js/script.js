var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Calculate the <b>cost of goods sold</b> by adding the <b>total cost of production</b> (7200) and <b>inventory changes</b> (-1500).","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>profit-and-loss statement</b>.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var bal_feedback_text=["Calculate EBIT by subtracting the total <b>cost of goods sold</b> (5700) from sales (6600).","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>profit-and-loss statement</b>.<br/><span><i>Select the forward arrow below to continue.</i></span>"];
var getAnswet=[];
var correctAnswer=['-1500','5700'];
var cash_bal=14400;
var BS_correctAnswer=['900'];
var showAnswer=['900'];
var tot_equity=['','','','',''];
var clickCount=1;			


$(document).ready(function(){
	
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
			$('.balance_statement').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('In the <b>profit-and-loss statement</b>, add in the direct cost of the raw materials and wages for the unsold boat under the Quarter 2 column, in the <b>inventory</b> changes finished goods line. As the boat has yet to be sold, add this direct cost as -1500. Then calculate the <b>cost of goods sold</b>.');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
		}
		else if(targetId==1)
		{
			$('.question').show();
			$('.cash_statement').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('Now calculate the EBIT for Quarter 2, by subtracting the <b>cost of goods sold</b> from the sales figure. Remember that you can scroll up to the top of the <b>profit-and-loss statement</b> to see the sales figure for Quarter 2.');
			
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','2');
			
			correctAnswer=BS_correctAnswer;
			feedback_text=bal_feedback_text;
			clickCount=1;
			getAnswet=[];
		}
		
	
	
	})
	
	$('.submit').on('click',function(){
		if($('.balance_statement').css('display')=='none'||!$('.question').hasClass('balance_statement')){
			$('.workbook-input').each(function(i,k){
				//console.log($(".workbook-input").eq(i).val())
				
				getAnswet[i]=$('.workbook-input').eq(i).val();
				if(getAnswet[i]==correctAnswer[i])
				{
					$('.workbook-input').eq(i).parent().removeClass('incorrect').addClass('correct')
					$('.workbook-input').eq(i).attr('disabled','disabled')
				}
				else{
					$('.workbook-input').eq(i).parent().addClass('incorrect')
				}
				var autofillVal=Number($(".workbook-input").eq(i).val())+cash_bal;
				$('.cash_statement').find('.autoFill').eq(i).text(autofillVal);
			})
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
				//var autofillVal=Number($(".balancesheet-input").eq(i).val())+Number(tot_equity[i]);
				/* tot_equity[i]=Number($(".balancesheet-input").eq(i).val());
				if(i==0)tot_equity[i]=0;
				$('.balance_statement').find('.autoFill').eq(0).text(tot_equity.reduce(getSum)); */
			})
		}
		if(JSON.stringify(getAnswet)==JSON.stringify(correctAnswer)) {
			$('.submit').addClass('disabled');
			//$('.cash_statement').find('.autoFill').removeClass('autoFill');
			$('.feedback-holder').hide();
			$('.feedback-holder').find('.title-text').html(feedback_title[2]);
			$('.feedback-holder').find('.primary-text p').html(feedback_text[2]);
			 if($('.balance_statement').css('display')=='block'||!$('.question').hasClass('balance_statement')){ 
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');  
				$('.feedback-holder').find('.btn-close').hide();
				changeIndex = 3;
				wbooksubIndex = 0;
				pushWbookClass[18] = 'showData_18';
				complete_page();
				enableNextBtn();
			 }
			else{
				//$('.cash_statement').find('.submit').remove();
				$('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
				$('.feedback-holder').find('.show').text('NEXT');
				pushWbookClass[17] = 'showData_17';	
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
				if($('.balance_statement').css('display')=='none'||!$('.question').hasClass('balance_statement')){
					$('.workbook-input').each(function(i,k){
						$('.workbook-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.workbook-input').eq(i).parent().removeClass('incorrect');
						var autofillVal=Number(correctAnswer[i])+cash_bal;
						$('.cash_statement').find('.autoFill').eq(i).text(autofillVal);
					});
				}
				else{
					$('.balancesheet-input').each(function(i,k){
						$('.balancesheet-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.balancesheet-input').eq(i).parent().removeClass('incorrect');
						//var autofillVal=Number(correctAnswer[i])+cash_bal;
					})
						$('.balance_statement').find('.autoFill').eq(0).text(showAnswer[0]);
				}
			}
			else{
				
				$('.question').hide();
				$('.statementPop').show();
				/*  $('.statementPop').find('.title-text').text('CALCULATE EBIT USING DIRECT COSTS METHOD')
				 $('.statementPop').find('.primary-text').html('<p>Now calculate the EBIT for Quarter 2, by subtracting the cost of goods sold from the sales figure. Remember that you can scroll up to the top of the <b>profit-and-loss statement</b> to see the sales figure for Quarter 2.</p>');
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');
				
				$('.move-box-holder').hide(); */
				
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
			if (numKey != 8 && numKey != 0 && numKey != 45 && (numKey < 48 || numKey > 57)) {        
				return false;
		}
	});
	function getSum(total, num) {
	  return total + num;
	}
})