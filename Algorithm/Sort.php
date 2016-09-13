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
					<span>範圍 : </span><input type="text" id="range" >
				</div>
				<div>
					<span>數量 : </span><input type="text" id="num" >
				</div>
				<div>
					<input type="button" name="" value="開始" onclick="Sort()">
				</div>
			</div>
			<div class="display">
				<div class="selection frame" >
					<div id="name" style="color:red;">Selection Sort </div>
					<div id="name">Sort Times : </div>
						<div id="selection_sort_times"></div>
					<div id="name">Random Numbers : </div>
						<div id="selection_print"></div>
				</div>
				<div class="selection frame" >
					<div id="name" style="color:red;">Bubble Sort </div>
					<div id="name">Sort Times : </div>
						<div id="bubble_sort_times"></div>
					<div id="name">Random Numbers : </div>
						<div id="bubble_print"></div>
				</div>
			</div>
		</div>
		
		<div id="line_top_x"></div>
		
	</div>

</body>
<script type="text/javascript">
	
</script>
</html>