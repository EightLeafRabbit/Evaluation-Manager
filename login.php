<?php 
	session_start();
	if(isset($_SESSION['logged_in'])){
		echo "<script> location.replace(\"dashboard.php\"); </script>";
	}
?>
<!-- Include Header-->
<?php include("header.php"); ?>

<!-- Begin Login Form-->
	<h1 class="testHeader">Control Panel Login</h1>
	<div id="wrapper">
		<form id="loginForm" action="process.php" method="post">
			<label>Username:</label>
			<input type="text" class="field" name="username" id="username"/>

			<label>Password:</label>
			<input type="password" class="field" name="password" id="password"/>
			<div class="buttonContainer">
				<input type="submit" name="submit" value="login"/>
			</div>
		</form>
	</div>
<!-- Include Footer-->
<?php include("footer.php"); ?>