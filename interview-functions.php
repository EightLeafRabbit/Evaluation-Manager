<?php
	include_once('db.php');
	//TODO: defang user input
	
	if(array_key_exists('action', $_POST)){
		$action = $_POST['action'];
	}
	else if(array_key_exists('action', $_GET)){
		$action = $_GET['action'];
	}
	else{
		$action = '';
	}
	switch($action){
		case 'insertTestResults': insertTestResults(); break;
		case 'getQuestions': getQuestions(); break;
		default: echo 'No action specified';
	}

	function insertTestResults(){
		global $dbc;
		$intervieweeFirstName = $_POST['testData']['firstName'];
		$intervieweeLastName = $_POST['testData']['lastName'];
		$testData = json_encode($_POST['testData']['testData']);
		$testData = $dbc->real_escape_string($testData);
		$query = "INSERT INTO tests (firstName, lastName, testData)" . 
			" VALUES ('$intervieweeFirstName', '$intervieweeLastName', '$testData')";
		if(!$dbc->query($query))
		{
			echo $dbc->error;
		}
	}

	function getQuestions(){
		global $dbc;
		$query = "SELECT * FROM questions";
		$result = $dbc->query($query);		
		if ($result && $result->num_rows > 0){
			$result = $result->fetch_all(MYSQLI_ASSOC);
			echo json_encode($result);
		} 
		else {
			echo $dbc->error; 
		}
	}

	$dbc->close();
?>