$(document).ready(function(){
	$('.activityContainer').fadeIn();
	$('#text-entry-input').on('keyup change',function(){
		if($('#text-entry-input').val().length!=0)
		$('.submit').removeClass('disabled'); 
		else
		$('.submit').addClass('disabled'); 
	}); 
	$('.submit').on('click',function(){
		$('#text-entry-input').attr('disabled','disabled'); 
		$('.submit').addClass('disabled'); 
		$('.feedback-holder').show();
		complete_page();
		enableNextBtn();
	})
})