'use strict';

let currentQuestion=0;
let totalPoints=0;

let WIKIPEDIA_SEARCH_URL= 'https://en.wikipedia.org//w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&exintro=1&titles='
let WIKIPEDIA_REFERENCE_URL="https://en.wikipedia.org/wiki/"
const PETFINDER_SEARCH_URL = '';

let wikiBreedName= [];
let wikiBreedInfo= [];
let wikiBreedImage=[];


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


const dogBreedMatch= [
	//totalPoints= 0
  {
		breeds: ["Chow Chow",
				 "Chinese Shar-Pei",
				 "Chinese Crested",
				 "Pekingese",
				 "Basset Hound",
				 "Japanese Chin",
				 "Sussex Spaniel",
				 "Borzoi",
				 "Chihuahua",
				 "Pomeranian"]	
    
  },
	//totalPoints= 1
	{
		breeds: ["Chow Chow",
				 "Chinese Shar-Pei",
				 "Chinese Crested",
				 "Pekingese",
				 "Basset Hound",
				 "Japanese Chin",
				 "Sussex Spaniel",
				 "Borzoi",
				 "Chihuahua",
				 "Pomeranian"]
	},
	//totalPoints= 2
	{
		breeds: ["Pomeranian",
				 "Shih Tzu",
				 "Caucasian Sheperd Dog",
				 "Clumber Spaniel",
				 "Saint Bernard",
				 "Neapolitan Mastiff",
				 "Newfoundland",
				 "Maltese Shih Tzu",
				 "Puggle",
				 "Komondor"],
	},
	//totalPoints= 3
	{
		breeds: ["Dandie Dinmont Terrier",
				 "English Toy Spaniel",
				 "Maltese",
				 "Maltipoo",
				 "Bulldog",
				 "Collie",
				 "Peekapoo",
				 "Anatolian Sheperd Dog",
				 "Mutt",
				 "Xoloitzcuintli"],
	},
	//totalPoints= 4
	{
		breeds: ["Shiba Inu",
				 "Irish Wolfhound",
				 "Azawakh",
				 "Dogue de Bordeaux",
				 "Tibetan Mastiff",
				 "Cesky Terrier",
				 "Coton de Tulear",
				 "Havanese",
				 "Cardigan Welsh Corgi",
				 "Chinook"],
	},
	//totalPoints= 5
	{
		breeds: ["Dachshund",
				 "Cocker Spaniel",
				 "Pomsky",
				 "Pharaoh Hound",
				 "Bolognese",
				 "Basenji",
				 "French Bulldog",
				 "Bullmastiff",
				 "Cockapoo",
				 "Doberman Pinscher"],
	},
	//totalPoints= 6
	{
		breeds: ["Skye Terrier",
				 "Affenpinscher",
				 "Bernese Mountain Dog",
				 "Canaan Dog",
				 "Cavalier King Charles Spaniel",
				 "Mastiff",
				 "Tibetan Spaniel",
				 "Alaskan Klee Kai",
				 "Italian Greyhound",
				 "Sealyham Terrier"],
	},
	//totalPoints= 7
	{
		breeds: ["Shetland Sheepdog",
				 "Cane Corso",
				 "Catahoula Leopard Dog",
				 "Pug",
				 "American Staffordshire Terrier",
				 "Bernedoodle",
				 "Keeshond",
				 "Lhasa Apso",
				 "Lancashire Heeler",
				 "Silky Terrier"],
	},
	//totalPoints= 8
	{
		breeds: ["Barbet",
				 "Yorkipoo",
				 "Staffordshire Bull Terrier",
				 "Boerboel",
				 "Bedlington Terrier",
				 "Dutch Sheperd",
				 "Old English Sheepdog",
				 "Pembroke Welsh Corgi",
				 "Polish Lowland Sheepdog",
				 "Schnoodle"],
	},
	//totalPoints= 9
	{
		breeds: ["Dogo Argentino",
				 "Afghan Hound",
				 "Bichon Frise",
				 "Stabyhoun",
				 "Akita",
				 "Lowchen",
				 "Miniature Pinscher",
				 "Poodle",
				 "Soft Coated Wheaten Terrier",
				 "American Bulldog"],
	},
	//totalPoints= 10
	{
		breeds: ["Briard",
				 "Leonberger",
				 "Manchester Terrier",
				 "Pocket Beagle",
				 "Scottish Terrier",
				 "West Highland White Terrier",
				 "English Setter",
				 "Black Mouth Cur",
				 "Bracco Italiano",
				 "Plott"],
	},
	//totalPoints= 11
	{
		breeds: ["Treeing Tennessee Brindle",
				 "Treeing Walker Coonhound",
				 "Sloughi",
				 "Greater Swiss Mountain Dog",
				 "Bearded Collie",
				 "Norfolk Terrier",
				 "Rottweiler",
				 "Bouvier des Flandres",
				 "Glen of Imaal Terrier",
				 "Icelandic Sheepdog"],
	},
	//totalPoints= 12
	{
		breeds: ["American Eskimo Dog",
				 "Belgian Tervuren",
				 "Brussels Griffon",
				 "Curly-Coated Retriever",
				 "English Cocker Spaniel",
				 "Wirehaired Pointing Griffon",
				 "Lakeland Terrier",
				 "Goldendoodle",
				 "Papillon",
				 "Appenzeller Sennenhunde"],
	},
	//totalPoints= 13
	{
		breeds: ["Korean Jindo Dog",
				 "Kerry Blue Terrier",
				 "Kuvasz",
				 "American Water Spaniel",
				 "Giant Schnauzer",
				 "Golden Retriever",
				 "Gordon Setter",
				 "Saluki",
				 "Samoyed",
				 "Whippet"],
	},
	//totalPoints= 14
	{
		breeds: ["Greyhound",
				 "Irish Water Spaniel",
				 "Miniature Schnauzer",
				 "Norwegian Elkhound",
				 "Bloodhound",
				 "American Pit Bull Terrier",
				 "Beagle",
				 "Black Russian Terrier",
				 "Boston Terrier",
				 "Cairn Terrier"],
	},
	//totalPoints= 15
	{
		breeds: ["Irish Terrier",
				 "Norwich Terrier",
				 "Rat Terrier",
				 "Yorkshire Terrier",
				 "Border Terrier",
				 "Norwegian Buhund",
				 "Norwegian Lundehund",
				 "Redbone Coonhound",
				 "Rhodesian Ridgeback",
				 "Kooikerhondje"],
	},
	//totalPoints= 16
	{
		breeds: ["Small Munsterlander Pointer",
				 "Airedale Terrier",
				 "Belgian Sheepdog",
				 "Berger Picard",
				 "Border Collie",
				 "Brittany",
				 "English Springer Spaniel",
				 "Field Spaniel",
				 "German Pinscher",
				 "German Shorthaired Pointer"],
	},
	//totalPoints= 17
	{
		breeds: ["Ibizan Hound",
				 "Irish Setter",
				 "Nova Scotia Duck Trolling Retriever",
				 "Portuguese Water Dog",
				 "Schipperke",
				 "Siberian Husky",
				 "Standard Schnauzer",
				 "Swedish Vallhund",
				 "Dalmatian",
				 "Welsh Springer Spaniel"],
	},
	//totalPoints= 18
	{
		breeds: ["Australian Terrier",
				 "Finnish Lapphund",
				 "Bull Terrier",
				 "Pyrenean Sheperd",
				 "American Foxhound",
				 "Australian Sheperd",
				 "Belgian Malinois",
				 "Bluetick Coonhound",
				 "English Foxhound",
				 "Entlebucher Mountain Dog"],
	},
	//totalPoints= 19
	{
		breeds: ["Finnish Spitz",
				 "Flat-Coated Retriever",
				 "German Wirehaired Pointer",
				 "Harrier",
				 "Labradoodle",
				 "Otterhound",
				 "Petit Basset Griffon Vendeen",
				 "Tibetan Terrier",
				 "Toy Fox Terrier",
				 "Vizsla"],
	},
	//totalPoints= 20
	{
		breeds: ["Boykin Spaniel",
				 "Chesapeake Bay Retriever",
				 "Great Pyrenees",
				 "Alaskan Malamute",
				 "American English Coonhound",
				 "Australian Cattle Dog",
				 "Black and Tan Coonhound",
				 "Boxer",
				 "Fox Terrier",
				 "German Shepherd"],
	},
	//totalPoints= 21
	{
		breeds: ["German Shepherd",
				 "Great Dane",
				 "Irish Red and White Setter",
				 "Jack Russell Terrier",
				 "Labrador Retriever",
				 "Pointer (dog breed)",
				 "Puli",
				 "Scottish Deerhound",
				 "Weimaraner",
				 "Welsh Terrier"],
	}
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
		var selectedAnswer = $('input:checked').val();
		totalPoints += parseInt(selectedAnswer);
		currentQuestion ++;
		nextQuestion();
	})

}

