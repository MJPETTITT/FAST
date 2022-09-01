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
			if($(this).attr('data-index')=='1'){
				$(this).addClass('correct');
				$('.FirstState').find('.feedback-holder').find('.title-text').text('NICE WORK!');
			}
			else{
				$('.FirstState').find('.response').eq(1).addClass('correct');
				$(this).addClass('incorrect');
			}
		}
		$('.feedback-holder').show();
		$('.FirstState').find('.response').addClass('disabled');
		/* complete_page();
		enableNextBtn(); */
	})
	$('.SecondState').find('.response').on('click',function(){
		if(!$(this).hasClass('disabled'))
		{
			if($(this).attr('data-index')=='2'){
				$(this).addClass('correct');
				$('.SecondState').find('.feedback-holder').find('.title-text').text('NICE WORK!');
			}
			else{
				$('.SecondState').find('.response').eq(2).addClass('correct');
				$(this).addClass('incorrect');
			}
		}
		$('.feedback-holder').show();
		$('.SecondState').find('.response').addClass('disabled');		
	})
	$('.FinalState').find('.response').on('click',function(){
		console.log($(this).attr('data-index'))
		if(!$(this).hasClass('disabled'))
		{
			if($(this).attr('data-index')=='0'){
				$(this).addClass('correct');
				$('.FinalState').find('.feedback-holder').find('.title-text').text('NICE WORK!');
				/* $('.FinalState').find('.feedback-holder').find('.primary-text p').text('Adecco’s liquidity risk is low as the net working capital is much higher than the working capital requirement.');  */
			}
			else{
				$('.FinalState').find('.response').eq(0).addClass('correct');
				$(this).addClass('incorrect');
				/* $('.FinalState').find('.feedback-holder').find('.title-text').text('Not Quite');
				$('.FinalState').find('.feedback-holder').find('.primary-text p').text('Adecco’s liquidity risk is low as the net working capital is much higher than the working capital requirement.');  */
			}
		}
		$('.feedback-holder').show();
		$('.FinalState').find('.response').addClass('disabled');
		/* complete_page();
		enableNextBtn(); */
		
	})
	$('.question_1').find('.btn-close').on('click',function(){
			$('.feedback-holder').hide();
		if($(this).attr('data-ui')=='continue1')
		{
			$('.question-holder').addClass('multiselection');
			$('.question_1').hide();
			$('.multiselect').show();
			//$('.SecondState').css('display','flex');
		}
		else if($(this).attr('data-ui')=='close'){
			$('.question-holder').removeClass('multiselection');
			$('.question_1').hide();
			$('.FinalState').css('display','flex');
			//$('.multiselect').hide();
		}
		else if($(this).attr('data-ui')=='continue2')
		{
			$('.question_1').hide();
			$('.FinalState').css('display','flex');
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
		$('.multiselect').find('.response').eq(2).hasClass('selected'))
		{
			$('.multiselect').find('.title-text').text('NICE WORK!');
		}
		else{$('.response').removeClass('selected');}
		$('.multiselect').find('.response').eq(0).addClass('correct');
		$('.multiselect').find('.response').eq(2).addClass('correct');
		$('.multiselect').find('.response').addClass('disabled');
		$('.feedback-holder').show();
	})
})