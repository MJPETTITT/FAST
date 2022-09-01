var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Refer to the <b>cash flow statement</b> and <b>profit-and-loss statement</b> to find the figures you need.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>profit-and-loss statement</b>."]
var bal_feedback_text=["Remember to refer to the <b>cash flow statement</b> and <b>profit-and-loss statement</b> to find the necessary figures.<br/> (Hint: the total assets should equal the total equity & liabilities).","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the Year 2 <b>balance sheet</b>.<br/><span><i>Select the forward arrow below to continue.</i></span>"];
var getAnswet=[];
var correctAnswer=['4000'];
var cash_bal=14400;
var Fixed_ass=[];
var Current_ass=[];
var showWorkbook=['15200','24100','39300'];
var BS_correctAnswer=['4000','14000','7200','1800','2400','2000','6000','3000','5000','6600','3000','1600','2000'];
var showAnswer=['13600','15800','13200','11000','26800','26800'];
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
			$('.contentStep').html('Using the figures already in your workbook, now update the <b>balance sheet</b>. When all the figures are entered, calculate the figures for Fixed Assets, Current Assets and Total Assets.<br/><br/>Remember that Fixed Assets = Land + Buildings + Machinery. Current Assets = Inventories + Accounts receivable + Cash. Total Assets = Fixed Assets + Current Assets.');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
		}
		else if(targetId==1)
		{
			$('.question').show();
			$('.cash_statement').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('Using the figures already in your workbook, update the <b>balance sheet</b>. The equity   and liabilities figures will be calculated automatically.');
			
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
				var FA = Number($(".balancesheet-input").eq(0).val())+Number($(".balancesheet-input").eq(2).val())+Number($(".balancesheet-input").eq(4).val());
				var CA = Number($(".balancesheet-input").eq(5).val())+Number($(".balancesheet-input").eq(7).val())+Number($(".balancesheet-input").eq(9).val())+Number($(".balancesheet-input").eq(11).val());
				var TA = FA + CA;
				var SE = Number($(".balancesheet-input").eq(1).val())+Number($(".balancesheet-input").eq(3).val());
				var LI = Number($(".balancesheet-input").eq(6).val())+Number($(".balancesheet-input").eq(8).val())+Number($(".balancesheet-input").eq(10).val())+Number($(".balancesheet-input").eq(12).val());
				var TL = SE + LI;
				
				$('.balance_statement').find('.autoFill').eq(0).text(FA); 
				$('.balance_statement').find('.autoFill').eq(1).text(SE); 
				$('.balance_statement').find('.autoFill').eq(2).text(CA); 
				$('.balance_statement').find('.autoFill').eq(3).text(LI); 
				$('.balance_statement').find('.autoFill').eq(4).text(TA); 
				$('.balance_statement').find('.autoFill').eq(5).text(TL); 
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
				$('#btn-workbook').addClass('overlay-btn-highlight');
				changeIndex = 2;
				wbooksubIndex = 2;
				pushWbookClass[48] = 'showData_48';
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
						$('.balance_statement').find('.autoFill').eq(4).text(showAnswer[4]);
						$('.balance_statement').find('.autoFill').eq(5).text(showAnswer[5]);
				}
			}
			else{
				
				$('.question').hide();
				$('.statementPop').show();
				/*  $('.statementPop').find('.title-text').text('BALANCE SHEET: EQUITY & LIABILITIES')
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