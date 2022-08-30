var mapfVisit = true;
var tokenLegend = [['token-key-100','100'],['token-key-1000','1000'],['token-key-5000','5000'],['token-key-rawmat','Raw materials'],['token-key-finishedgoods','Finished goods'],['token-key-wages','Wages']];

var aquaLegends = {	
	supls:{
		txt:'Suppliers',
		lpos:1970,
		tpos:2080,		
		visit:false
	},
	emps:{
		txt:'Employees',
		lpos:2310,
		tpos:1890,		
		visit:false
	},
	fgw:{
		txt:'Finished Goods Warehouse',
		lpos:2500,
		tpos:1450,		
		visit:false
	},
	rmw:{
		txt:'Raw Materials Warehouse',
		lpos:1610,
		tpos:1720,		
		visit:false
	},
	asslines:{
		txt:'Assembly Lines',
		lpos:2140,
		tpos:1490,
		visit:false
	},
	cash:{
		txt:'Cash',
		lpos:1920,
		tpos:1460,		
		visit:false
	},
	post:{
		txt:'Post-it',
		lpos:2160,
		tpos:1300,		
		visit:false
	},
	accspay:{
		txt:'Accounts Payable',
		lpos:1450,
		tpos:1420,		
		visit:false
	},
	bankdt:{
		txt:'Bank Debt',
		lpos:1640,
		tpos:1320,		
		visit:false
	},
	equity:{
		txt:'Equity',
		lpos:1810,
		tpos:1240,		
		visit:false
	},
	accsrec:{
		txt:'Accounts Receivable',
		lpos:1850,
		tpos:1150,
		visit:false
	},			
	cust:{
		txt:'Customers',
		lpos:2660,
		tpos:940,
		visit:false
	},
	propagt:{
		txt:'Property Agent',
		lpos:2380,
		tpos:800,
		visit:false
	},	
	serv:{
		txt:'Services',
		lpos:2210,
		tpos:730,
		visit:false
	},
	tax:{
		txt:'Taxes',
		lpos:1880,
		tpos:460,
		visit:false
	},
	bank:{
		txt:'Bank',
		lpos:1580,
		tpos:620,
		visit:false
	},
	shareholds:{
		txt:'Shareholders',
		lpos:1290,
		tpos:820,
		visit:false
	},
}

