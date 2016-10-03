var cur_selection = new Array(5) ;
var cur_bubble = new Array(5) ;
var cur_insertion = new Array(5) ;
var cur_radix = new Array(5) ;
var cur_heap = new Array(5) ;
var cur_merge = new Array(5) ;
var once_plus ; 
var size ;
var wi = (screen.availWidth/2) ;

//google chart--------------------------------------------------------------------
 google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);
    function drawChart() {

      var data = new google.visualization.DataTable();
        data.addColumn('number', 'Date Size');
        data.addColumn('number', 'Selection Sort');
        data.addColumn('number', 'Bubble Sort');
        data.addColumn('number', 'Insertion Sort');
        data.addColumn('number', 'Radix Sort');
        data.addColumn('number', 'Heap Sort');
        data.addColumn('number', 'Merge Sort');
        data.addRows(5);

        
        for(var i=0; i<5; i++){
          data.setValue(i,0,size);
          data.setValue(i,1,cur_selection[i]);
          data.setValue(i,2,cur_bubble[i]);
          data.setValue(i,3,cur_insertion[i]);
          data.setValue(i,4,cur_radix[i]);
          data.setValue(i,5,cur_heap[i]);
          data.setValue(i,6,cur_merge[i]);
          size = size + parseInt(once_plus) ;
        }
       

      var options = {
        chart: {
          title: 'CPU Times',
        },
        //width: wi,
        //height: 600,
        
      };

      var chart = new google.charts.Line(document.getElementById('line_top_x'));

      chart.draw(data, options);
    }
//--------------------------------------------------------------------------------   

function allSelect(){
  var checkItem = document.getElementsByName('check[]');
  for(var i=0;i<checkItem.length;i++){
    checkItem[i].checked=true;  
  }
} 

function clearSelect(){
  var checkItem = document.getElementsByName('check[]');
  for(var i=0;i<checkItem.length;i++){
    checkItem[i].checked=false;  
  }
}
//css add and remove================================================================================================
function add_css(frame,name) {
    var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "#"+frame+" { border:1px solid #D4D4D4; margin-top:1%;display:block; overflow: auto;  } ";
        document.body.appendChild(css);        
}

function remove_css(frame1,frame2,frame3,frame4,frame5,frame6) {
    var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "#"+frame1+","+"#"+frame2+","+"#"+frame3+","+"#"+frame4+","+"#"+frame5+","+"#"+frame6+" { display:none; }";
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
    cur_radix[i] = null ;
    cur_heap[i] = null ;
    cur_merge[i] = null ;
  }
    
  remove_css("Selection_frame","Bubble_frame","Insertion_frame","Radix_frame","Heap_frame","Merge_frame");

  if(document.getElementById("Selection").checked == true){selectionSort();checked_sure = true;}
  if(document.getElementById("Bubble").checked == true){bubbleSort();checked_sure = true ;}
  if(document.getElementById("Insertion").checked == true){insertionSort();checked_sure = true;}
  if(document.getElementById("Radix").checked == true){radixSort();checked_sure = true;}
  if(document.getElementById("Heap").checked == true){heapSort();checked_sure = true;}

  if(document.getElementById("Merge").checked == true){
    add_css("Merge_frame","Merge_name");
    var once = 0 ;
    for(var u=0; u<5; u++){

      var items = ranges_nums(once) ;
      var start = 0; 
      var end = 0;
      start = new Date().getTime(); //測試程式開始時間
      var merge = mergeSort(items) ;
      end = new Date().getTime();//測試程式結束時間
      once += parseInt(once_plus) ;
      cur_merge[u] = ((end - start) / 1000);

    }
    document.getElementById("merge_print").innerHTML = merge ;
    document.getElementById("merge_sort_times").innerHTML = cur_merge[0]+"sec" +" "+ cur_merge[1]+"sec" +" "+ cur_merge[2]+"sec" +" "+ cur_merge[3]+"sec" +" "+ cur_merge[4] +"sec" ; //總測試時間

    checked_sure = true;
  }

  if(checked_sure == true)drawChart();
  else window.alert("請至少勾選一項sort的方法");
}
/////////////////////////////////////////////////////////////////////////////

