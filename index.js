'use strict';

let currentQuestion=0;
let totalPoints=0;

const questionBank= [
	{
		question: "How much time do you spend exercising everyday?",
		options: ["None",
				  "Less than 15 minutes",
				  "30 minutes",
				  "An hour or more"]
	},

	{
		question: "How big is your yard?",
		options: ["I don't have a yard",
				  "Small yard",
				  "Medium yard",
				  "Large yard"]

	},

	{
		question: "How energetic of a dog do you prefer to have?",
		options: ["Couch Potato",
				  "Walker",
				  "Jogger",
				  "Sprinter/Hiker"]
	},

	{
		question: "How much time will you dedicate to playing with your dog?",
		options: ["None",
				  "15 minutes a day",
				  "30 minutes a day",
				  "An hour or more"]
	},	

	{
		question: "How social would you like your future furry friend to be?",
		options: ["Not social at all",
				  "Friendly with only you",
				  "Friendly with you and loved ones",
				  "Friendly with everyone"]
	},	

	{
		question: "How much barking can you tolerate from your future best friend?",
		options: ["No barking whatsoever",
				  "Rarely barks",
				  "Barks at strangers only",
				  "Barks on a daily basis"]
	},

	{
		question: "How much do you enjoy joking with others?",
		options: ["I never make any jokes",
				  "I joke occasionally",
				  "I joke most of the time",
				  "I'm always joking with people"],
	},

];

function displayQuestion(){
	console.log('displayQuestion ran')
	$(".js-quiz-section").html(generateQuestion());
}


function generateQuestion(){
	console.log('generateQuestion ran');

	return `<div class="js-question-form">
			<form>
			<fieldset>
				<legend> Question: ${questionBank[currentQuestion].question}
				</legend>
				<label class="radio-button">
					<input type="radio" name="answer-option" value="0" required>
					<span>${questionBank[currentQuestion].options[0]}</span>				
				</label>

				<label class="radio-button">
					<input type="radio" name="answer-option" value="1" required>
					<span>${questionBank[currentQuestion].options[1]}</span>					
				</label>

				<label class="radio-button">
					<input type="radio" name="answer-option" value="2" required>	
					<span>${questionBank[currentQuestion].options[2]}</span>				
				</label>

				<label class="radio-button">
					<input type="radio" name="answer-option" value="3" required>	
					<span>${questionBank[currentQuestion].options[3]}</span>				
				</label>

				<input type="submit" value="Submit Answer">

			</fieldset>
			</form>
	</div>`;
}


function handleAnswers(){
	$('form').on('submit',function(event){
		event.preventDefault();
		console.log('handleAnswers ran');
		var selectedAnswer = $('input:checked').val();
		console.log(selectedAnswer);
		totalPoints += parseInt(selectedAnswer);
		console.log("Total Points =" + totalPoints);
		currentQuestion ++;
		console.log("Current Question =" + currentQuestion);
		nextQuestion();
	})
}

function nextQuestion(){
	console.log('nextQuestion ran')

	if (currentQuestion < 7){
		displayQuestion();
		handleAnswers();
	}
	else{
		renderBreedMatches();
		/*Create Score Table and assign to breeds*/
		/*Show 5 Breed matches*/
	}
}

function renderBreedMatches(){

}


function takeQuiz(){
	$(".start-button").on('click', function (event){
		console.log('takeQuiz ran');
	/*Find way to add Smooth Scroll effect here*/

	})
}


function startApp(){
	console.log('startApp ran');
	takeQuiz();
	displayQuestion();
	handleAnswers();
}


$(startApp());