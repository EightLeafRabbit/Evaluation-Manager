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
				<h1>Tests</h1>
				<p>View tests taken.</p>
				<!-- List of Tests -->
				<div id="box">
					<div id="testList" class="box-panel">
					
					<?php
					include_once('db.php');
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
					?>
				</div>
			</div>
		</div>
	</div>

<!-- Include Footer-->
<?php include("footer.php"); ?>