//selectionSort===================================================
function selectionSort(){

    var once = 0 ;
    add_css("Selection_frame","Selection_name");
    for(var u =0; u<5; u++){

      items = ranges_nums(once);
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
    document.getElementById("selection_sort_times").innerHTML = cur_selection[0]+"sec" +" "+ cur_selection[1]+"sec" +" "+ cur_selection[2]+"sec" +" "+ cur_selection[3]+"sec" +" "+ cur_selection[4] +"sec" ; //總測試時間


}
//==================================================================

//bubbleSort---------------------------------------------------------
function bubbleSort() {
    var once = 0 ;
    add_css("Bubble_frame","Bubble_name");
    for(var u=0; u<5; u++){

      items = ranges_nums(once);
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
    document.getElementById("bubble_sort_times").innerHTML = cur_bubble[0]+"sec"+" "+cur_bubble[1]+"sec"+" "+cur_bubble[2]+"sec"+" "+cur_bubble[3]+"sec"+" "+cur_bubble[4]+ "sec" ; //總測試時間 

}
//-------------------------------------------------------------------

//Insertion sort==================================================================
function insertionSort(){
  var once = 0 ;
  add_css("Insertion_frame","Insertion_name");
  for(var u=0; u<5; u++){

    items = ranges_nums(once);
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
  document.getElementById("insertion_sort_times").innerHTML = cur_insertion[0]+"sec"+" "+cur_insertion[1]+"sec"+" "+cur_insertion[2]+"sec"+" "+cur_insertion[3]+"sec"+" "+cur_insertion[4]+ "sec" ; //總測試時間 
}
//================================================================================

//Radix sort-------------------------------------------------------------------------

var initArray = function(buckets, count){
    for(var i = 0; i < buckets.length; i++){
        buckets[i]  = new Array(buckets.length);
        count[i] = 0;
    }
}

function radixSort(){
    var once = 0 ;
    add_css("Radix_frame","Radix_name");
    for(var u=0; u<5; u++){

      var items = ranges_nums(once);   

      var start = 0; 
      var end = 0;

      start = new Date().getTime(); //測試程式開始時間

      var MAX = parseInt(document.getElementById("range").value) ;            // 數的上限
      var dataIndex = 0, radix = 1;           // radix = 1, 10, 100,...
      var buckets = new Array(items.length),   // 桶子 
          count = new Array(items.length);     // 記錄每個桶子裝了幾個數值
      initArray( buckets, count );            // 初始化桶子

      while(radix <= MAX){                    // 若基數沒有超出上限

        // 分配
          for(var i = 0; i < items.length; i++){
              var LSD = parseInt((items[i]/radix)) % 10;    // 計算LSD(=那一個桶子)
              buckets[LSD][count[LSD]] = items[i];          // 將資料放到對應的桶子
              count[LSD]++;
          }
          radix *= 10;                                     // 更新基底：1->10, 10->100
      
          // 合併
          dataIndex = 0;
          for(var i = 0; i < items.length; i++){         // 將桶子內的資料合併
              if(count[i] != 0){                        // 如果桶子內有資料
                  for(var j =0 ; j < count[i]; j++){
                      items[dataIndex++] = buckets[i][j];
                  }
              }
              count[i] = 0;                             // 歸0，以便下一回合使用
          }   
      }
      end = new Date().getTime();//測試程式結束時間
      once += parseInt(once_plus) ;

      cur_radix[u] = ((end - start) / 1000);

    }

    document.getElementById("radix_print").innerHTML = items;
    document.getElementById("radix_sort_times").innerHTML = cur_radix[0]+"sec"+" "+cur_radix[1]+"sec"+" "+cur_radix[2]+"sec"+" "+cur_radix[3]+"sec"+""+cur_radix[4]+ "sec" ; //總測試時間 
}


//-----------------------------------------------------------------------------------


//heap sort==========================================================================

function heapify(items, root, length){
    var leftChild = root*2 + 1;     // Root的左子元素
    var rightChild = root*2 + 2;    // Root的右子元素
    var maxNode = -1;
    
    // 找出root, leftChild, rightChild，值最大者(maNode)
    if(leftChild < length && (items[leftChild] > items[root]))
        maxNode = leftChild;
    else
        maxNode = root; 
    if(rightChild < length && (items[rightChild] > items[maxNode]))
        maxNode = rightChild;
  
    // 如果值最大者不是root，則作swap及heapify
    if(maxNode != root){
        swap(items, root, maxNode);
        heapify(items, maxNode, length);
    } 
}

function heapSort(){
    var once = 0 ;
    add_css("Heap_frame","Heap_name");
    for(var u=0; u<5; u++){

      items = ranges_nums(once);
      var start = 0; 
      var end = 0;

      start = new Date().getTime(); //測試程式開始時間
      //將數列轉換成Max Heap
      for(var i = Math.floor( items.length/2)-1; i >= 0; i--){
          heapify(items, i, items.length);
      } 
    
      //排序
      for(i = items.length - 1; i > 0; i--){
          swap(items, 0, i);
          heapify(items, 0, i);
      }

      end = new Date().getTime();//測試程式結束時間
      once += parseInt(once_plus) ;

      cur_heap[u] = ((end - start) / 1000);

    }

    document.getElementById("heap_print").innerHTML = items;
    document.getElementById("heap_sort_times").innerHTML = cur_heap[0]+"sec"+" "+cur_heap[1]+"sec"+" "+cur_heap[2]+"sec"+" "+cur_heap[3]+"sec"+" "+cur_heap[4]+ "sec" ; //總測試時間 

}

//===================================================================================

//Merge Sort-------------------------------------------------------------------------

function merge(left, right)
{
    var result = [];
 
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());

    return result;
}

function mergeSort(items){

  

  if (items.length < 2)
        return items;
 
    var middle = parseInt(items.length / 2);
    var left   = items.slice(0, middle);
    var right  = items.slice(middle);
 
    return merge(mergeSort(left), mergeSort(right));

}

//-----------------------------------------------------------------------------------