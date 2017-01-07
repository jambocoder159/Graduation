var count = "";
var cost = "" ;
var weight ="" ;
var weight_limit ="" ;
var cost_array = new Array(count) ;
var weight_array = new Array(count) ;
var number_array = new Array(count) ;

function ranges_num(range) { //隨機亂數
	return Math.floor(Math.random()*(range)+1);
}

function min(a,b) {
	if(a < b)return a;
	else return b ;
}
function max(a,b) {
	if(a > b)return a;
	else return b ;
}

function image() {
	if (typeof(document.getElementById("container")) != 'undefined' && document.getElementById("container") != null)document.getElementById("container").remove();
	count = document.getElementById("count").value ;
	cost = document.getElementById("cost").value ;
	weight = document.getElementById("weight").value ;
	weight_limit = document.getElementById("weight_limit").value ;

	for(var i=0; i<count; ++i){

		cost_array[i] = ranges_num(cost) ;
		weight_array[i] = ranges_num(weight) ;
	}

	var container = document.createElement('div') ;
	container.id = 'container' ;
	document.getElementById("image_output").appendChild(container) ;
		for(var i=-1; i<count; ++i){

			var col = document.createElement('div');
				col.id = 'col'+i ;
				col.className = 'colstyle' ;
				var coli = 'col'+i ;
				document.getElementById("container").appendChild(col);
				for(var j=-1; j<2; ++j){

					var row = document.createElement('div');
					row.id = 'row'+i+'='+j ;
					rowid = 'row'+i+'='+j ;
					row.className = 'rowstyle' ;
					document.getElementById(coli).appendChild(row);

					if(i==-1 && j==-1)document.getElementById(rowid).innerHTML = "物品編號" ;
					else if(j==-1)document.getElementById(rowid).innerHTML = i ;
					else if(i==-1 && j==0)document.getElementById(rowid).innerHTML = "Cost" ;
					else if(i==-1 && j==1)document.getElementById(rowid).innerHTML = "Weight" ;
					else if(j==0)document.getElementById(rowid).innerHTML = cost_array[i] ;
					else if(j==1)document.getElementById(rowid).innerHTML = weight_array[i] ;
				}
		}

	
}

function knapsack() {

	var c = new Array(count+1);
	for(var e=0; e<count+1; ++e)c[e]= 0 ;
	 

	    for (var i = 0; i < count; ++i)
	    {
	       
	         for (var j = weight_limit; j >= weight_array[i] ; --j)
	                c[j] = max(c[j], c[j - weight_array[i] ] + cost_array[i] );
	        
	    }
	    document.getElementById("output").innerHTML = "最高的價值為 : "+c[weight_limit] ;

	

}