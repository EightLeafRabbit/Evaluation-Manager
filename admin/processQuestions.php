<?php
	
	include_once('db.php');

	$newQuestion = mysqli_real_escape_string($dbc, trim($_POST['newQuestion']));
	$newQuestionDescription = mysqli_real_escape_string($dbc, trim($_POST['newQuestionDescription']));
	
	$query = "INSERT INTO questions (question, description) VALUES ('$newQuestion', '$newQuestionDescription')";
	if ($dbc->query($query) === TRUE && $dbc->affected_rows === 1) {
		
		$sql = "SELECT * FROM questions";
		$result = $dbc->query($sql);

		if ($result->num_rows > 0) {
			echo "<table><tr><th>#</th><th>Question</th><th>Description</th><th>Edit</th><th>Remove</th></tr>";
			while($row = mysqli_fetch_array($result)){
				echo "<tr><td class=\"centerCell\">" . $row['questionID'] . "</td><td>" . $row['question'] .
				"</td><td>" . $row['description'] . "</td><td class=\"iconHolder\"><a>
				<img src=\"images/edit-icon.png\" class=\"iconAction\" title=\"Edit\" id=\"" . $row['questionID'] . "\"/></a></td>
				<td class=\"iconHolder\"><a><img src=\"images/delete-icon.png\" class=\"iconAction\" title=\"Remove\" id=\"" . $row['questionID'] . "\"/></a>
				</td></tr><tr class=\"editContainer editContainerDisplay\" id=\"" . $row['questionID'] . "\"><td colspan=\"5\">
				<label>Question</label><input type=\"text\" name=\"editQuestion\" id=\"editQuestion\" data-rowID=\"" . $row['questionID'] . "\"/>
				<label>Description:</label><textarea name=\"editQuestionDescription\" id=\"editQuestionDescription\"data-rowID=\"" . $row['questionID'] . "\"></textarea>
				<button id=\"saveEditQuestion\" class=\"saveEditQuestion\" data-rowID=\"" . $row['questionID'] . "\">Save</button><button id=\"cancelEditQuestion\" class=\"cancelEditQuestion\" data-rowID=\"" . $row['questionID'] . "\">Cancel</button>
				<span class=\"questionEditResult\" data-rowID=\"" . $row['questionID'] . "\"></span></td></tr>";
			}
			echo "</table>";
		} else {
			echo "<table><tr><th>#</th><th>Question</th><th>Description</th><th>Edit</th><th>Remove</th></tr>";
			echo "<tr><td colspan=\"5\"><p>You have not created any questions yet.</p></td></tr>";
			echo "</table>";
		}
	}
	else {
		echo 'failure'; 
	}
	
	
	error_log($dbc->error);
	$dbc->close();
?>