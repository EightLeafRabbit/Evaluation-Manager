<?php
	
	include_once('db.php');

	$email = $_POST['email'];
	
	$query = "UPDATE settings SET email='$email'";
	if ($dbc->query($query) === TRUE && $dbc->affected_rows === 1) {
		$result = 'success';
	} else {
		$result = 'failure'; 
	}
	
	//error_log(print_r($response_array, true));
	echo $result;
	$dbc->close();
?>