var aquaRecent = {
	aquasail_1:{
		elem:['Shareholders','Equity','Cash'],
		value:['0','14,000','14,000'],
		post:{
			elem:['Equity'],
			type:['default'],
			value:['14,000']
		},
		defElem:[],
		defValue:[]		
	},
	aquasail_2:{
		elem:['Bank','Bank Debt','Cash'],
		value:['0','24,000','38,000'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},		
		defElem:['Equity'],
		defValue:['14,000']
	},
	aquasail_3:{
		elem:['Property Agent','Cash','Suppliers'],
		value:['12,000','21,200','4,800'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['24,000','14,000']
	},
	aquasail_4:{
		elem:['Cash','Raw Materials Warehouse','Suppliers'],
		value:['17,200','4,000','0'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['24,000','14,000']
	},
	aquasail_5:{
		elem:['Cash','Raw Materials Warehouse','Employees'],
		value:['15,200','0','0'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity','Assembly Lines'],
		defValue:['24,000','14,000','6,000']
	},
	aquasail_6:{
		elem:['Cash','Services','Finished Goods Warehouse'],
		value:['14,400','800','4 boats'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['24,000','14,000']
	},
	aquasail_7:{
		elem:['Cash','Finished Goods Warehouse','Customers'],
		value:['23,200','0 boats','4 boats'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['24,000','14,000']
	},
	aquasail_8:{
		elem:['Cash','Raw Materials Warehouse','Suppliers'],
		value:['17,200','6,000','0'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['24,000','14,000']
	},
	aquasail_9:{
		elem:['Cash','Raw Materials Warehouse','Employees'],
		value:['15,200','2,000','0'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity','Assembly Lines'],
		defValue:['24,000','14,000','6,000']
	},
	aquasail_10:{
		elem:['Cash','Services','Finished Goods Warehouse'],
		value:['14,400','800','4 boats'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity','Raw Materials Warehouse'],
		defValue:['24,000','14,000','2,000']
	},
	aquasail_11:{
		elem:['Cash','Finished Goods Warehouse','Customers'],
		value:['21,000','1 boat','3 boats'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity','Raw Materials Warehouse'],
		defValue:['24,000','14,000','2,000']
	},
	aquasail_12:{
		elem:['Cash','Raw Materials Warehouse','Suppliers'],
		value:['21,000','6,000','0'],
		post:{
			elem:['Bank Debt','Equity'],
			type:['default','default'],
			value:['24,000','14,000']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['24,000','14,000']
	},
	aquasail_13:{
		elem:['Cash','Raw Materials Warehouse','Employees','Assembly Lines'],
		value:['19,000','2,000','0','6,000'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable'],
			type:['default','default','invoice'],
			value:['24,000','14,000','4,000']
		},
		defElem:['Bank Debt','Equity','Accounts Payable'],
		defValue:['24,000','14,000','4,000']
	},
	aquasail_14:{
		elem:['Cash','Services','Finished Goods Warehouse'],
		value:['18,200','800','4 boats'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable'],
			type:['default','default','invoice'],
			value:['24,000','14,000','4,000']
		},
		defElem:['Bank Debt','Equity','Accounts Payable','Raw Materials Warehouse'],
		defValue:['24,000','14,000','4,000','2,000']
	},
	aquasail_15:{
		elem:['Cash','Finished Goods Warehouse','Customers'],
		value:['22,600','2 boats','2 boats'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable'],
			type:['default','default','invoice'],
			value:['24,000','14,000','4,000']
		},
		defElem:['Bank Debt','Equity','Accounts Payable','Raw Materials Warehouse'],
		defValue:['24,000','14,000','4,000','2,000']
	},
	aquasail_16:{
		elem:['Cash','Raw Materials Warehouse','Suppliers','Accounts Payable'],
		value:['18,600','6,000','0','4000'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable'],
			type:['default','default','invoice'],
			value:['24,000','14,000','4,000']
		},
		defElem:['Bank Debt','Equity','Finished Goods Warehouse'],
		defValue:['24,000','14,000','2 boats']
	},
	aquasail_17:{
		elem:['Cash','Raw Materials Warehouse','Employees','Finished Goods Warehouse','Accounts Receivable','Customers','Services'],
		value:['15,800','2,000','0','4 boats','0','2 boats','800'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable','Customers'],
			type:['default','default','invoice','invoice'],
			value:['24,000','14,000','4,000','4,400']
		},
		defElem:['Bank Debt','Equity','Accounts Payable'],
		defValue:['24,000','14,000','4,000']
	},
	aquasail_18:{
		elem:['Bank','Bank Debt','Cash'],
		value:['5,400','21,000','10,400'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable','Customers'],
			type:['default','default','invoice','invoice'],
			value:['21,000','14,000','4,000','4,400']
		},
		defElem:['Equity','Accounts Payable','Finished Goods Warehouse','Raw Materials Warehouse'],
		defValue:['14,000','4,000','4 boats','2,000']
	},
	aquasail_19:{
		elem:['Taxes','Cash'],
		value:['200','10,200'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable','Customers'],
			type:['default','default','invoice','invoice'],
			value:['21,000','14,000','4,000','4,400']
		},
		defElem:['Bank Debt','Equity','Accounts Payable','Finished Goods Warehouse','Raw Materials Warehouse'],
		defValue:['21,000','14,000','4,000','4 boats','2,000']
	},
	aquasail_20:{
		elem:['Bank','Bank Debt','Cash'],
		value:['9,000','12,000','1,200'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable','Customers'],
			type:['default','default','invoice','invoice'],
			value:['12,000','14,000','4,000','4,400']
		},
		defElem:['Equity','Accounts Payable','Finished Goods Warehouse','Raw Materials Warehouse'],
		defValue:['14,000','2,000','4 boats','2,000']
	},
	aquasail_21:{
		elem:['Suppliers','Employees','Finished Goods Warehouse','Raw Materials Warehouse','Cash','Accounts Payable','Accounts Receivable','Customers','Services'],
		value:['0','0','3 boats','2,000','0','2,000','0','3 boats','600'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable','Customers'],
			type:['default','default','invoice','invoice'],
			value:['21,000','14,000','2,000','6,600']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['12,000','14,000']
	},
	aquasail_22:{
		elem:['Suppliers','Employees','Finished Goods Warehouse','Raw Materials Warehouse','Cash','Accounts Payable','Accounts Receivable','Customers','Services'],
		value:['0','0','1 boat','2,000','3,000','2,000','0','4 boats','600'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable','Customers'],
			type:['default','default','invoice','invoice'],
			value:['12,000','14,000','2,000','8,800']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['12,000','14,000']
	},
	aquasail_23:{
		elem:['Suppliers','Employees','Finished Goods Warehouse','Raw Materials Warehouse','Cash','Accounts Payable','Accounts Receivable','Customers','Services'],
		value:['0','0','6 boats','2,000','8,200','2,000','0','1 boat','600'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable','Customers'],
			type:['default','default','invoice','invoice'],
			value:['12,000','14,000','2,000','2,200']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['12,000','14,000']
	},
	aquasail_24:{
		elem:['Suppliers','Employees','Finished Goods Warehouse','Raw Materials Warehouse','Cash','Accounts Payable','Accounts Receivable','Customers','Services'],
		value:['0','0','5 boats','2,000','6,800','2,000','0','3 boats','600'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable','Customers'],
			type:['default','default','invoice','invoice'],
			value:['12,000','14,000','2,000','6,600']
		},
		defElem:['Bank Debt','Equity'],
		defValue:['12,000','14,000']
	},
	aquasail_25:{
		elem:['Bank','Bank Debt','Cash'],
		value:['4,200','9,000','1,600'],
		post:{
			elem:['Bank Debt','Equity','Accounts Payable','Customers'],
			type:['default','default','invoice','invoice'],
			value:['9,000','14,000','2,000','6,600']
		},
		defElem:['Equity','Accounts Payable','Finished Goods Warehouse','Raw Materials Warehouse'],
		defValue:['14,000','4,000','3 boats','2,000']
	}
}

var recentColor = "#ff6a13";
var defaultColor = "#981d97";

function setRecentAquasail(){
	createAquasail();
	$.each(aquaRecent['aquasail_'+aquasilVisitPos]['elem'], function(ind,elem){		
		$('[data-label="'+elem+'"]').attr('data-color',recentColor);
		$('[data-label="'+elem+'"]').find('.item-label').css('background-color',recentColor);
		$('[data-label="'+elem+'"]').find('.item-icon').children().css('background-color',recentColor);		
		$('[data-label="'+elem+'"]').find('.item-icon').css('border-color',recentColor);
		var getValue = aquaRecent['aquasail_'+aquasilVisitPos]['value'][ind];
		$('[data-label="'+elem+'"]').find('.total-value').text(getValue);
	});
	
	$.each(aquaRecent['aquasail_'+aquasilVisitPos]['defElem'], function(ind,elem){		
		$('[data-label="'+elem+'"]').attr('data-color',defaultColor);
		$('[data-label="'+elem+'"]').find('.item-label').css('background-color',defaultColor);
		$('[data-label="'+elem+'"]').find('.item-icon').children().css('background-color',defaultColor);		
		$('[data-label="'+elem+'"]').find('.item-icon').css('border-color',defaultColor);
		var getValue = aquaRecent['aquasail_'+aquasilVisitPos]['defValue'][ind];
		$('[data-label="'+elem+'"]').find('.total-value').text(getValue);
	});
	
	for(var i=0;i<aquaRecent['aquasail_'+aquasilVisitPos]['post']['elem'].length;i++){
		var childElem = aquaRecent['aquasail_'+aquasilVisitPos]['post']['elem'][i]
		var childVal = aquaRecent['aquasail_'+aquasilVisitPos]['post']['value'][i];
		var childType = aquaRecent['aquasail_'+aquasilVisitPos]['post']['type'][i];
		var currentIcon = (childType == 'default')?'token-i-postit':'token-i-invoice';
		$('[data-label="'+childElem+'"]').find('.item-content').find('.postit-holder').remove();
		var setValue = $('[data-label="'+childElem+'"]').find('.total-value').text();
		$('[data-label="'+childElem+'"]').find('.item-content').append('<div class="postit-holder special-holder"><div class="postit-icon"></div><div class="special-value">'+childVal+'</div></div>');		
		$('[data-label="'+childElem+'"]').find('.postit-icon').css('background-image','url(assets/images/'+currentIcon+'.png)').css('background-size','100% 100%');
	}
}

function showZoomNav()
	{		
		$('.zoompan').append('<div class="navBox"></div>');
		$('.navBox').append('<div class="legend"></div>');
		$('.navBox').append('<div id="map-btn"></div><div class="zoom-holder"><button data-ui="zoomIn" class="zoom-in" id="zoomIn" style="outline:none"></button><button data-ui="zoomOut" id="zoomOut" class="zoom-out" style="outline:none"></button></div><div class="pan-holder"><button data-ui="pan" data-direction="left" id="leftMov" class="btnCanvas pan-btn"  style="outline:none"></button><button data-ui="pan" data-direction="right" class="btnCanvas pan-btn" id="rightMov" style="outline:none"></button><button data-ui="pan" data-direction="down" class="btnCanvas pan-btn" id="bottomMov" style="outline:none"></button><button data-ui="pan" id="topMov" data-direction="up" class="btnCanvas pan-btn" style="outline:none"></button></div>');			
		$('.navBox').append('<div class="dummyNav"></div>');
		$('#map-btn').off('click').on('click', showKeyLegend);
		$('.legend').append('<h3>TOKEN KEY</h3>');
		for(var i=0;i<tokenLegend.length;i++){
			$('.legend').append('<img class="tokenimgs" src="assets/images/'+tokenLegend[i][0]+'.svg" /><span>'+tokenLegend[i][1]+'</span><br/>')
		}					
		$('.zoompan,.legend').css('display','none');
		$('#zoomIn').off('click');
		
		$("#map-btn").hover(function(event) {
			$(this).css('background-color','#2a2867');
		},function (event) {
			$(this).css('background-color',activeCol);
		});	
	}

var activeCol = "#981d97";	
var showKeyLegend = function(){
	$('#map-btn').removeClass('animating');
	mapfVisit = false;
	var legenddis = $('.legend').css('display');	
	if(legenddis == 'none'){
		$('.legend,.legendAqua').fadeIn(200, function(){
			$('.legendAqua').css('display','block');
		});
		activeCol = '#e31c79';
		$('#map-btn').css('background-color',activeCol);	
	}	
	else
	{
		$('.legend,.legendAqua').fadeOut(200);
		activeCol = '#981d97';		
	}
}



