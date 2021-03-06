<?php
header("Content-Type:text/html; charset=utf-8");

$testData = array();
$originData = array() ;

//尋找某個字的前兩位得數字========================================================================================================================================
function Search_num($str_input,$value)
{
	$str = mb_substr($str_input, $value-2 ,2,"utf-8") ;
	if(strlen($str)>=4)$str = $str[3];

	return $str ;
}
//=================================================================================================================================================================

//檔案傳入-------------------------------------------------------------------
//判斷是送一字串還是送檔案
if(!isset($_FILES["input_file"])){

	$fileORtext = 1 ;   //檔案跑洄圈 字串跑一次
	//接收input的字串
	if(isset($_POST['str_input'])) {
		array_push($testData, $_POST['str_input']) ;
		array_push($originData, $_POST['str_input']) ;
	}
	else $str_input = "" ;

} else {
	move_uploaded_file($_FILES["input_file"]["tmp_name"],"upload/input_file/" . $_FILES["input_file"]["name"]);
	echo "Stored in: " . "upload/input_file/" . $_FILES["input_file"]["name"]."<br>";
	$myfile = fopen("upload/input_file/".$_FILES["input_file"]["name"], "r") or die("Unable to open file!");
	// 输出一行直到 end-of-file
	while(!feof($myfile)) {
	   $t = fgets($myfile) ; //抓一行
	   $a = (explode(" ", $t)) ; //空白分割
	   if($a[0] == $a[1])echo $a[0]."==".$a[1]."Yes"."<br>";
	   else echo $a[0]."NO". "<br>" ;
	   array_push($testData, $a[0]) ;
	   array_push($originData, $a[0]) ;
	}
	$fileORtext = sizeof($testData) ;   //檔案跑洄圈 字串跑一次
	fclose($myfile);
}

//---------------------------------------------------------------------------


for($i = 0; $i < $fileORtext; $i++){

	$str_input = $testData[$i] ;

	//mb_strpos(string,find,start) 搜尋字串在哪
	//mb_substr ( string $str , int $start , int $length , string $encoding ) 切割字串
	//substr_count(string,substring,start,length) 數有幾個要搜尋的字串
	ini_set('date.timezone', 'Asia/Taipei'); // 設定時區
	$date = date('Y-m-d H:i:s'); //現在時間
	$year = (int)mb_substr($date,0,4);   //年
	$month = (int)mb_substr($date,5,2) ;  //月
	$day = (int)mb_substr($date,8,2) ; //日
	$hour = (int)mb_substr($date,11,2) ; //時
	$minutes = (int)mb_substr($date,14,2) ; //分
	$second = (int)mb_substr($date,17,2) ; //秒
	$da = new DateTime();
	//$da->setDate($year,$month,$day);  //設定日期
	//date_modify($da, 'monday this week +2 week +2 day');
	//$da->setTime($hour,$minutes,$second); //設定時間


	//搜尋字串位置----------------------------------------------------
	$down_where = mb_strpos($str_input,"下") ;
	$after_where = mb_strpos($str_input,"後") ;
	$yesr_where = mb_strpos($str_input,"年") ;
	$month_where = mb_strpos($str_input,"月") ;
	$week_where = mb_strpos($str_input,"星期") ;
	$day_where = mb_strpos($str_input,"天") ;
	$month_day_where = mb_strpos($str_input,"號") ;
	$point =  mb_strpos($str_input,"點") ;
	$afternoon = mb_strpos($str_input,"下午") ;
	$morning = mb_strpos($str_input,"上午") ;
	if(mb_strpos($str_input,"星期一"))$what_day = "monday" ;
	else if(mb_strpos($str_input,"星期二")) $what_day = "tuesday" ;
	else if(mb_strpos($str_input,"星期三")) $what_day = "wednesday";
	else if(mb_strpos($str_input,"星期四")) $what_day = "thursday" ;
	else if(mb_strpos($str_input,"星期五")) $what_day = "friday" ;
	else if(mb_strpos($str_input,"星期六")) $what_day = "saturday" ;
	else if(mb_strpos($str_input,"星期日")) $what_day = "sunday" ;

	if((string)$point!= "")$hour+=12 ;
	//----------------------------------------------------------------

	//數有幾個我要的字或字串===========================================

	if(substr_count($str_input,"下") && substr_count($str_input,"下午"))$down_count = substr_count($str_input,"下")-1 ; // how many 下
	else $down_count = substr_count($str_input,"下");

	//=================================================================

	if( ((string)$down_where != "") && ((string)$down_where == "0") ){        //如果有抓到"下"這個詞 
		
		//有月有星期-------------------------------------------------------------------------------------
		if( (string)$month_where != "" && (string)$week_where != ""){   
			
			
		}
		//-----------------------------------------------------------------------------------------------

		//只有月=========================================================================================
		else if((string)$month_where != ""){  

			if((string)$month_day_where != ""){   //幾月幾號
				$day = Search_num($str_input,$month_day_where) ;
			}

			if((string)$point!= ""){ //抓到點

				if((string)$afternoon!= ""){  //幾月幾號幾點 
				 	$hour = Search_num($str_input, $point,"utf-8")+12 ;
				} else {
					$hour = Search_num($str_input, $point,"utf-8");
				}
			}

			$month = $month + $down_count ;

			$da->setDate($year,$month,$day);  //設定日期
			$da->setTime($hour,$minutes,$second); //設定時間
		}
		//================================================================================================

		//只有星期----------------------------------------------------------------------------------------
		else if((string)$week_where != ""){  

			if((string)$point!= ""){
				if((string)$afternoon!= ""){  //幾點 
				 	$hour = Search_num($str_input, $point,"utf-8")+12 ;
				} else {
					$hour = Search_num($str_input, $point,"utf-8");
				}
			}

			$day = $day + 7*$down_count ; //幾個星期後
			$da->setDate($year,$month,$day);  //設定日期
			date_modify($da, $what_day.' this week ');
			$da->setTime($hour,$minutes,$second); //設定時間
		}
		//------------------------------------------------------------------------------------------------

	}
	else if((string)$after_where != ""){      //如果有抓到"後"這個詞

	}

	$testData[$i] = $da->format('Y-m-d H:i:s') ;

}

	$str_output = $da->format('Y-m-d H:i:s') ;
	echo $da->format('Y-m-d H:i:s').'<br>' ;
	echo $testData[0] ;





//送回結果給首頁------------------------------------------------------------------
echo '<form name="auto" action="../SpeechApi.php" method="POST">' ;

	if(!isset($_FILES["input_file"])){
		    echo '<input type="hidden" name="str_input[]" value="'.$testData[0].'"/>' ;
		    echo '<input type="hidden" name="str_oringin[]" value="'.$originData[0].'"/>' ;
	}else {

		for($i = 1; $i < sizeof($testData) ; $i ++){

			echo '<input type="hidden" name="str_input[]" value="'.$testData[$i].'"/>' ;
			echo '<input type="hidden" name="str_oringin[]" value="'.$originData[$i].'"/>' ;
		}
	}
    echo '<input style="" type="submit" value="submit"/>';
echo '</form>' ;
?>
<script type="text/javascript">
	auto.submit();
</script>
