<!-- Check for Session -->
<?php include('session.php'); ?>
<!-- Include Header-->
<?php include("header.php"); ?>

	<!-- Dashboard Contents-->
	<header>
		<div class="logo">Timed Evaluation Manager</div>
		<div class="logout"><a href="logout.php">Log Out</a></div>
	</header>
	
	<a class="mobile" href="#">MENU</a>
	
	<div id="container">
		<!-- Include Sidebar-->
		<?php include("sidebar.php"); ?>
		
		<div class="content">
			<h1>Dashboard</h1>
			<p>Quick glance at test performances and account activity. </p>
			
			<div id="box">
				<div class="box-top">Recent Tests</div>
				<div class="box-panel">
					Recent tests
				</div>
			</div>
			
			<div id="box">
				<div class="box-top">Test Statistics</div>
				<div class="box-panel">
					Test statistics
				</div>
			</div>
			
			<div id="box">
				<div class="box-top">Activity Log</div>
				<div class="box-panel">
					Activity log
				</div>
			</div>
			
		</div>
	</div>

<!-- Include Footer-->
<?php include("footer.php"); ?>