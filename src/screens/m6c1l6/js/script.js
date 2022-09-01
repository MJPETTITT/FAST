var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Calculate the cash balance as a result of the 8800 sales cash inflow.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>cash flow statement</b>.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var bal_feedback_text=["Refer to the workbook overlay to find the correct figure for sales. Operating costs will match previous quarters.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>profit-and-loss statement</b>.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var getAnswet=[];
var correctAnswer=['8800'];
var cash_bal=14400;
var BS_correctAnswer=['6600','2000','1000','600','400','4000','1500','5500','1100'];
var showAnswer=['','',''];
var tot_equity=['','','','','',''];
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
			$('.question1').show();
			$('.move-box-holder').show();
			$('.contentStep').html('Update the Quarter 1 <b>profit-and-loss statement</b> to show the revenues, and the cost of raw materials, wages and services from Year 1, Quarter 1.<br/><br/><b>Operating revenues</b>: sales=8800. <b>Operating costs</b>: raw materials used = 4000, labour costs = 2000, services = 800');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
		}
		else if(targetId==1)
		{
			$('.question').show();
			$('.move-box-holder').show();
			$('.contentStep').html('Now, update the Quarter 1 <b>profit-and-loss statement</b> to add the operating revenues and operating costs as well as depreciations in Quarter 1 of 400. Remember that you sold 3 boats and built 2 new ones.<br/><br/>Then, calculate the total cost of production by adding all the operating costs together.<br/><br/>Add 1500 into the <b>inventory finished goods</b> line.<br/><br/>Calculate Quarter 1 EBIT by subtracting the total <b>cost of goods sold</b> in Quarter 1 from sales in Quarter 1.');
			
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
				//$('.balance_statement').find('.autoFill').eq(2).text(EBIT);
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
				$('#btn-workbook').addClass('overlay-btn-highlight');
				changeIndex = 3;
				wbooksubIndex = 1;
				pushWbookClass[38] = 'showData_38';
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
						var autofillVal=Number(correctAnswer[i])+cash_bal;
						$('.cash_statement').find('.autoFill').eq(i).text(autofillVal);
					});
				}
				else{
					$('.balancesheet-input').each(function(i,k){
						$('.balancesheet-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.balancesheet-input').eq(i).parent().removeClass('incorrect');
						//var autofillVal=Number(correctAnswer[i])+cash_bal;
						//$('.balance_statement').find('.autoFill').eq(i).text(showAnswer[i]);
					})
				}
			}
			else{
				
				$('.question').hide();
				$('.statementPop').show();
				/*$('.statementPop').find('.title-text').text('CASH STATEMENT: LABOUR')
				 $('.statementPop').find('.primary-text').html('<p>Now, update the Year 1, Quarter 1 Cash Statement to record the Cash outflow of 2000 in Wages and the impact of that Cash outflow on the Cash Balance.</p>');
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');
				
				$('.workbook-input').each(function(i,k){
					$('.cash_statement').find('.workbook-input').eq(i).parent().html($('.workbook-input').eq(i).val()).removeClass('correct').addClass('static');
				}); */
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