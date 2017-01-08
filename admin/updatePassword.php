<?php
	
	include_once('db.php');

	$oldPassword = $_POST['oldPassword'];
	$newPassword = $_POST['newPassword'];
	
	$query = "UPDATE settings SET password='$newPassword' WHERE password='$oldPassword'";
	if ($dbc->query($query) === TRUE && $dbc->affected_rows === 1) {
		$result = 'success';
	} else {
		$result = 'failure'; 
	}
	
	//error_log(print_r($response_array, true));
	echo $result;
	$dbc->close();
?>