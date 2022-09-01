var dot_count=1;
$(document).ready(function(){
	$('.activityContainer').fadeIn();
	$('.overlayWorkbook').css('display','flex');
	//AOS.init();
	$('.btn-text').on('click',function(){
		
		var targetId = $(this).attr('data-Id');
		if(targetId==0)
		{	
			$('.overlayWorkbook').hide();
			$('.content-blocks-holder').show();
			
			$(this).attr('data-Id','1');
		}
		complete_page();
		enableNextBtn();
	})
})