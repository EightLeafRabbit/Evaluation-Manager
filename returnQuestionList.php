<?php
	
	include_once('db.php');
	
	$query = "SELECT * FROM questions";
	$result = $dbc->query($query);
	if ($result->num_rows > 0){
		$result = $result->fetch_all(MYSQLI_ASSOC);
		echo json_encode($result);
	} 
	else {
		echo json_encode('failure'); 
	}
	$dbc->close();
?>