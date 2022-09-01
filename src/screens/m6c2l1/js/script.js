var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Input the correct numbers. Remember that payments are recorded with a – sign.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>cash flow statement</b>.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var bal_feedback_text=["Calculate the cash balance as a result of the 2000 cash outflow.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>cash flow statement</b>.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var getAnswet=[];
var correctAnswer=['6600','-2000','-1000','-600'];
var cash_bal=['0','6600','4600','3600'];
var BS_correctAnswer=['38000','24000'];
var showAnswer=['38000','38000'];
var tot_equity=['','14000'];
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
			$('.question1').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('Now, update the Quarter 2 <b>cash flow statement</b> to show the 6600 cash inflow, the 2000 raw materials cash outflow, the 1000 labour cash outflow, and the 600 services cash outflow.');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
		}
		else if(targetId==1)
		{
			$('.question').show();
			$('.move-box-holder').show();
			$('.contentStep').html('Update the <b>balance sheet</b> (on the right) to show the increase of 24000 <b>cash</b> on the left hand side, and the addition of 24000 <b>bank debt</b> on the right hand side.');
			
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
			$('.workbook-input').each(function(i,k){
				console.log($(".workbook-input").eq(i).val())
				
				getAnswet[i]=$('.workbook-input').eq(i).val();
				if(getAnswet[i]==correctAnswer[i])
				{
					$('.workbook-input').eq(i).parent().removeClass('incorrect').addClass('correct')
					$('.workbook-input').eq(i).attr('disabled','disabled')
				}
				else{
					$('.workbook-input').eq(i).parent().addClass('incorrect')
				}
				var autofillVal=Number($(".workbook-input").eq(i).val())+Number(cash_bal[i]);
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
			 if($('.question1').css('display')=='block'||!$('.question').hasClass('question1')){ 
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');  
				$('.feedback-holder').find('.btn-close').hide();
				changeIndex = 1;
				wbooksubIndex = 2;
				pushWbookClass[39] = 'showData_39';
				complete_page();
				enableNextBtn();
			 }
			else{
				$('.cash_statement').find('.submit').remove();
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
					$('.workbook-input').each(function(i,k){
						$('.workbook-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.workbook-input').eq(i).parent().removeClass('incorrect');
						var autofillVal=Number(correctAnswer[i])+Number(cash_bal[i]);
						$('.cash_statement').find('.autoFill').eq(i).text(autofillVal);
					});
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
				
				$('.question').hide();
				$('.statementPop').show();
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
})