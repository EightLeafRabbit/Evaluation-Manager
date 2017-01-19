"use strict";

$(function(){
	
	//Modules
	var stopwatch = function(){
		var _splitStartTime;
		var _splits = [];
		var _running = false;

		return {
			start: function(){
				if(!_running){ 
					_splitStartTime = new Date();
					_running = true;
					_splits = [];
				}
			},
			split: function(){
				if(_running){
					var now = new Date();
					var splitTime = Math.round((now - _splitStartTime)/1000); 
					_splits.push(splitTime);
					_splitStartTime = now;
				}
			},
			stop: function(){
				if(_running){
					this.split();
					_running = false;
				}
			},
			getData: function(){
				var sumSplits = _splits.reduce(function(previousValue, currentValue){
					return currentValue + previousValue;
				});

				return {
					totalSecondsElapsed: sumSplits,
					splits: _splits
				};
			}
		};
	}();

	var questionAnswerData = function(){
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
		
		var self = {};
		self.data = [];
		$.get({
			url: "interview-functions.php",
			data: {action: "getQuestions"},
			dataType: "json",
			success: function(result){
				self.data = result;
			} 
		});
		self.addAnswerData = function(questionIndex, answerString) { this.data[questionIndex].answer = answerString; };

		return self;
	}();
	
	//Event handlers
	var userInfo = {firstName: "", lastName: ""};
	var gCurrentQuestionIndex = 0;
	$('#container').on('click', '#startButton', function(){
		userInfo.firstName = $('#firstName').val();
		userInfo.lastName = $('#lastName').val();
		
		if(userInfo.firstName === '' || userInfo.lastName === ''){
			$('#intervieweeInfoResult').html("Fill out the required information.");
		}
		else{
			stopwatch.start();
			appendNextQuestion(gCurrentQuestionIndex, questionAnswerData.data[gCurrentQuestionIndex]);
			$('#container').off("click", "#startButton");
		}
	});
	
	$('#container').on('click','#finishButton', function(){
		stopwatch.stop();
		questionAnswerData.addAnswerData(gCurrentQuestionIndex, $('#answer' + gCurrentQuestionIndex).val());

		$('#questionPanel').append("<section id=\"endMessageDisplay\"><div>" +
		"<h1 class=\"endPage\">Thank you!<br/>Your evaluation has been sent to the appropriate personnel." +
		"</h1></div></section><div class=\"space\"></div>");
		$('body, html').animate({ scrollTop: $(".endPage").offset().top }, 1000);
		
		var testData = {
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			testData: questionAnswerData.data
		};
		$.post({
			url : 'interview-functions.php',
			data : {action: "insertTestResults", testData: testData},
		});
	});

	$('#container').on('click','.continueButton', function(){
		questionAnswerData.addAnswerData(gCurrentQuestionIndex, $('#answer' + gCurrentQuestionIndex).val());
		gCurrentQuestionIndex++;
		appendNextQuestion(gCurrentQuestionIndex, questionAnswerData.data[gCurrentQuestionIndex]);
		
		if(gCurrentQuestionIndex === questionAnswerData.data.length - 1){
			$('#container').off("click", ".continueButton");
			var finishButton = $('#continueButton' + gCurrentQuestionIndex);
			finishButton.attr("id", "finishButton");
			finishButton.html("Finish");
		}
	});

	function appendNextQuestion(questionIndex, questionData){
		$('#questionPanel').append("<section id=\"questionDisplay\"><div><h1 class=\"questionNumber" + 
			questionIndex + "\"></h1><div id=\"interviewForm\"><h3 id=\"questionTitle" + 
			questionIndex + "\"></h3><p id=\"questionDescription" + questionIndex + 
			"\"></p><textarea id=\"answer" + questionIndex + 
			"\"></textarea><div class=\"buttonContainer\"><button name=\"continueButton\" class=\"continueButton\" id=\"continueButton" + 
			questionIndex + "\">Continue</button></div></div></div></section><div class=\"space\"></div>");
	
		$('.questionNumber' + questionIndex).html("Question " + (questionIndex + 1));
		$('#questionTitle' + questionIndex).html(questionData.question);
		$('#questionDescription' + questionIndex).html(questionData.description);
		
		//Scrolls the web page to the next question.
		$('body, html').animate({ scrollTop: $(".questionNumber" + questionIndex).offset().top }, 1000);
		
		//Prevent users from scrolling to the previous question.
		$('body').css("overflow", "hidden");
	}
});