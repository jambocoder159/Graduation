<?php
	if(isset($_POST['str_output'])) $str_output = $_POST['str_output'] ; //接收原輸入
	else $str_output = "" ;

	if(isset($_POST['str_input'])) $str_input = $_POST['str_input'] ;
	else $str_input = "" ; //接收處理好的輸出
?>

<!DOCTYPE html>
<head>
<title>SpeedApi</title>
<meta charset="utf-8" />
<link rel="stylesheet" type="text/css" href="Css/SpeechApi_Css.css">
<script type="text/javascript" charset="UTF-8" src="Js/SpeechApi_Js.js"></script>
</head>
<body>
	<div class="flexCenter">
		<div class="container">
			<div class="flexCenter titleName">
				Web Speech API
			</div>
			<div>
					<div>
						<div class="flexCenter" style="width:968px">
							<input type="text" id="str" style="width:900px">
							<input type="button" value="送出文字" onclick="StrToHandle_text()">
						</div>
					</div>
					<div>
						<div class="flexCenter" style="width:968px;">
							Input
						</div>
						<textarea rows="15" cols="135" disabled="disabled" style="background:white;" id = "tempBox" value="">
							<?php echo $str_input ; ?>
						</textarea>
					</div>
					<div>
						<div class="flexCenter" style="width:968px;">
							Output
						</div>
						
						<textarea rows="15" cols="135" disabled="disabled" style="background:white;" id = "textBox" value="">
							<?php echo $str_output; ?>
						</textarea>
						
					</div>
			</div>
				
			<div class="flexCenter">
				辨識語言：
				<select id="langCombo">
				  <option value="cmn-Hant-TW">中文(台灣)</option>
				  <option value="en-US">英文(美國)</option>
				</select>
				<input id="startStopButton" type="button" value="辨識" style="background-color:white;" onclick="startButton(event)"/>
				<label id="infoBox"></label>
			</div>
		</div>	
	</div>	
</body>
</html>