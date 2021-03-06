﻿<!-- Include Header-->
<?php include("header-interviewPage.php"); ?>

<!-- Begin Interview Test Content-->
<div id="container">
	<section id="div1">
		<div>
			<h1 class="testHeader">Air & Water</h1>
			<h3>Customer Service Evaluation</h3>
			<div id="interviewForm">
				<label>First Name:</label>
				<input type="text" class="field" name="firstName" id="firstName"/>

				<label>Last Name:</label>
				<input type="text" class="field" name="lastName" id="lastName"/>
				<span id="intervieweeInfoResult"></span>
			</div>
			<div class="buttonContainer">
				<button name="startButton" id="startButton">Begin</button>
			</div>
		</div>
	</section>
	
	<div class="space"></div>
	
	<div id="questionPanel">
	<div>
</div>

<!-- Include Footer-->
<?php include("footer.php"); ?>