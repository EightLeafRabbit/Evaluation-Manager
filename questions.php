<!-- Include Header-->
<?php include("header.php"); ?>

	<!-- Dashboard Contents-->
	<header>
		<div class="logo">Timed Evaluation Manager</div>
		<div class="logout"><a href="logout.php">Log Out</a></div>
	</header>
	
	<a class="mobile" href="#">MENU</a>
	
	<div id="container">
		<div id="loadQuestions">
			<!-- Include Sidebar-->
			<?php include("sidebar.php"); ?>
			
			<div class="content">
				<h1>Questions</h1>
				<p>Manage your questions by creating, editing, or removing them.</p>
				<div id="box">
					<!-- Add New Question Button-->
					<button class="normal-newQuestionButton" id="newQuestionButton">New Question</button>
					
					<div class="box-top" id="newQuestionBox">Create Your Question</div>
						<div class="box-panel" id="newQuestionBoxPanel">
							<div id="addNewQuestion">
								<!--<form id="newQuestionForm">-->
									<label>Question:</label>
									<input type="text" name="newQuestion" id="newQuestion" />
									<label>Description:</label>
									<textarea name="newQuestionDescription" id="newQuestionDescription"></textarea>
									<button id="saveNewQuestion" class="normal">Save</button>
									<button id="cancelNewQuestion" class="normal">Cancel</button>
									<div id="questionCreationResult"></div>
								<!--</form>-->
							</div>
						</div>
					<!-- List of Questions -->
					<div id="box">
						<h2>List</h2>
						<div id="questionList" class="box-panel">
						
						<?php
						include_once('db.php');
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
						?>
					</div>
				</div>
			</div>
		</div>
	</div>

<!-- Include Footer-->
<?php include("footer.php"); ?>