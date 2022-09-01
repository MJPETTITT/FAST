var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Calculate the cash balance and cash at end by subtracting 200 from 10400.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly updated the <b>cash flow statement</b>."]
var bal_feedback_text=["Calculate the profit/loss after tax but adding the EBIT, interest costs, profit/loss before tax, and taxes (40%). Don't forget to add interest costs and tax as minus values.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have correctly calculated the profit/loss after tax.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var getAnswet=[];
var correctAnswer=['-200'];
var cash_bal=['10400'];
var BS_correctAnswer=['-2400','500','-200','300'];
var showAnswer=['7200','4200','200'];
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
			$('.question1').hide();
			$('.move-box-holder').show();
			$('.contentStep').html('Update the Year 1 <b>cash flow statement</b> to show this payment of tax of 200.');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
		}
		else if(targetId==1)
		{
			$('.question').show();
			$('.move-box-holder').show();
			$('.contentStep').html('Update the <b>profit-and-loss statement</b>. Record ‘-200’ in the taxes (40%) row. Remember, your EBIT is 2900, interest is 2400 (record as -2400 in the statement), and profit/loss before tax is 500. You should now also be able to calculate the profit after tax!');
			
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
				var autofillVal=Number($(".workbook-input").eq(i).val())+Number(cash_bal[i]);
				console.log($(".workbook-input").eq(i).val(),cash_bal[i])
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
				tot_equity[i]=Number($(".balancesheet-input").eq(i).val());
				if(i==0||i==5)tot_equity[i]=0;
			})
				var Cost_of_Goods_Sold = Number(tot_equity.reduce(getSum))+Number($(".balancesheet-input").eq($(".balancesheet-input").length-1).val());
				var EBIT = $(".balancesheet-input").eq(0).val()-Cost_of_Goods_Sold;
				console.log(Cost_of_Goods_Sold,EBIT)
				$('.balance_statement').find('.autoFill').eq(0).text(tot_equity.reduce(getSum));
				$('.balance_statement').find('.autoFill').eq(1).text(Cost_of_Goods_Sold);
				$('.balance_statement').find('.autoFill').eq(2).text(EBIT);
		}
		if(JSON.stringify(getAnswet)==JSON.stringify(correctAnswer)) {
			$('.submit').addClass('disabled');
			//$('.cash_statement').find('.autoFill').removeClass('autoFill');
			$('.feedback-holder').hide();
			$('.feedback-holder').find('.title-text').html(feedback_title[2]);
			$('.feedback-holder').find('.primary-text p').html(feedback_text[2]);
			console.log($('.question1').css('display')=='block',!$('.question').hasClass('question1'))
			 if($('.question1').css('display')=='block'||!$('.question').hasClass('question1')){ 
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');  
				$('.feedback-holder').find('.btn-close').hide();
				changeIndex = 3;
				wbooksubIndex = 0;
				pushWbookClass[29] = 'showData_29';
				complete_page();
				enableNextBtn();
			 }
			else{
				$('.cash_statement').find('.submit').remove();
				$('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
				$('.feedback-holder').find('.show').text('NEXT');
				changeIndex = 1;
				wbooksubIndex = 1;
				pushWbookClass[28] = 'showData_28';
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
						var autofillVal=Number(correctAnswer[i])+Number(cash_bal[i]);
						$('.cash_statement').find('.autoFill').eq(i).text(autofillVal);
					});
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
			else{
				
				$('.question').hide();
				$('.statementPop').show();
				$('.move-box-holder').hide();
				
				$('.statementPop').find('.title-text').text('PROFIT AFTER TAXES')
				 $('.statementPop').find('.primary-text').html('<p>Now, update the <b>profit-and-loss statement</b>. Record -200 in the taxes (40%) row. Remember, your EBIT is 2900, Interest is 2400 (record as -2400 in the statement), and profit/loss after tax is 500. You should now also be able to calculate the profit after tax!</p>');
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');
				
				$('.cash_statement').find('.numbers90').each(function(i,k){
					$('.cash_statement').find('.numbers90').eq(i).html($('.numbers90').eq(i).children().val()).removeClass('correct').addClass('static');					
				}); 
				//$('.cash_statement').find('#workbook2_child0').append('<div class="subitem1 subitem0"><span class="item boldLato">Cash at End</span><span class="item"><span class="numbers90 static">15800</span></span></div> ')
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
			console.log("sdfdsgsd",numKey,numKey != 8 && numKey != 0 && numKey != 45 && (numKey < 48 || numKey > 57))
			if (numKey != 8 && numKey != 0 && numKey != 45 && (numKey < 48 || numKey > 57)) {        
				return false;
		}
	});
	function getSum(total, num) {
	  return total + num;
	}
})