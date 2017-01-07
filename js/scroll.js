$(document).ready(function(){
	var scrollGlobals = {questionCounter:0, questionList : 0};
	var testData = TestData();
	//we make the ajax request
	$.ajax({
		type: "POST",
		url : 'returnQuestionList.php',
		dataType : "json",
		success:function(result){
			if(result !== 'failure'){
				scrollGlobals.questionList = result;
			}
			else {
				$('#intervieweeInfoResult').html("There was an error retrieving the question list.");
			}
		}
	});
	
	
	function nextQuestion(){
		if(scrollGlobals.questionCounter !== 0){
			var completedQuestionIndex = scrollGlobals.questionCounter - 1;
			testData.addQAData();
		}
		if(scrollGlobals.questionCounter < scrollGlobals.questionList.length){
			var questionIndex = scrollGlobals.questionCounter;
			var questionList = scrollGlobals.questionList;
			
			$('#questionPanel').append("<section id=\"questionDisplay\"><div><h1 class=\"questionNumber" + questionIndex + "\"></h1><div id=\"interviewForm\"><h3 id=\"questionTitle" + questionIndex + "\"></h3><p id=\"questionDescription" + questionIndex + "\"></p><textarea id=\"answer" + questionIndex + "\"></textarea><div class=\"buttonContainer\"><button name=\"continueButton\" class=\"continueButton\" id=\"continueButton" + questionIndex + "\">Continue</button></div></div></div></section><div class=\"space\"></div>");
		
			$('.questionNumber' + questionIndex).html("Question " + (questionIndex + 1));
			$('#questionTitle' + questionIndex).html(questionList[questionIndex].question);
			$('#questionDescription' + questionIndex).html(questionList[questionIndex].description);
			
			
			$('body, html').animate({ scrollTop: $(".questionNumber" + questionIndex).offset().top }, 1000);
			
			
			scrollGlobals.questionCounter++;
			if(scrollGlobals.questionCounter == scrollGlobals.questionList.length){
				$('#continueButton' + questionIndex).html("Finish");
				$('#continueButton' + questionIndex).click(function() {
					$('#questionPanel').append("<section id=\"endMessageDisplay\"><div><h1 class=\"endPage\">Thank you!<br/>Your evaluation has been sent to the manager.</h1></div></section><div class=\"space\"></div>");
					$('body, html').animate({ scrollTop: $(".endPage").offset().top }, 1000);
					
					//Save test
					var firstNameValue = $('#firstName').val();
					var lastNameValue = $('#lastName').val();
					
					var intervieweeTest = {
					'firstName': firstNameValue,
					'lastName': lastNameValue,
					'testData': testData.results
					};
				
					//we make the ajax request
					$.ajax({
						data : intervieweeTest,
						type: "POST",
						url : 'addIntervieweeTest.php',
						dataType : "json",
						success:function(result){
							if(result !== 'failure'){
								$('#intervieweeInfoResult').html("Successfully saved interviewee data to the database.");
							}
							else {
								$('#intervieweeInfoResult').html("There was an error saving interviewee to the database.");
							}
						}
					});
				});
			}
		}
		else{
			testData.endTimer();
		}
	}
	
	function preventScrolling(){
			
	}
	
	$(function(){
		$('#container').on('click','#startButton',function(){
			var firstNameValue = $('#firstName').val();
			var lastNameValue = $('#lastName').val();
			
			if(firstNameValue === '' || lastNameValue === ''){
				$('#intervieweeInfoResult').html("Fill out the required information.");
			}
			else{
				testData.startTimer();
				nextQuestion();
			}
		});
	});
	
	$(function(){
		$('#container').on('click','.continueButton',function(){
			nextQuestion();
			
		});
	});
	
	//TestData factory
	function TestData() {
		function leadingZero(value){
			if(value < 10) {
				value = "0" + value;
			}
			return value;
		}
		
		function dateToString(currentTime, appendSuffix) {
			var hours = leadingZero(currentTime.getHours());
			var minutes = leadingZero(currentTime.getMinutes());
			var seconds = leadingZero(currentTime.getSeconds());
			
			var suffix = "";
			if(appendSuffix === true) {
				suffix = (hours >= 12) ? " PM" : " AM";
			}
			
			if(hours > 12) hours -= 12;
			var result = hours + ":" + minutes + ":" + seconds + suffix;
			return result;
		}
		
		function calcElapsed(endDate, startDate) {
			var result = new Date();
			var endTime = 
			{
				seconds: endDate.getSeconds(),
				minutes: endDate.getMinutes(),
				hours: endDate.getHours()
			};
			var startTime = 
			{
				seconds: startDate.getSeconds(),
				minutes: startDate.getMinutes(),
				hours: startDate.getHours()
			};
			
			if(endTime.seconds < startTime.seconds)
			{
				endTime.seconds += 60;
				startTime.minutes--;
			}
			if(endTime.minutes < startTime.minutes)
			{
				endTime.minutes += 60;
				startTime.hours--;
			}
			result.setHours(endTime.hours - startTime.hours);
			result.setMinutes(endTime.minutes - startTime.minutes);
			result.setSeconds(endTime.seconds - startTime.seconds);
			result = dateToString(result, false);
			return result;
		}
		
		var questionCounter = 0;
		var intervalStart = new Date();
		var intervalEnd = new Date();
		var	testStart = Date();
		var	testEnd = Date();
		
		var self = {
			results: {},
			
			startTimer: function() { 
				testStart = new Date();
				intervalStart = testStart;
				this.results.startTime = dateToString(testStart);
				console.log(this.results);
			},
			
			endTimer: function() { 
				testEnd = new Date();
				this.results.totalTime = calcElapsed(testEnd, testStart);
				this.results.endTime = dateToString(testEnd);
				console.log(this.results);
			},
			
			addQAData: function() {
				var newQAProp = "q" + questionCounter + "Data";
				this.results[newQAProp] = {};
				
				this.results[newQAProp]["question"] = 
					$('#questionTitle' + questionCounter).html();
				this.results[newQAProp]["answer"] = 
					$('#answer' + questionCounter).val();
					
				intervalEnd = new Date();
				this.results[newQAProp]["interval"] = 
					calcElapsed(intervalEnd, intervalStart);
				intervalStart = intervalEnd;
				questionCounter++;
				console.log(this.results);
			}
		}
		
		return self;
	}
});

