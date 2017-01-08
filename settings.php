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
			<h1>Settings</h1>
			<p>Edit your administrator settings, such as your password or email notification.</p>
			
			<div id="box">
				<div class="box-top">Password Change</div>
				<div class="box-panel">
					<form id="passwordChangeForm">
						<label>Old password:</label>
						<input type="password" name="oldPassword" id="oldPassword"/>
						<label>New password:</label>
						<input type="password" name="newPassword" id="newPassword"/>
						<button type="submit" name="passwordChangeSubmit" id="passwordChangeSubmit" class="normal">Submit</button>
						<span id="passwordChangeResult"></span>
					</form>
				</div>
			</div>
			
			<div id="box">
				<div class="box-top">E-mail Notification</div>
				<div class="box-panel">
					<form id="emailForm">
						<label>Email:</label>
						<input type="email" name="email" id="email"/>
						<button type="submit" name="emailButton" id="emailButton" class="normal">Submit</button>
						<span id="emailUpdateResult"></span>
					</form>
				</div>
			</div>
		</div>
	</div>

<!-- Include Footer-->
<?php include("footer.php"); ?>