$(document).ready(function(){
	$('.activityContainer').fadeIn();
	$('.overlayWorkbook').css('display','flex');
	
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
	//$('.downToggle').off('click').on('click', toggleContent);
	$('.FinalState').find('.response').on('click',function(){
		console.log($(this).attr('data-index'))
		if(!$(this).hasClass('disabled'))
		{
			if($(this).attr('data-index')=='2'){
				$(this).addClass('correct');
				$('.FinalState').find('.feedback-holder').find('.title-text').text('NICE WORK!');
			}
			else{
				$('.FinalState').find('.response').eq(2).addClass('correct');
				$(this).addClass('incorrect');
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
			$('.question_1').hide();
			//$('.question-holder').addClass('multiselection');
			$('.FinalState').css('display','flex');
		}
		else{
			setTimeout(function(){$('.feedback-holder').show()},100);
			$('.feedback-holder').find('.btn-close').hide();
			$('.FinalState').find('.feedback-holder').find('.title-text').text('NICE WORK!');
			$('.FinalState').find('.feedback-holder').find('.primary-text').html('<p>You have successfully completed this quick quiz. If you found yourself having trouble, you are welcome to review the previous section and try again.<br/><span><i>Select the forward arrow below to continue.</i></span></p>'); 
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