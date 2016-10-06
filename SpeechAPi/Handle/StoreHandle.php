<?php
header("Content-Type:text/html; charset=utf-8");

require_once("dbtools.inc.php") ;
$link = create_connection() ;

if(isset($_POST['str_input'])) $str_input = $_POST['str_input'] ;
	else $str_input = null ; //接收處理好的輸出

if(isset($_POST['str_oringin'])) $str_oringin = $_POST['str_oringin'] ;
	else $str_oringin = null ;

if(isset($_POST['doWhat'])) $doWhat = $_POST['doWhat']) ;

if($doWhat == "add"){

	$sql ="SELECT * FROM data WHERE type = 'testData' " ;
        $result = execute_sql($link,"fans999c_ecmat",$sql) ;
        $typenum = mysqli_num_rows($result) + 1 ;

    for($i = 0; $i < sizeof($str_input); $i ++){
        
		$sql ="INSERT INTO data(type,no,name,result,TorF) VALUES('testData','$typenum','$str_oringin','$str_input','current')" ;
    		$result = execute_sql($link,"speechapi",$sql) ;

    	$typenum++ ;	

    }
}

?>