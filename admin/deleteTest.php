<?php
	include_once('db.php');
	
	$deleteRowId = $_POST['rowID'];
	$query = "DELETE FROM tests WHERE testID = $deleteRowId";
	
	if ($dbc->query($query) === TRUE && $dbc->affected_rows > 0) {
		$sql = "SELECT * FROM tests";
		$result = $dbc->query($sql);

		if ($result->num_rows > 0) {
			echo "<table><tr><th>#</th><th>Last Name</th><th>First Name</th><th>Lapsed Time</th><th>Remove</th></tr>";
			while($row = mysqli_fetch_array($result)){
				echo "<tr><td class=\"centerCell\">" . $row['testID'] . "</td><td>" . $row['firstName'] .
				"</td><td>" . $row['lastName'] . "</td><td>". $row['timeLapsed'] ."</td>
				<td class=\"iconHolder\"><a><img src=\"images/delete-icon.png\" class=\"iconAction\" title=\"Remove\" id=\"" . $row['testID'] . "\"/></a>
				</td></tr>";
			}
			echo "</table>";
		} else {
			echo "<table><tr><th>#</th><th>Last Name</th><th>First Name</th><th>Lapsed Time</th><th>Remove</th></tr>";
			echo "<tr><td colspan=\"5\"><p>There are no completed tests yet.</p></td></tr>";
			echo "</table>";
		}
	}
	else {
		echo "failure"; 
	}
	error_log($dbc->error);
	$dbc->close();
?>