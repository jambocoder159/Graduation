var cur_selection = new Array(5) ;
var cur_bubble = new Array(5) ;
var cur_insertion = new Array(5) ;
var once_plus ; 
var size ;
var wi = (screen.availWidth/2) ;
var hi = (screen.availHeight*(0.93)*(0.78)) ;
//google chart--------------------------------------------------------------------
 google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);
    function drawChart() {

      var data = new google.visualization.DataTable();
        data.addColumn('number', 'Date Size');
        data.addColumn('number', 'Selection Sort');
        data.addColumn('number', 'Bubble Sort');
        data.addColumn('number', 'Insertion Sort');
        data.addRows(5);

        
        for(var i=0; i<5; i++){
          data.setValue(i,0,size);
          data.setValue(i,1,cur_selection[i]);
          data.setValue(i,2,cur_bubble[i]);
          data.setValue(i,3,cur_insertion[i]);
          size = size + parseInt(once_plus) ;
        }
       

      var options = {
        chart: {
          title: 'CPU Times',
        },
        width: wi,
        height: hi,
        
      };

      var chart = new google.charts.Line(document.getElementById('line_top_x'));

      chart.draw(data, options);
    }
//--------------------------------------------------------------------------------    

//css add and remove================================================================================================
function add_css(frame,name) {
    var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "#"+frame+" { border:1px solid #D4D4D4; margin-top:1%;display:block; overflow: auto;  } ";
        document.body.appendChild(css);        
}
function remove_css(frame1,frame2,frame3) {
    var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "#"+frame1+","+"#"+frame2+","+"#"+frame3+" { display:none; }";
        document.body.appendChild(css);        
}
//===================================================================================================================

//creat array contain random values-------------------------------------------
function ranges_nums(once){

  var ranges = document.getElementById("range").value ; //範圍
  var nums = document.getElementById("num").value ; //數量
  nums = parseInt(nums) + parseInt(once) ;

  var items = new Array();
    //把random出來的數字塞進陣列
    for(var i =0;i < nums ; i ++){
        items.push(random_num(1,ranges)) ;    
    }
  return items ;  

}
//-----------------------------------------------------------------------------

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

////////////////////////////////////////////////////////////////////////////
///MAIN////
///////////
function Sort(){
  var checked_sure = false ; //判斷有沒有選擇check box 
  once_plus = document.getElementById("every").value ;
  size = parseInt(document.getElementById("num").value) ;
  for (var i = 0; i <5; i++) {
    cur_selection[i] = null ;
    cur_bubble[i] = null ;
    cur_insertion[i] = null ;
  }
    
  remove_css("Selection_frame","Bubble_frame","Insertion_frame");
  if(document.getElementById("Selection").checked == true){selectionSort();checked_sure = true;}
  if(document.getElementById("Bubble").checked == true){bubbleSort();checked_sure = true ;}
  if(document.getElementById("Insertion").checked == true){insertionSort();checked_sure = true;}

  if(checked_sure == true)drawChart();
  else window.alert("請至少勾選一項sort的方法");
}
/////////////////////////////////////////////////////////////////////////////

//selectionSort===================================================
function selectionSort(){

    var once = 0 ;

    for(var u =0; u<5; u++){

      items = ranges_nums(once);
      add_css("Selection_frame","Selection_name");
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
      once += parseInt(once_plus) ;

      cur_selection[u] = ((end - start) / 1000);
    }

    document.getElementById("selection_print").innerHTML = items;
    document.getElementById("selection_sort_times").innerHTML = cur_selection[0] +","+ cur_selection[1] +","+ cur_selection[2] +","+ cur_selection[3] +","+ cur_selection[4] + "sec" ; //總測試時間


}
//==================================================================

//bubbleSort---------------------------------------------------------
function bubbleSort() {
    var once = 0 ;

    for(var u=0; u<5; u++){

      items = ranges_nums(once);
      add_css("Bubble_frame","Bubble_name");
      var start = 0; 
      var end = 0;

      start = new Date().getTime(); //測試程式開始時間

        var length = items.length;
        for (var i = 0; i < length; i++) { 
          for (var j = 0; j < (length - i - 1); j++) { 
           
            if(items[j] > items[j+1]) {
              //Swap the numbers
              swap(items,j,j+1);
            }
          }        
        }

       end = new Date().getTime();//測試程式結束時間

      once += parseInt(once_plus) ;

      cur_bubble[u] = ((end - start) / 1000);
     }
    document.getElementById("bubble_print").innerHTML = items;
    document.getElementById("bubble_sort_times").innerHTML = cur_bubble[0]+","+cur_bubble[1]+","+cur_bubble[2]+","+cur_bubble[3]+","+cur_bubble[4]+","+ "sec" ; //總測試時間 

}
//-------------------------------------------------------------------

//Insertion sort==================================================================
function insertionSort(){
  var once = 0 ;

  for(var u=0; u<5; u++){

    items = ranges_nums(once);
    add_css("Insertion_frame","Insertion_name");
    var start = 0; 
    var end = 0;

    start = new Date().getTime(); //測試程式開始時間

    var len = items.length;
    for (var i = 0; i < len; i++) {
        var tmp = items[i]; 
       
        for (var j = i - 1; j >= 0 && (items[j] > tmp); j--) {
            
            items[j + 1] = items[j];
        }
       
        items[j + 1] = tmp;
    }

    end = new Date().getTime();//測試程式結束時間
    once += parseInt(once_plus) ;

    cur_insertion[u] = ((end - start) / 1000);

  }

  document.getElementById("insertion_print").innerHTML = items;
  document.getElementById("insertion_sort_times").innerHTML = cur_insertion[0]+","+cur_insertion[1]+","+cur_insertion[2]+","+cur_insertion[3]+","+cur_insertion[4]+","+ "sec" ; //總測試時間 
}
//================================================================================
