<?php
	
	include_once('db.php');

	$intervieweeFirstName = $_POST['firstName'];
	$intervieweeLastName = $_POST['lastName'];
	
	$query = "INSERT INTO tests (firstName, lastName) VALUES ('$intervieweeFirstName', '$intervieweeLastName')";
	if ($dbc->query($query) === TRUE && $dbc->affected_rows != 0) {
	
		$sql = "SELECT * FROM questions";
		$result = $dbc->query($sql);
		$result = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($result);
	} 
	else {
		echo json_encode('failure'); 
	}
	$dbc->close();
?>