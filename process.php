<?php 
	session_start();
	if (isset($_POST['submit'])) {
		if (empty($_POST['username']) || empty($_POST['password'])) {
		$error = "Username or Password is invalid";
		echo $error;
		}
		else
		{
			include_once('db.php');
			$username = mysqli_real_escape_string($dbc, trim($_POST['username']));
			$password = mysqli_real_escape_string($dbc, trim($_POST['password']));
			

			$query = "SELECT * FROM settings WHERE username='$username' AND password='$password'";
			$results = mysqli_query($dbc, $query);
			$row = mysqli_fetch_array($results);
			
			if($row[0] > 0 ){
				echo "Login successful";
				/*header("Location: /dashboard.php");*/
				$_SESSION['logged_in'] = $username;
				echo " <script> location.replace(\"dashboard.php\"); </script>";
				exit;
			}
			else
			{
				echo "Login failed";
			}
		}
	}
?>