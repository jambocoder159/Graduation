<?php
header("Content-Type:text/html; charset=utf-8");

if ($_FILES["input_file"]["error"] > 0)
{
	echo "Return Code: " . $_FILES["input_file"]["error"] . "<br />";
}
else
{
	echo "input :"."<br>";
	echo "Upload: " . $_FILES["input_file"]["name"] . "<br />";
	echo "Type: " . $_FILES["input_file"]["type"] . "<br />";
	echo "Size: " . ($_FILES["input_file"]["size"] / 1024) . " Kb<br />";
	echo "Temp file: " . $_FILES["input_file"]["tmp_name"] . "<br />";

	
		move_uploaded_file($_FILES["input_file"]["tmp_name"],
		"upload/input_file/" . $_FILES["input_file"]["name"]);
		echo "Stored in: " . "upload/input_file/" . $_FILES["input_file"]["name"]."<br>";	


}


	$myfile = fopen("upload/input_file/".$_FILES["input_file"]["name"], "r") or die("Unable to open file!");
	// 输出一行直到 end-of-file
	while(!feof($myfile)) {
	   $t = fgets($myfile) ;
	   $a = (explode(" ", $t)) ;
	   if($a[0] == $a[1])echo $a[0]."==".$a[1]."Yes"."<br>";
	   else echo $a[0]."NO". "<br>" ;
	}
	fclose($myfile);

?>