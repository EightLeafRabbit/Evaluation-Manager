$(document).ready(function(){
	$("a.mobile").click(function(){
		$(".sidebar").slideToggle('fast');
	});
	
	window.onresize = function(event){
		if($(window).width() > 320) {
			$(".sidebar").show();
		}
	};
	
	
	$('#passwordChangeSubmit').click(function(){
		//we get the values of the password fields
		var oldPasswordValue = $('#oldPassword').val();
		var newPasswordValue = $('#newPassword').val();

		//we create the object with the values to pass on to the database
		
		var myData = {
			'oldPassword': oldPasswordValue,
			'newPassword': newPasswordValue
		};
		
		//we make the ajax request
		$.ajax({
			data : myData,
			type: "POST",
			url : 'updatePassword.php',
			dataType : "text",
			success:function(result){
				if(result == 'success'){
					$('#passwordChangeResult').html("Password updated successfully!");
					$('#oldPassword').val("");
					$('#newPassword').val("");
				}else if(result == 'failure'){
					$('#oldPassword').val("");
					$('#newPassword').val("");
					$('#passwordChangeResult').html("Password update failed.");
				}
			}
		});
			
			return false;
	});
	
	$('#emailButton').click(function(){
		//we get the values of the email field
		var emailUpdate = $('#email').val();

		//we create the object with the values to pass on to the database
		
		var myData = {
			'email': emailUpdate
		};
		
		//we make the ajax request
		$.ajax({
			data : myData,
			type: "POST",
			url : 'updateEmail.php',
			dataType : "text",
			success:function(result){
				if(result == 'success'){
					$('#emailUpdateResult').html("Email updated successfully!");
					$('#email').val("");
				}else if(result == 'failure'){
					$('#email').val("");
					$('#emailUpdateResult').html("Email update failed.");
				}
			}
		});
			
			return false;
	});
	
	/*Questions Page*/
	
	$('#newQuestionButton').click(function(){
		$('#newQuestionBox').css('display','block');
		$('#newQuestionBoxPanel').css('display', 'block');
	});
	
	$('#cancelNewQuestion').click(function(){
		$('#newQuestionBox').css('display','none');
		$('#newQuestionBoxPanel').css('display', 'none');
		$('#questionCreationResult').html("");
		$('#newQuestion').val("");
		$('#newQuestionDescription').val("");
	});
	
	$('#saveNewQuestion').click(function(){
		//we get the values of the password fields
		var newQuestion = $('#newQuestion').val();
		var newQuestionDescription = $('#newQuestionDescription').val();
		
		if(newQuestion === '' || newQuestionDescription === ''){
			$('#questionCreationResult').html("Fill out the required information.");
		}
		else {
			
			//we create the object with the values to pass on to the database
			var questionCreation = {
				'newQuestion': newQuestion,
				'newQuestionDescription' : newQuestionDescription
			};
			
			//we make the ajax request
			$.ajax({
				data : questionCreation,
				type: "POST",
				url : 'processQuestions.php',
				dataType : "text",
				success:function(result){
					if(result !== 'failure'){
						$('#questionList').html(result);
						$('#questionCreationResult').html("Question added successfully.");
						$('#newQuestion').val("");
						$('#newQuestionDescription').val("");
						$('#newQuestionBox').css('display','none');
						$('#newQuestionBoxPanel').css('display', 'none');
					}else{
						$('#newQuestion').val("");
						$('#newQuestionDescription').val("");
						$('#questionCreationResult').html("Question creation failed.");
					}
				}
			});
			
			return false;
		}
	});
	
	
	$(function(){
		$('#questionList').on('click', '.iconAction', function(){
			var actionType = $(this).attr('title');
			var rowID = $(this).attr('id');
			
			if(actionType === 'Edit'){
				$('tr.editContainer[id="'+rowID+'"]').removeClass('editContainerDisplay');
			}
			else if(actionType === 'Remove'){
				$.ajax({
				data : {'rowID' : rowID},
				type: "POST",
				url : 'deleteQuestion.php',
				dataType : "text",
				success:function(result){
					if(result !== 'failure'){
						$('tr[id="'+rowID+'"]').remove();
						$('#questionList').html(result);
					}else{
						alert("We did not receive a response from the database.");
					}
				}
			});
			}
		});
	});
	
	$(function(){
		$('#questionList').on('click','.cancelEditQuestion',function(){
			var rowID = $(this).attr('data-rowID');
			$('#editQuestion').val("");
			$('#editQuestionDescription').val("");
			$('tr.editContainer[id="'+rowID+'"]').addClass('editContainerDisplay');
		});
	});
	
	$(function(){
		$('#questionList').on('click','.saveEditQuestion',function(){
			var rowID = $(this).attr('data-rowID');

			//we get the values of the password fields
			var editQuestion = $('#editQuestion[data-rowID="'+rowID+'"]').val();
			var editQuestionDescription = $('#editQuestionDescription[data-rowID="'+rowID+'"]').val();
			
			if(editQuestion === '' || editQuestionDescription === ''){
				$('.questionEditResult[data-rowID="'+rowID+'"]').html("Fill out the required information.");
			}
			else {
				
				//we create the object with the values to pass on to the database
				var questionUpdate = {
					'rowID' : rowID,
					'editQuestion': editQuestion,
					'editQuestionDescription' : editQuestionDescription
				};
				//we make the ajax request
				$.ajax({
					data : questionUpdate,
					type: "POST",
					url : 'editQuestions.php',
					dataType : "text",
					success:function(result){
						if(result !== 'failure'){
							$('#questionList').html(result);
						}else{
							alert("We did not receive a response from the database.");
						}
					}
				});
				
				return false;
			}
		});
	});
	
	/*Test Page*/
	$(function(){
		$('#testList').on('click', '.iconAction', function(){
			var actionType = $(this).attr('title');
			var rowID = $(this).attr('id');
			
			if(actionType === 'Remove'){
				$.ajax({
				data : {'rowID' : rowID},
				type: "POST",
				url : 'deleteTest.php',
				dataType : "text",
				success:function(result){
					if(result !== 'failure'){
						$('tr[id="'+rowID+'"]').remove();
						$('#testList').html(result);
					}else{
						alert("We did not receive a response from the database.");
					}
				}
			});
			}
		});
	});
	
});