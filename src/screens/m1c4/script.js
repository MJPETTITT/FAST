$(document).ready(function(){
$('.activityContainer').show();
	$('.activityContainer').fadeIn();
	$('.node').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.node').mouseleave(function(){
		$('.node').removeClass('over');
	})
	$('.node').click(function(){
		var visited=true;
		$('.node').removeClass('active');
		$(this).addClass('active').addClass('visited');
		$('.node').each(function(i){
			if(!$('.node').eq(i).hasClass('visited'))
			visited=false;
			
		})
		if(visited){
			complete_page()
			enableNextBtn()
		}
	})
	
})