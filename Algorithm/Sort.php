<!DOCTYPE html>
<html>
<head>
	<title>Sort</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="Sort_Css.css">
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript" src="Sort_Js.js"></script>
	<link rel="shortcut icon" href="image/primary-source-s.png" >
</head>
<body>
	<div class="center title" >
		<b>各類型排序效能分析</b>
	</div>
	<div class="center">
		<div class="center_container">
			<div class="input_container">
				<div>
					<div class="text_container">
						<div>
							<span>範圍 : </span><input type="text" placeholder="亂數的範圍" id="range" value="10000" >
						</div>
						<div>
							<span>起始數量 : </span><input type="text" placeholder="初始數量" id="num" value="0" >
						</div>
						<div>
							<span>每次加多少 : </span><input type="text" max="10000" value="2000" id="every" >
						</div>
						
					</div>
					<div>
						<input type="checkbox" name="check[]" id="Selection"><label>Selection sort</label>
						<input type="checkbox" name="check[]" id="Bubble"><label>Bubble sort</label>
						<input type="checkbox" name="check[]" id="Insertion"><label>Insertion sort</label><br>
						<input type="checkbox" name="check[]" id="Radix"><label>Radix sort</label>
						<input type="checkbox" name="check[]" id="Heap"><label>Heap sort</label>
						<input type="checkbox" name="check[]" id="Merge"><label>Merge sort</label><br>
						<input type="checkbox" name="check[]" id="Quick"><label>Quick sort</label>
						<input type="checkbox" name="check[]" id="non_Quick"><label>Quick sort(non-recursive version)</label>
					</div>
					<div style="display: flex;justify-content:center;margin-bottom: 1%;margin-top: 1%;">
						<input type="button" class="button" name="" value="全選" onclick="allSelect()">
						<input type="button" class="button" name="" value="取消全選" onclick="clearSelect()">
						<input type="button" class="button" name="" value="開始計算" onclick="Sort()">
					</div>
					<div style="display: flex;justify-content: center;">
						<div class="line"></div>
					</div>
				</div>
			</div>
			<div class="display">
				<div>
					<div id="Selection_frame" class="frame" >
						<div id="Selection_name" style="color:#FF3B3B;">Selection Sort </div>
						<div id="Selection_name" class="RN">Sort Times : </div>
							<div id="selection_sort_times"></div>
						<div id="Selection_name" class="RN">Random Numbers : </div>
							<div id="selection_print"></div>
					</div>

					<div id="Bubble_frame" class="frame" >
						<div id="Bubble_name" style="color:#FF3B3B;">Bubble Sort </div>
						<div id="Bubble_name" class="RN">Sort Times : </div>
							<div id="bubble_sort_times"></div>
						<div id="Bubble_name" class="RN">Random Numbers : </div>
							<div id="bubble_print"></div>
					</div>

					<div id="Insertion_frame" class="frame" >
						<div id="Insertion_name" style="color:#FF3B3B;">Insertion Sort </div>
						<div id="Insertion_name" class="RN">Sort Times : </div>
							<div id="insertion_sort_times"></div>
						<div id="Insertion_name" class="RN">Random Numbers : </div>
							<div id="insertion_print"></div>
					</div>
					<div id="Radix_frame" class="frame" >
						<div id="Radix_name" style="color:#FF3B3B;">Radix Sort </div>
						<div id="Radix_name" class="RN">Sort Times : </div>
							<div id="radix_sort_times"></div>
						<div id="Radix_name" class="RN">Random Numbers : </div>
							<div id="radix_print"></div>
					</div>
					<div id="Heap_frame" class="frame" >
						<div id="Heap_name" style="color:#FF3B3B;">Heap Sort </div>
						<div id="Heap_name" class="RN">Sort Times : </div>
							<div id="heap_sort_times"></div>
						<div id="Heap_name" class="RN">Random Numbers : </div>
							<div id="heap_print"></div>
					</div>
					<div id="Merge_frame" class="frame" >
						<div id="Merge_name" style="color:#FF3B3B;">Merge Sort </div>
						<div id="Merge_name" class="RN">Sort Times : </div>
							<div id="merge_sort_times"></div>
						<div id="Merge_name" class="RN">Random Numbers : </div>
							<div id="merge_print"></div>
					</div>
					<div id="Quick_frame" class="frame" >
						<div id="Quick_name" style="color:#FF3B3B;">Quick Sort </div>
						<div id="Quick_name" class="RN">Sort Times : </div>
							<div id="quick_sort_times"></div>
						<div id="Quick_name" class="RN">Random Numbers : </div>
							<div id="quick_print"></div>
					</div>
					<div id="non_Quick_frame" class="frame" >
						<div id="non_Quick_name" style="color:#FF3B3B;">Non_Quick Sort </div>
						<div id="non_Quick_name" class="RN">Sort Times : </div>
							<div id="non_quick_sort_times"></div>
						<div id="non_Quick_name" class="RN">Random Numbers : </div>
							<div id="non_quick_print"></div>
					</div>
				</div>
			</div>
		</div>
		<div style="width: 1%;"></div>
		<div id="line_top_x" style="width:49%;height:89%;box-shadow:2px 2px 12px -5px rgba(20%,20%,40%,0.5), -2px -2px 12px -5px rgba(20%,20%,40%,0.5) ;"></div>
		
	</div>

</body>

</html>