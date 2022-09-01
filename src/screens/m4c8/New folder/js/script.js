﻿var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Refer to the <b>balance sheet</b> to find the figures you need to calculate the net working capital.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly calculated the net working capital."]
var bal_feedback_text=["Refer to the <b>balance sheet</b> to find the figures you need to calculate the working capital requirement.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly calculated the working capital requirement."]
var getAnswet=[];
var correctAnswer=['24100','7000'];
var cash_bal=['17100'];
var BS_correctAnswer=['4400','9500','4000'];
var showAnswer=['9900'];
var tot_equity=['','14000'];
var clickCount=1;			
var new_page=false;

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
			$('.contentStep').html('Calculate the net working capital. The figures you need to do this are in the <b>balance sheet</b> - note that current liabilities are recorded in the <b>balance sheet</b> as current debt.');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
		}
		else if(targetId==1)
		{
			$('.question').hide();
			$('.question1').show();
			$('.move-box-holder').show();
			$('.contentStep').html('Calculate the working capital requirement. The figures you need to do this are in the <b>balance sheet</b> - note that current liabilities are recorded in the <b>balance sheet</b> as current debt.');
			
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
				//var autofillVal=Number($(".workbook-input").eq(i).val())+Number(cash_bal[i]);
			})
				var NWC = Number($(".workbook-input").eq(0).val())-Number($(".workbook-input").eq(1).val());
				$('.cash_statement').find('.autoFill').eq(0).text(NWC);
				
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
			})
				var WCR=Number($(".balancesheet-input").eq(0).val())+Number($(".balancesheet-input").eq(1).val())-Number($(".balancesheet-input").eq(2).val())
				$('.balance_statement').find('.autoFill').eq(0).text(WCR);
		}
		if(JSON.stringify(getAnswet)==JSON.stringify(correctAnswer)) {
			$('.submit').addClass('disabled');
			//$('.cash_statement').find('.autoFill').removeClass('autoFill');
			$('.feedback-holder').hide();
			$('.feedback-holder').find('.title-text').html(feedback_title[2]);
			$('.feedback-holder').find('.primary-text p').html(feedback_text[2]);

			if($('.question1').css('display')=='block'||!$('.question').hasClass('question1')){ 
				/* $('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text(''); 
				$('.feedback-holder').find('.btn-close').hide();*/  
				changeIndex = 4;
				wbooksubIndex = 0;
				pushWbookClass[33] = 'showData_33';
				
				$('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
				$('.feedback-holder').find('.show').text('NEXT');
				new_page=true;
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
		console.log("dfghdsfhgfd",$('.feedback-holder').find('.show').text())
			if($('.feedback-holder').find('.show').text()=='SHOW ME')
			{
				$('.submit').addClass('disabled');
				$('.incorrect input').val('');
				console.log($('.question1').css('display')=='none'||!$('.question').hasClass('question1'),$('.question1').css('display')=='none',!$('.question').hasClass('question1'))
				if($('.question1').css('display')=='none'||!$('.question').hasClass('question1')){
					$('.workbook-input').each(function(i,k){
						$('.workbook-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.workbook-input').eq(i).parent().removeClass('incorrect');
						//var autofillVal=Number(correctAnswer[i])+cash_bal;
					});
						$('.cash_statement').find('.autoFill').eq(0).text(cash_bal[0]);
						$('.cash_statement').find('.autoFill').eq(1).text(cash_bal[1]);
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
			else if($('.feedback-holder').find('.show').text()=='NEXT')
			{	
				if(!new_page){
					$('.question').hide();
					$('.question1').show();
					$('.move-box-holder').show();
					$('.contentStep').html('Calculate the working capital requirement. The figures you need to do this are in the </b>balance sheet</b> - note that current liabilities are recorded in the <b>balance sheet</b> as current debt.');
					
					$('.intro-panel').hide();
					$('.overlayDiv').hide();
					$(this).attr('data-Id','2');
					
					correctAnswer=BS_correctAnswer;
					feedback_text=bal_feedback_text;
					clickCount=1;
					$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
					$('.feedback-holder').find('.show').text('');
					/*$('.question').hide();
					$('.statementPop').show();
					$('.statementPop').find('.title-text').text('CASH STATEMENT: LABOUR')
					 $('.statementPop').find('.primary-text').html('<p>Now, update the Year 1, Quarter 1 Cash Statement to record the Cash outflow of 2000 in Wages and the impact of that Cash outflow on the Cash Balance.</p>');
					$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
					$('.feedback-holder').find('.show').text('');
					
					$('.workbook-input').each(function(i,k){
						$('.cash_statement').find('.workbook-input').eq(i).parent().html($('.workbook-input').eq(i).val()).removeClass('correct').addClass('static');
					}); */
				}
				else{
					$('.question').hide();
					$('.new_page').show();
					complete_page();
					enableNextBtn();
				}
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