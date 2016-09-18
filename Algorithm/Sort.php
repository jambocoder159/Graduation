<!DOCTYPE html>
<html>
<head>
	<title>Sort</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="Sort_Css.css">
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript" src="Sort_Js.js"></script>
</head>
<body>
	<div class="center">
		<div class="center_container">
			<div class="input_container">
				<div>
					<div class="text_container">
						<div>
							<span>範圍 : </span><input type="text" placeholder="亂數的範圍" id="range" >
						</div>
						<div>
							<span>數量 : </span><input type="text" placeholder="初始數量" id="num" >
						</div>
						<div>
							<span>每次加多少 : </span><input type="text" max="10000" value="3000" id="every" >
						</div>
						<div>
							<input type="button" name="" value="開始" onclick="Sort()">
						</div>
					</div>
					<div>
						<input type="checkbox" id="Selection"><label>Selection sort</label>
						<input type="checkbox" id="Bubble"><label>Bubble sort</label>
						<input type="checkbox" id="Insertion"><label>Insertion sort</label>
						<input type="checkbox" id="Radix"><label>Radix sort</label>
						<input type="checkbox" id="Heap"><label>Heap sort</label>
						<input type="checkbox" id="Merge"><label>Merge sort</label><br>
						<input type="checkbox" id="Quick"><label>Quick sort(recursive version)</label>
						<input type="checkbox" id="non_Quick"><label>Quick sort(non-recursive version)</label>
					</div>
				</div>
			</div>
			<div class="display">
				<div id="Selection_frame" class="frame" >
					<div id="Selection_name" style="color:red;">Selection Sort </div>
					<div id="Selection_name">Sort Times : </div>
						<div id="selection_sort_times"></div>
					<div id="Selection_name">Random Numbers : </div>
						<div id="selection_print"></div>
				</div>

				<div id="Bubble_frame" class="frame" >
					<div id="Bubble_name" style="color:red;">Bubble Sort </div>
					<div id="Bubble_name">Sort Times : </div>
						<div id="bubble_sort_times"></div>
					<div id="Bubble_name">Random Numbers : </div>
						<div id="bubble_print"></div>
				</div>

				<div id="Insertion_frame" class="frame" >
					<div id="Insertion_name" style="color:red;">Insertion Sort </div>
					<div id="Insertion_name">Sort Times : </div>
						<div id="insertion_sort_times"></div>
					<div id="Insertion_name">Random Numbers : </div>
						<div id="insertion_print"></div>
				</div>
			</div>
		</div>
		
		<div id="line_top_x"></div>
		
	</div>

</body>

</html>