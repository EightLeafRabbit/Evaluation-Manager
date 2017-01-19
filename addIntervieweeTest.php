<?php
	
	include_once('db.php');

	$intervieweeFirstName = $_POST['firstName'];
	$intervieweeLastName = $_POST['lastName'];
	$testData = json_encode($_POST['testData']);
	$testData = $dbc->real_escape_string($testData);
	echo var_dump($testData);

	$query = "INSERT INTO tests (firstName, lastName, testData) VALUES ('$intervieweeFirstName', '$intervieweeLastName', '$testData')";
	
	if(!$dbc->query($query))
	{
		echo $dbc->error;
	}

	/*
	if ($dbc->query($query) === TRUE && $dbc->affected_rows != 0) {
		echo json_encode('success');
	} 
	else {
		echo json_encode('failure'); 
	}
	*/
	$dbc->close();
?>