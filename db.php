<?php
	$servername = "localhost"; /*mysql.eightleafrabbit.com*/
	$db_user = "root"; /*greafyleens*/
	$db_password = ""; /*lunitari*/
	$db_name = "timed evaluation manager";
	
	// Create connection
	$dbc = mysqli_connect($servername, $db_user, $db_password, $db_name);
	
	// Check connection
	if ($dbc->connect_error) {
		die("Connection failed: " . mysql_error());
	} 
?>