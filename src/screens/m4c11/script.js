$(document).ready(function(){
	$('.activityContainer').fadeIn();

	$('.response').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.response').mouseleave(function(){
		$('.response').removeClass('over');
	})
	$('.btn-text').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.btn-text').mouseleave(function(){
		$('.btn-text').removeClass('over');
	})
	$('.FirstState').find('.response').on('click',function(){
		console.log($(this).attr('data-index'))
		if(!$(this).hasClass('disabled'))
		{
			if($(this).attr('data-index')=='3'){
				$(this).addClass('correct');
				$('.FirstState').find('.feedback-holder').find('.title-text').text('NICE WORK!');
			}
			else{
				$('.FirstState').find('.response').eq(3).addClass('correct');
				$(this).addClass('incorrect');
			}
		}
		$('.feedback-holder').show();
		$('.FirstState').find('.response').addClass('disabled');
		/* complete_page();
		enableNextBtn(); */
	})
	$('.FinalState').find('.response').on('click',function(){
		console.log($(this).attr('data-index'))
		if(!$(this).hasClass('disabled'))
		{
			if($(this).attr('data-index')=='0'){
				$(this).addClass('correct');
				$('.FinalState').find('.feedback-holder').find('.title-text').text('NICE WORK!');
				$('.FinalState').find('.feedback-holder').find('.primary-text p').text('Adecco’s liquidity risk is low as the net working capital is much higher than the working capital requirement.'); 
			}
			else{
				$('.FinalState').find('.response').eq(0).addClass('correct');
				$(this).addClass('incorrect');
				$('.FinalState').find('.feedback-holder').find('.title-text').text('Not Quite');
				$('.FinalState').find('.feedback-holder').find('.primary-text p').text('Adecco’s liquidity risk is low as the net working capital is much higher than the working capital requirement.'); 
			}
		}
		$('.feedback-holder').show();
		$('.FinalState').find('.response').addClass('disabled');
		/* complete_page();
		enableNextBtn(); */
		
	})
	$('.question_1').find('.btn-close').on('click',function(){
			$('.feedback-holder').hide();
		if($(this).attr('data-ui')=='continue')
		{
			$('.FirstState').hide();
			$('.question-holder').addClass('multiselection');
			$('.multiselect').show();
		}
		else if($(this).attr('data-ui')=='close'){
			$('.overlayWorkbook').css('display','flex');
			//$('.cash_statement').show();
			 $('.multiselect').hide();
			/*$('.question-holder').removeClass('multiselection'); */
			
		}
		else{
			setTimeout(function(){$('.feedback-holder').show()},100);
			$('.feedback-holder').find('.btn-close').hide();
			$('.FinalState').find('.feedback-holder').find('.title-text').text('NICE WORK!');
			$('.FinalState').find('.feedback-holder').find('.primary-text p').html('You have successfully completed this quick quiz. If you found yourself having trouble, you are welcome to review the previous section and try again.<br/><span><i>Select the forward arrow below to continue.</i></span>'); 
			complete_page();
			enableNextBtn();
		}
	});
	$('.multiselect').find('.response').on('click',function(){
		if(!$(this).hasClass('disabled'))
		{
			$(this).toggleClass('selected');
		}
	})
	$('.multiselect').find('.submit').on('click',function(){
		$(this).addClass('disabled');
		if($('.multiselect').find('.selected').length==2&&$('.multiselect').find('.response').eq(0).hasClass('selected')&&
		$('.multiselect').find('.response').eq(3).hasClass('selected'))
		{
			$('.multiselect').find('.title-text').text('NICE WORK!');
		}
		else{$('.response').removeClass('selected');}
		$('.multiselect').find('.response').eq(0).addClass('correct');
		$('.multiselect').find('.response').eq(3).addClass('correct');
		$('.multiselect').find('.response').addClass('disabled');
		$('.feedback-holder').show();
	})
	$('.btn-text').on('click',function(){
		var targetId = $(this).attr('data-Id');
	
	
		if(targetId==0)
		{
			$('.cash_statement').show();
			$('.intro-panel').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('NWC = Account Receivable + Cash – Short Term Debt - Account Payable – Other Current Liabilities');
			
			$(this).attr('data-Id','1');
		}
		
	
	
	})
})