<?php
	session_start();
	if(!isset($_SESSION['logged_in'])){
	echo "<script> location.replace(\"login.php\"); </script>";
	}

?>