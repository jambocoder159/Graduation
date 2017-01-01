$(function(){
	// 預設顯示第一個 Tab
	var _showTab = 0;
	var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
	$($defaultLi.find('a').attr('href')).siblings().hide();
	
	// 當 li 頁籤被點擊時...
	// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
	$('ul.tabs li').click(function() {
		// 找出 li 中的超連結 href(#id)
		var $this = $(this),
			_clickTab = $this.find('a').attr('href');
		// 把目前點擊到的 li 頁籤加上 .active
		// 並把兄弟元素中有 .active 的都移除 class
		$this.addClass('active').siblings('.active').removeClass('active');
		// 淡入相對應的內容並隱藏兄弟元素
		$(_clickTab).stop(false, true).fadeIn().siblings().hide();

		return false;
	}).find('a').focus(function(){
		this.blur();
	});
});

//google chart--------------------------------------------------------------------
 google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);
    function drawChart() {

      var data = new google.visualization.DataTable();
        data.addColumn('number', 'Date Size');
        data.addColumn('number', 'Kruskal 演算法');
        data.addColumn('number', 'Prim 演算法');
        data.addRows(5);

        data.setValue(0,0,0);
        data.setValue(0,1,kruskal_cpu[0]);
        data.setValue(0,2,prim_cpu[0]);

    	
    	data.setValue(1,0,0.01);
        data.setValue(1,1,kruskal_cpu[1]);
        data.setValue(1,2,prim_cpu[1]);

        data.setValue(2,0,0.1);
        data.setValue(2,1,kruskal_cpu[2]);
        data.setValue(2,2,prim_cpu[2]);

        data.setValue(3,0,0.75);
        data.setValue(3,1,kruskal_cpu[3]);
        data.setValue(3,2,prim_cpu[3]);

        data.setValue(4,0,0.9);
        data.setValue(4,1,kruskal_cpu[4]);
        data.setValue(4,2,prim_cpu[4]);
       

      var options = {
        chart: {
          title: 'CPU Times',
        },
        width: 800,
        height: 600,
        
      };

      var chart = new google.charts.Line(document.getElementById('compare'));

      chart.draw(data, options);
    }
//--------------------------------------------------------------------------------   

var delet_table = false ; //使網頁上只會印出一頁圖表
var distance_table = [] ; // nX3距離矩陣
var table_range ="" ; //範圍
var table_num ="" ; //數量
var density = "";
var kruskal_point = [] ; //存放k輸出的每個點
var prim_point = [] ;	//存放p輸出的每個點
var primpre_point = [] ;  //用來存放p可能會經過的點
var kruskal_cpu = [] ;
var prim_cpu = [] ;

function table(number,boo) {    //產生表格家排序

	distance_table = [] ; //清空陣列
	//刪除舊表格=================================================
	if(delet_table==true){
		document.getElementById("container").remove();
		document.getElementById("kruskal_container").remove();
		document.getElementById("prim_container").remove();
	}
	else delet_table = true ;
	//===========================================================

	table_range = document.getElementById("range").value ;//範圍
	table_num = document.getElementById("amount").value ;//數量
	density = document.getElementById("density").value ;//密度
	if(number!=9999)density = number ;
	//建立陣列+初始化------------------------------------------------
	var adj = new Array(table_num) ;
	for(var i=0; i<table_num ;i++){ //產生二維
			adj[i] = new Array(table_num);
	}
	for(var i =0 ; i<table_num ; i++){  //陣列初始化
		for(var j=0; j<table_num; j++){
			adj[i][j] = 0 ;
		}
	}
	//----------------------------------------------------------------

	//產生資料=========================================================
	for(var i =0; i<table_num; ++i){
		for(var j=0; j<table_num; ++j){
			if( i == j ){
				adj[i][j] =  999999  ;
			}else{
				if(adj[i][j]==0){
					var num = ranges_num(table_range);//產生亂數
					if(num > (table_range*density) )num = 999999 ;//亂數大於多少使其等於無限大
						adj[i][j] = num ;
					if(num != 999999){
						var three_table = [i,j,num] ;
						distance_table.push(three_table) ;
					}
				}
			} 
		}
	}

	//=================================================================

	//產生表格---------------------------------------------------------
	var container = document.createElement('div') ;
	container.id = 'container' ;
	document.getElementById("tab1").appendChild(container) ;
	
		for(var i=-1;i<table_num ; i++){
			var col = document.createElement('div');
				col.id = 'col'+i ;
				col.className = 'colstyle' ;
				var coli = 'col'+i ;
				document.getElementById("container").appendChild(col);

				for(var u=-1; u<table_num; u++){
					var row = document.createElement('div');
					row.id = 'row'+i+'='+u ;
					rowid = 'row'+i+'='+u ;
					if(i==-1&&u==-1)row.className = 'bk' ;
					else if(i==-1 || u==-1)row.className = 'bk' ;
					else row.className = 'rowstyle' ;
					document.getElementById(coli).appendChild(row);

					if(i==-1&&u==-1)document.getElementById(rowid).innerHTML = "" ;
					else if(i==-1)document.getElementById(rowid).innerHTML = u ;
					else if(u==-1)document.getElementById(rowid).innerHTML = i ;
					else document.getElementById(rowid).innerHTML = adj[i][u] ;
				}
		}
		//alert(adj[11][0]);
	//-----------------------------------------------------------------
	distance_table.sort(function(a,b){return a[2]-b[2]});
	if(boo == true ){
		Kruskal();
		Prim();
		drawChart();
	}
	$('.colstyle').addClass('colstyle');
	$('.rowstyle').addClass('rowstyle');
	$('#container').addClass('container');
}

