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

//範圍選取check box===============================================================
function range_click(name) {
	if(document.getElementById(name).checked == true)document.getElementById(name).checked = false ;
	else document.getElementById(name).checked = true ;
}

//================================================================================

var distance_table = [] ; // nX3距離矩陣
var table_range ="" ; //範圍
var table_num ="" ; //數量
var density = "";
var kruskal_point = [] ; //存放k輸出的每個點
var prim_point = [] ;	//存放p輸出的每個點
var primpre_point = [] ;  //用來存放p可能會經過的點
var kruskal_cpu = [] ;
var prim_cpu = [] ;
var short_path_point = [] ;
var adv = [] ;

function table(number,boo) {    //產生表格家排序

	distance_table = [] ; //清空陣列
	//刪除舊表格=================================================

	if (typeof(document.getElementById("container")) != 'undefined' && document.getElementById("container") != null)document.getElementById("container").remove();
	if (typeof(document.getElementById("kruskal_container")) != 'undefined' && document.getElementById("kruskal_container") != null)document.getElementById("kruskal_container").remove();
	if (typeof(document.getElementById("prim_container")) != 'undefined' && document.getElementById("prim_container") != null)document.getElementById("prim_container").remove();
	if (typeof(document.getElementById("short_path_container")) != 'undefined' && document.getElementById("short_path_container") != null)document.getElementById("short_path_container").remove();

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
	adv = adj ;
	distance_table.sort(function(a,b){return a[2]-b[2]});
	if(boo == true ){
		if(document.getElementById("Kruskal").checked == true)Kruskal();
		if(document.getElementById("Prim").checked == true)Prim();
		drawChart();
		if(document.getElementById("Short_Path").checked == true)Short_path(adj);
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
	if(document.getElementById("Kruskal").checked == false)document.getElementById("kruskal_container").remove();
	if(document.getElementById("Prim").checked == false)document.getElementById("prim_container").remove();	
	if(document.getElementById("Short_Path").checked == true)Short_path(adv);

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


function Short_path(args) {
	var w = args;    // 一張有權重的圖：adjacency matrix
	short_path_point = [] ;

	for(var h=0; h<table_num; h++){

		var source = h ;
		var d = new Array(table_num);       // 記錄起點到圖上各個點的最短路徑長度
		var parent = new Array(table_num);  // 記錄各個點在最短路徑樹上的父親是誰
		var visit = new Array(table_num);  // 記錄各個點是不是已在最短路徑樹之中
		 		
		
		    for (var i=0; i < table_num; i++) visit[i] = false; // initialize
		 
		    d[source] = 0;              // 設定起點的最短路徑長度
		    parent[source] = source;    // 設定起點是樹根（父親為自己）
		    visit[source] = true;       // 將起點加入到最短路徑樹
		 
		    for (var k=0; k<table_num-1; k++)   // 將剩餘所有點加入到最短路徑樹
		    {
		        // 從既有的最短路徑樹，找出一條聯外而且是最短的邊
		        var a = -1, b = -1, min = 999999;
		 
		        // 找一個已在最短路徑樹上的點
		        for (var i=0; i<table_num; i++)
		            if (visit[i])
		                // 找一個不在最短路徑樹上的點
		                for (var j=0; j<table_num; j++)
		                    if (!visit[j])
		                        if (d[i] + w[i][j] < min)
		                        {
		                            a = i;  // 記錄這一條邊
		                            b = j;
		                            min = d[i] + w[i][j];
		                        }
		 
		        // 起點有連通的最短路徑都已找完
		        if (a == -1 || b == -1) break;
		//      // 不連通即是最短路徑長度無限長
		//      if (min == 1e9) break;
		 
		        d[b] = min;         // 儲存由起點到b點的最短路徑長度
		        parent[b] = a;      // b點是由a點延伸過去的
		        visit[b] = true;    // 把b點加入到最短路徑樹之中
		    }

		    short_path_point.push(d) ;
	   
		}

		//產生表格---------------------------------------------------------
		var short_path_container = document.createElement('div') ;
		short_path_container.id = 'short_path_container' ;
		document.getElementById("tab5").appendChild(short_path_container) ;
		
			for(var i=-1;i<table_num ; i++){
				var short_path_col = document.createElement('div');
					short_path_col.id = 'short_path_col'+i ;
					short_path_col.className = 'colstyle' ;
					var short_path_coli = 'short_path_col'+i ;
					document.getElementById("short_path_container").appendChild(short_path_col);

					for(var u=-1; u<table_num; u++){
						var short_path_row = document.createElement('div');
						short_path_row.id = 'short_path_row'+i+'='+u ;
						short_path_rowid = 'short_path_row'+i+'='+u ;
						if(i==-1&&u==-1)short_path_row.className = 'bk' ;
						else if(u==-1)short_path_row.className = 'bk_star bk' ;
						else if(i==-1)short_path_row.className = 'bk_end bk' ;
						else short_path_row.className = 'rowstyle' ;
						document.getElementById(short_path_coli).appendChild(short_path_row);

						if(i==-1&&u==-1)document.getElementById(short_path_rowid).innerHTML = "" ;
						else if(i==-1)document.getElementById(short_path_rowid).innerHTML = u ;
						else if(u==-1)document.getElementById(short_path_rowid).innerHTML = i ;
						else document.getElementById(short_path_rowid).innerHTML = short_path_point[i][u] ;
					}
			}
		//alert(adj[11][0]);
	//-----------------------------------------------------------------
		console.table(short_path_point);
}