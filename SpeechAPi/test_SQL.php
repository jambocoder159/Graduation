<?php
	require_once("dbtools.inc.php") ;
    $link = create_connection() ;



    $sql ="SELECT * FROM t_name " ;
    $result = execute_sql($link,"test",$sql) ;
    $meta = mysqli_fetch_row($result) ;

    echo $meta[2];
?>