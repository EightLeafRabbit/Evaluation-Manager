"use strict";

$(function(){
	//Event handlers
	var userInfo = {firstName: "", lastName: ""};
	$('#container').on('click', '#startButton', function(){
		userInfo.firstName = $('#firstName').val();
		userInfo.lastName = $('#lastName').val();
		
		if(userInfo.firstName === '' || userInfo.lastName === ''){
			$('#intervieweeInfoResult').html("Fill out the required information.");
		}
		else{
			stopwatch.start();
			advanceInterview();
		}
	});
	
	$('#container').on('click','.continueButton', advanceInterview);

	//Modules
	var stopwatch = function(){
		var splitStartTime;
		var splits = [];
		var running = false;

		return {
			start: function(){
				if(!running){ 
					splitStartTime = new Date();
					running = true;
				}
			},
			split: function(){
				if(running){
					var now = new Date();
					var splitTime = Math.round((now - splitStartTime)/1000); 
					splits.push(splitTime);
					splitStartTime = now;
				}
			},
			stop: function(){
				if(running){
					this.split();
					running = false;
				}
			},
			getData: function(){
				var sumSplits = splits.reduce(function(previousValue, currentValue){
					return currentValue + previousValue;
				});

				return {
					totalSecondsElapsed: sumSplits,
					splits: splits
				};
			}
		};
	}();

	var interviewData = function () {
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
		
		var questionCounter = 0;
		var data;
		$.get({
			url: "getInterviewQuestions.php",
			dataType: "json",
			success: function(result){
				data = result;
			} 
		});

		return {
			results: {},
			addAnswerData: function() {
				var newQAProp = "q" + questionCounter + "Data";
				this.results[newQAProp] = {};
				
				this.results[newQAProp]["question"] = 
					$('#questionTitle' + questionCounter).html();
				this.results[newQAProp]["answer"] = 
					$('#answer' + questionCounter).val();
					
				questionCounter++;
			}
		}
	}();


	function advanceInterview(){
		if(questionData.currentQuestionIndex !== 0){
			interviewData.addQAData();
		}
		if(questionData.currentQuestionIndex < questionList.length){
			var questionIndex = questionData.currentQuestionIndex;
			var questionList = questionList;
			
			$('#questionPanel').append("<section id=\"questionDisplay\"><div><h1 class=\"questionNumber" + questionIndex + "\"></h1><div id=\"interviewForm\"><h3 id=\"questionTitle" + questionIndex + "\"></h3><p id=\"questionDescription" + questionIndex + "\"></p><textarea id=\"answer" + questionIndex + "\"></textarea><div class=\"buttonContainer\"><button name=\"continueButton\" class=\"continueButton\" id=\"continueButton" + questionIndex + "\">Continue</button></div></div></div></section><div class=\"space\"></div>");
		
			$('.questionNumber' + questionIndex).html("Question " + (questionIndex + 1));
			$('#questionTitle' + questionIndex).html(questionList[questionIndex].question);
			$('#questionDescription' + questionIndex).html(questionList[questionIndex].description);
			
			//Scrolls the web page to the next question.
			$('body, html').animate({ scrollTop: $(".questionNumber" + questionIndex).offset().top }, 1000);
			
			//Prevent users from scrolling to the previous question.
			$('body').css("overflow", "hidden");
			questionData.currentQuestionIndex++;
			
			if(questionData.currentQuestionIndex == questionList.length){
				$('#continueButton' + questionIndex).html("Finish");
				$('#continueButton' + questionIndex).click(function() {
					$('#questionPanel').append("<section id=\"endMessageDisplay\"><div><h1 class=\"endPage\">Thank you!<br/>Your evaluation has been sent to the appropriate personnel.</h1></div></section><div class=\"space\"></div>");
					$('body, html').animate({ scrollTop: $(".endPage").offset().top }, 1000);
					
					//Save test
					var firstNameValue = $('#firstName').val();
					var lastNameValue = $('#lastName').val();
					
					var intervieweeTest = {
					'firstName': firstNameValue,
					'lastName': lastNameValue,
					'testData': interviewData.results
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
			interviewData.endTimer();
		}
	}
});