function ranges_num(range) { //隨機亂數
	return Math.floor(Math.random()*(range)+1);
}

function Prim() {  //Prim演算法
	
	var pmt = new Array(table_num);

	primpre_point = [] ; 
	prim_point = [] ;
	var next_point ; //印出p找到的點得以放進tree 

	var random_prim =  Math.floor(Math.random()*(table_num)); //隨機找一點當起點並設權重為1 其他為0
	for(var a=0; a<table_num; ++a){
		if(a==random_prim)pmt[a] = 1 ;
		else pmt[a] = 0 ;
	}

	var rmax = table_num-1 ;
	var start = false ; //讓迴圈只執行一次雖機找點
	for(var r=0; r<rmax; ++r){

		if(start == false){
			for(var i=0; i<distance_table.length; ++i){
				if(distance_table[i][0] == random_prim)primpre_point.push([  distance_table[i][0],distance_table[i][1],distance_table[i][2] ]);
			}
			start = true ;
		
		}else {
			for(var w=0; w<distance_table.length; ++w){
				if(distance_table[w][0] == next_point)primpre_point.push([  distance_table[w][0],distance_table[w][1],distance_table[w][2] ]);
			}
		}
		primpre_point.sort(function(a,b){return b[2]-a[2]});
		for(var q = primpre_point.length-1; q>=0; q--){
			if(pmt[ primpre_point[q][1] ] ==0){
				pmt[ primpre_point[q][1] ] = 1 ;
				next_point = primpre_point[q][1] ;
				prim_point.push([primpre_point[q][0],primpre_point[q][1]]);
				break; //從最小開始找 如果找到確認權重是否為0 是的話設為1並加入此點 否則返回迴圈繼續找
			}
		}

	}

	//產生表格------------------------------------------------------
	var prim_container = document.createElement('div') ;
	prim_container.id = 'prim_container' ;
	document.getElementById("tab2").appendChild(prim_container) ;
	
		for(var i=0;i<prim_point.length ; ++i){
			var prim_col = document.createElement('div');
				prim_col.id = 'prim_col'+i ;
				prim_col.className = 'colstyle' ;
				var prim_coli = 'prim_col'+i ;
				document.getElementById("prim_container").appendChild(prim_col);

				for(var u=0; u<3; ++u){
					var prim_row = document.createElement('div');
					prim_row.id = 'prim_row'+i+u ;
					var prim_rowid = 'prim_row'+i+u ;
					if(u!=1)prim_row.className = 'bk' ;
					else prim_row.className = 'rowstyle' ;
					document.getElementById(prim_coli).appendChild(prim_row);	
					if(u==1)document.getElementById(prim_rowid).innerHTML = '<span>'+ '==>'+'</span>' ;
					else if(u==2)document.getElementById(prim_rowid).innerHTML = prim_point[i][u-1] ;	
					else document.getElementById(prim_rowid).innerHTML = prim_point[i][u] ;
				}
		}
	//--------------------------------------------------------------

}

