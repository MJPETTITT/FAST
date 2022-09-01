$(document).ready(function(){

	$('.activityContainer').fadeIn();
	 complete_page();
	// enableNextBtn(); 
	 disableNextBtn();
	$('.complete_course').off('click').on('click', function(){
		//if($(this).hasClass("sim_completed"))
		//$(this).text("CLOSE THE SIMULATION").addClass("sim_completed");
		enableNextBtn(); 
		disableNextBtn();
		var getPath = $(this).attr('data-path');
		window.open(getPath, '_blank', 'width=1024, height=768');
		doLMSSetValue("cmi.core.lesson_status","completed");
		doLMSSetValue("cmi.core.score.raw","100");
		doLMSCommit();
		
	});
})