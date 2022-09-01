var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Refer to the <b>cash flow statement</b> and <b>profit-and-loss statement</b> to find the figures you need.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>profit-and-loss statement</b>.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var bal_feedback_text=["Calculate EBIT by subtracting the total <b>cost of goods sold</b> (5700) from sales (6600).","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>profit-and-loss statement</b>.<br/><span><i>Select the forward arrow below to continue.</i></span>"];
var getAnswet=[];
var correctAnswer=['4000','7600','3600','2000','7500','4400','10200'];
var cash_bal=14400;
var Fixed_ass=[];
var Current_ass=[];
var showWorkbook=['15200','24100','39300'];
var BS_correctAnswer=['14000','300','18000','3000','4000'];
var showAnswer=['14300','25000','7000','39300'];
var tot_equity=['','','','',''];
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
			$('.balance_statement').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('Using the figures in the <b>cash flow statement</b> and <b>profit and loss statement</b> in the workbook (make sure you select the Year 1 statements), update the <b>balance sheet</b>. You only have to fill in the boxes in bold.');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
			$('.downToggle').trigger('click');
		}
		else if(targetId==1)
		{
			$('.question').show();
			$('.cash_statement').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('Now, using the figures already in your workbook, update the <b>balance sheet</b> in order to calculate the figures for Equity & Liabilities.<br/><br/>Liabilities = long term debt + current liabilities. Shareholders\' Equity = capital + retained profits. Total Equity & Liabilities = Shareholders\' Equity + Liabilities');
			
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','2');
			
			correctAnswer=BS_correctAnswer;
			feedback_text=bal_feedback_text;
			clickCount=1;
			getAnswet=[];
		}
		
	
	
	})
	
	$('.submit').on('click',function(){
		if($('.balance_statement').css('display')=='none'||!$('.question').hasClass('balance_statement')){
			$('.workbook-input').each(function(i,k){
				//console.log($(".workbook-input").eq(i).val())
				
				getAnswet[i]=$('.workbook-input').eq(i).val();
				if(getAnswet[i]==correctAnswer[i])
				{
					$('.workbook-input').eq(i).parent().removeClass('incorrect').addClass('correct')
					$('.workbook-input').eq(i).attr('disabled','disabled')
				}
				else{
					$('.workbook-input').eq(i).parent().addClass('incorrect')
				}
				if(i<3)
				Fixed_ass[i]=Number($(".workbook-input").eq(i).val())
				else
				Current_ass[i]=Number($(".workbook-input").eq(i).val())
				/* var autofillVal=Number($(".workbook-input").eq(i).val())+cash_bal;
				$('.cash_statement').find('.autoFill').eq(i).text(autofillVal); */
			})
			var FA=Fixed_ass.reduce(getSum);
			var CA=Current_ass.reduce(getSum);
			$('.cash_statement').find('.autoFill').eq(0).text(FA);
			$('.cash_statement').find('.autoFill').eq(1).text(CA);
			$('.cash_statement').find('.autoFill').eq(2).text(Number(FA)+Number(CA));
			
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
				var SE = Number($(".balancesheet-input").eq(0).val())+Number($(".balancesheet-input").eq(1).val())
				var CBD = Number($(".balancesheet-input").eq(3).val())+Number($(".balancesheet-input").eq(4).val())
				var LI = Number($(".balancesheet-input").eq(2).val())+CBD;
				$('.balance_statement').find('.autoFill').eq(0).text(SE); 
				$('.balance_statement').find('.autoFill').eq(1).text(LI); 
				$('.balance_statement').find('.autoFill').eq(2).text(CBD); 
				$('.balance_statement').find('.autoFill').eq(3).text(SE+LI); 
			})
		}
		if(JSON.stringify(getAnswet)==JSON.stringify(correctAnswer)) {
			$('.submit').addClass('disabled');
			//$('.cash_statement').find('.autoFill').removeClass('autoFill');
			$('.feedback-holder').hide();
			$('.feedback-holder').find('.title-text').html(feedback_title[2]);
			$('.feedback-holder').find('.primary-text p').html(feedback_text[2]);
			 if($('.balance_statement').css('display')=='block'||!$('.question').hasClass('balance_statement')){ 
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');  
				$('.feedback-holder').find('.btn-close').hide();
				changeIndex = 2;
				wbooksubIndex = 1;
				pushWbookClass[30] = 'showData_30';
				complete_page();
				enableNextBtn();
			 }
			else{
				//$('.cash_statement').find('.submit').remove();
				$('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
				$('.feedback-holder').find('.show').text('NEXT');
				//pushWbookClass[29] = 'showData_29';	
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
				if($('.balance_statement').css('display')=='none'||!$('.question').hasClass('balance_statement')){
					$('.workbook-input').each(function(i,k){
						$('.workbook-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.workbook-input').eq(i).parent().removeClass('incorrect');
						/* var autofillVal=Number(correctAnswer[i])+cash_bal;
						$('.cash_statement').find('.autoFill').eq(i).text(autofillVal); */
					});
					$('.cash_statement').find('.autoFill').eq(0).text(showWorkbook[0]);
					$('.cash_statement').find('.autoFill').eq(1).text(showWorkbook[1]);
					$('.cash_statement').find('.autoFill').eq(2).text(showWorkbook[2]);
				}
				else{
					$('.balancesheet-input').each(function(i,k){
						$('.balancesheet-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.balancesheet-input').eq(i).parent().removeClass('incorrect');
						//var autofillVal=Number(correctAnswer[i])+cash_bal;
					})
						$('.balance_statement').find('.autoFill').eq(0).text(showAnswer[0]);
						$('.balance_statement').find('.autoFill').eq(1).text(showAnswer[1]);
						$('.balance_statement').find('.autoFill').eq(2).text(showAnswer[2]);
						$('.balance_statement').find('.autoFill').eq(3).text(showAnswer[3]);
				}
			}
			else{
				
				$('.question').hide();
				$('.statementPop').show();
				/* $('.statementPop').find('.title-text').text('BALANCE SHEET: EQUITY & LIABILITIES')
				 $('.statementPop').find('.primary-text').html('<p>Now, using the figures already in your workbook, update the <b>balance sheet</b> in order to calculate the figures for Equity & Liabilities.</p><p>Equity is comprised of capital, which did not change, and retained profits of Year 1.</p>Short term liabilities include the unpaid invoice to the suppliers (Accounts Payable) and the remaining part of the <b>bank debt</b>, that will have to be paid within the year. Remember that Aquasail has to repay 3000 annually to the bank. Long term debt is then the remaining <b>bank debt</b> that is due in the long term, or in more than a year.</p><p>current liabilities = current bank debt + accounts payable</p>');
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');
				
				$('.move-box-holder').hide(); */
				
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