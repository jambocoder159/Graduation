
//google chart--------------------------------------------------------------------
 google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);
      var x = new Array() ;
    function drawChart() {

      var data = new google.visualization.DataTable();
        data.addColumn('number', 'Date Size');
        data.addColumn('number', 'Selection Sort');
        data.addColumn('number', 'Bubble Sort');
        data.addColumn('number', '按讚次數');
        data.addRows(5);

        var size = 2000 ;
        for(var i=0; i<5; i++){
          data.setValue(i,0,size);
          data.setValue(i,1,Math.floor(Math.random()*(299+1)+1));
          data.setValue(i,2,Math.floor(Math.random()*(299+1)+1));
          data.setValue(i,3,Math.floor(Math.random()*(299+1)+1));
          size+=2000 ;
        }
       

      var options = {
        chart: {
          title: 'CPU Times',
        },
        width: 900,
        height: 500,
        
      };

      var chart = new google.charts.Line(document.getElementById('line_top_x'));

      chart.draw(data, options);
    }
//--------------------------------------------------------------------------------    






//random=============================================
function random_num(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
//===================================================

//swap-----------------------------------------------
function swap(items, firstIndex, secondIndex){
	var temp = items[firstIndex];
	items[firstIndex] = items[secondIndex];
	items[secondIndex] = temp;
}
//---------------------------------------------------

var css_num = 0 ;// 讓網頁只執行一次匯入CSS

function Sort(){
    var ranges = document.getElementById("range").value ; //範圍
    var nums = document.getElementById("num").value ; //數量

    var items = new Array();
    
    //把random出來的數字塞進陣列
    for(var i =0;i < nums ; i ++){
        items.push(random_num(1,ranges)) ;    
    }

    var names = document.getElementById("name") ;
    var i ;
    for(i=0; i<names.length ; i++){
        names[i].style.display = 'block' ;
    }

    if(css_num == 0){
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".frame { border:1px dotted red; } #name { display:block ;}";
        document.body.appendChild(css);
        
    }    
    css_num++ ;

    selectionSort(items);
    bubbleSort(items);
}

//selectionSort===================================================
function selectionSort(items){
    var start = 0; 
    var end = 0;

    start = new Date().getTime(); //測試程式開始時間

    var len = items.length,
        min;

    for (i=0; i < len; i++){

        //set minimum to this position
        min = i;

        //check the rest of the array to see if anything is smaller
        for (j=i+1; j < len; j++){
            if (items[j] < items[min]){
                min = j;
            }
        }

        //if the minimum isn't in the position, swap it
        if (i != min){
            swap(items, i, min);
        }
    }
    
    end = new Date().getTime();//測試程式結束時間
    document.getElementById("selection_print").innerHTML = items;
    document.getElementById("selection_sort_times").innerHTML = ((end - start) / 1000) + "sec" ; //總測試時間


}
//==================================================================

//bubbleSort---------------------------------------------------------
function bubbleSort(items) {

    var start = 0; 
    var end = 0;


    start = new Date().getTime(); //測試程式開始時間

      var length = items.length;
      for (var i = 0; i < length; i++) { //Number of passes
        for (var j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
          //Compare the adjacent positions
          if(items[j] > items[j+1]) {
            //Swap the numbers
            var tmp = items[j];  //Temporary variable to hold the current number
            items[j] = items[j+1]; //Replace current number with adjacent number
            items[j+1] = tmp; //Replace adjacent number with current number
          }
        }        
      }

     end = new Date().getTime();//測試程式結束時間
    document.getElementById("bubble_print").innerHTML = items;
    document.getElementById("bubble_sort_times").innerHTML = ((end - start) / 1000) + "sec" ; //總測試時間 

}

//-------------------------------------------------------------------
