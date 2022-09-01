$(document).ready(function(){
	$('.activityContainer').fadeIn();
	$('#btn-workbook').addClass('overlay-btn-highlight');
	changeIndex = 0;
	wbooksubIndex = 2;
	complete_page();
	enableNextBtn();
})