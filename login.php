<?php 
	session_start();
	if(isset($_SESSION['logged_in'])){
		echo "<script> location.replace(\"dashboard.php\"); </script>";
	}
?>
<!-- Include Header-->
<?php include("header.php"); ?>

<!-- Begin Login Form-->
	<div id="loginWrapper">
		<h2>Timed Evaluation Manager</h2>
		<div id="loginFormWrapper">
			<p>Log in to the dashboard</p>
			<form id="loginForm" action="process.php" method="post">
				<input type="text" class="field" name="username" id="username" placeholder="Username"/>
				<input type="password" class="field" name="password" id="password" placeholder="Password"/>
				<div class="buttonContainer">
					<input type="submit" name="submit" value="Log in"/>
				</div>
			</form>
			
		</div> <!-- End loginFormWrapper-->
		<p>Developed By: <a href="http://www.eightleafrabbit.com" target="_blank">Eight Leaf Rabbit</a></p>
	</div> <!-- End loginWrapper-->
	
<!-- Include Footer-->
<?php include("footer.php"); ?>