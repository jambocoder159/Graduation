<?php

	if(isset($_POST['str_input'])) $str_input = $_POST['str_input'] ;
	else $str_input = null ; //接收處理好的輸出

	if(isset($_POST['str_oringin'])) $str_oringin = $_POST['str_oringin'] ;
	else $str_oringin = null ;
?>

<!DOCTYPE html>
<head>
<title>SpeechApi</title>
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
							
							<form action="Handle/SpeechApi_handle.php" name="fileForm" method="post" enctype="multipart/form-data">
								<label>輸入檔</label><input type="file" name="input_file">
								<input type="submit" value="送出">
							</form>

						</div>
					</div>
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
						<div style="background:white;" id = "tempBox" class="inputTempbox">
							<?php 
								for($i = 0; $i < sizeof($str_input); $i ++){
									echo '<div>';
										echo $str_oringin[$i]." : "	.$str_input[$i] ; 
									echo '</div>';
								}	
							?>
						</div>
					</div>
				
			</div>
			<div>
				<form action="Handle/StoreHandle.php" method="post" enctype="multipart/form-data">
					<?php
						for($i =0; $i < sizeof($str_input); $i ++){
							echo '<input type="hidden" name="str_input[]" value="'.$str_input[$i].'"/>' ;
							echo '<input type="hidden" name="str_oringin[]" value="'.$str_oringin[$i].'"/>' ;
							echo '<input type="hidden" name="doWhat" value="add"/>' ;
						}
					?>
					<input type="submit">
				</form>
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