function Kruskal() {  //Kruskal演算法
	
	kruskal_point = [] ;
	var mms_num = new Array(table_num) ; //tree的權重
	for(var i=0; i<table_num; ++i)mms_num[i] = i ;

	for(var j=0; j<distance_table.length; ++j){

		if( mms_num[distance_table[j][0]] != mms_num[distance_table[j][1]] ){

			if( mms_num[distance_table[j][0]] < mms_num[distance_table[j][1]] ){
				var max = mms_num[distance_table[j][1]] ;
				mms_num[distance_table[j][1]] = mms_num[distance_table[j][0]] ;
				var min = mms_num[distance_table[j][0]];
			}
			else {
				var max = mms_num[distance_table[j][0]] ;
				mms_num[distance_table[j][0]] = mms_num[distance_table[j][1]] ;
				var min = mms_num[distance_table[j][1]];
			}
			for(var t=0; t<mms_num.length; ++t){   //更新權重裡面的值 將同樣大的值一起變小
				if(mms_num[t] == max)mms_num[t] = min ;
			}

			kruskal_point.push([distance_table[j][0],distance_table[j][1]]);
		}
	}

	//產生表格------------------------------------------------------
	var kruskal_container = document.createElement('div') ;
	kruskal_container.id = 'kruskal_container' ;
	document.getElementById("tab3").appendChild(kruskal_container) ;
	
		for(var i=0;i<kruskal_point.length ; ++i){
			var kruskal_col = document.createElement('div');
				kruskal_col.id = 'kruskal_col'+i ;
				kruskal_col.className = 'colstyle' ;
				var kruskal_coli = 'kruskal_col'+i ;
				document.getElementById("kruskal_container").appendChild(kruskal_col);

				for(var u=0; u<3; ++u){
					var kruskal_row = document.createElement('div');
					kruskal_row.id = 'kruskal_row'+i+u ;
					var kruskal_rowid = 'kruskal_row'+i+u ;
					if(u!=1)kruskal_row.className = 'bk' ;
					else kruskal_row.className = 'rowstyle' ;
					document.getElementById(kruskal_coli).appendChild(kruskal_row);
					if(u==1)document.getElementById(kruskal_rowid).innerHTML = '<span>'+ '==>'+'</span>' ;
					else if(u==2)document.getElementById(kruskal_rowid).innerHTML = kruskal_point[i][u-1] ;	
					else document.getElementById(kruskal_rowid).innerHTML = kruskal_point[i][u] ;
				}
		}
	//--------------------------------------------------------------	
}

function image(value) {
	
	table(value,false) ;
	
		var start = 0; 
    	var end = 0;
      	start = new Date().getTime(); //測試程式開始時間
      		Kruskal() ;
      	end = new Date().getTime();//測試程式結束時間
      	kruskal_cpu.push( (end-start)/1000 ) ;

      	start = new Date().getTime(); //測試程式開始時間
      		Prim() ;
      	end = new Date().getTime();//測試程式結束時間
      	prim_cpu.push( (end-start)/1000 ) ;

}
function image_go() {

	kruskal_cpu = [] ;
	prim_cpu = [] ;
	image(0);
	image(0.01);
	image(0.1);
	image(0.75);
	image(0.9);
	drawChart();
	document.getElementById('compare_text').innerHTML = '<span>'+"Kruskal演算法"+'</span>'+'<br>' +"d[0] = "+ kruskal_cpu[0]+'<br>'+
																				"d[0.01] = " +kruskal_cpu[1]+'<br>'+
																				"d[0.1] = " +kruskal_cpu[2]+ '<br>'+
																				"d[0.75] = "+ kruskal_cpu[3]+'<br>'+
																				"d[0.9] = "+kruskal_cpu[4]+'<br>'+'<br>'+
														'<span>'+"Prim演算法"+'</span>'+'<br>'    +"d[0] = "+ prim_cpu[0]+'<br>'+
																				"d[0.01] = " +prim_cpu[1]+'<br>'+
																				"d[0.1] = " +prim_cpu[2]+ '<br>'+
																				"d[0.75] = "+ prim_cpu[3]+'<br>'+
																				"d[0.9] = "+prim_cpu[4]+'<br>';
}