function nextQuestion(){
	console.log('nextQuestion ran')

	if (currentQuestion < 7){
		displayQuestion();
		handleAnswers();
	}
	else if (currentQuestion === 7){
			//hide quiz
			$(".js-quiz-section").html("");
			//take user score, find matching breeds, and store in variable
			let userBreedMatches= dogBreedMatch[totalPoints].breeds;
			callWikiAPI(userBreedMatches);
			
	}
}

//function to call Wiki API
function callWikiAPI (userBreedMatches){

	for (let i=0; i < 10; i++){
		let dogBreed = userBreedMatches[i]
		console.log(dogBreed);
		let url = WIKIPEDIA_SEARCH_URL + dogBreed;
		$.getJSON(url, displayWiki);

	}

}


//function displayWiki(userBreedMatches){
  function displayWiki(data){

	let page = data.query.pages;
	let pageId= Object.keys(data.query.pages)[0];

	wikiBreedName.push(page[pageId].title);
	wikiBreedInfo.push(page[pageId].extract);
	wikiBreedImage.push(page[pageId].thumbnail.source);
	

$(".js-wiki-section").html(renderWiki());
}

function renderWiki(){
	return `
		<div class= "js-render-wiki">
			<div class= "dog-breeds">
				<div class= "dog-breed-1">
					<h2>${wikiBreedName[0]}</h2>
						<img src="${wikiBreedImage[0]}" class="wiki-photo" alt="${wikiBreedName[0]}">
						<p>${wikiBreedInfo[0]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[0]}">Read more on Wikipedia </a>	
				</div>
				<div class= "dog-breed-2">
					<h2>${wikiBreedName[1]}</h2>
						<img src="${wikiBreedImage[1]}" class="wiki-photo" alt="${wikiBreedName[1]}">
						<p>${wikiBreedInfo[1]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[1]}">Read more on Wikipedia </a>	
				</div>
				<div class= "dog-breed-3">
					<h2>${wikiBreedName[2]}</h2>
						<img src="${wikiBreedImage[2]}" class="wiki-photo" alt="${wikiBreedName[2]}">
						<p>${wikiBreedInfo[2]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[2]}">Read more on Wikipedia </a>	
				</div>
				<div class= "dog-breed-4">
					<h2>${wikiBreedName[3]}</h2>
						<img src="${wikiBreedImage[3]}" class="wiki-photo" alt="${wikiBreedName[3]}">
						<p>${wikiBreedInfo[3]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[3]}">Read more on Wikipedia </a>	
				</div>
				<div class= "dog-breed-5">
					<h2>${wikiBreedName[4]}</h2>
						<img src="${wikiBreedImage[4]}" class="wiki-photo" alt="${wikiBreedName[4]}">
						<p>${wikiBreedInfo[4]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[4]}">Read more on Wikipedia </a>	
				</div>
				<div class= "dog-breed-6">
					<h2>${wikiBreedName[5]}</h2>
						<img src="${wikiBreedImage[5]}" class="wiki-photo" alt="${wikiBreedName[5]}">
						<p>${wikiBreedInfo[5]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[5]}">Read more on Wikipedia </a>	
				</div>
				<div class= "dog-breed-7">
					<h2>${wikiBreedName[6]}</h2>
						<img src="${wikiBreedImage[6]}" class="wiki-photo" alt="${wikiBreedName[6]}">
						<p>${wikiBreedInfo[6]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[6]}">Read more on Wikipedia </a>	
				</div>
				<div class= "dog-breed-8">
					<h2>${wikiBreedName[7]}</h2>
						<img src="${wikiBreedImage[7]}" class="wiki-photo" alt="${wikiBreedName[7]}">
						<p>${wikiBreedInfo[7]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[7]}">Read more on Wikipedia </a>	
				</div>
				<div class= "dog-breed-9">
					<h2>${wikiBreedName[8]}</h2>
						<img src="${wikiBreedImage[8]}" class="wiki-photo" alt="${wikiBreedName[8]}">
						<p>${wikiBreedInfo[8]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[8]}">Read more on Wikipedia </a>	
				</div>
				<div class= "dog-breed-10">
					<h2>${wikiBreedName[9]}</h2>
						<img src="${wikiBreedImage[9]}" class="wiki-photo" alt="${wikiBreedName[9]}">
						<p>${wikiBreedInfo[9]}</p>
						<a href="https://en.wikipedia.org/wiki/${wikiBreedName[9]}">Read more on Wikipedia </a>	
				</div>
			</div>
		</div>
	`;
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