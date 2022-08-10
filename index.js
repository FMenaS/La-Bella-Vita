'use strict';

//Quiz variables
let currentQuestion=0;
let totalPoints=0;

let WIKIPEDIA_SEARCH_URL= 'https://en.wikipedia.org/w//api.php?action=query&format=json&origin=*&prop=extracts%7Cpageimages%7Cimages&exintro=1&piprop=original&titles='
let WIKIPEDIA_REFERENCE_URL="https://en.wikipedia.org/wiki/"
let PETFINDER_SEARCH_URL = ' curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJyNlI3Sk5rMXZJT0tRREl0Tk5lNlAwa3lHcnVxUjN1ZkZnN1ZJMHFQOWRhT29yYkdZMCIsImp0aSI6ImYyZWY5N2FlMmQ1ZTg3YWRlZTQwNmI4NDJhOWQ1NTYxYzc4Yjk4N2U1YWY1N2M3NWJmYjRlMjdjMDM2YjQ5NDBlZDg5ZjViN2U4ODIzMjIxIiwiaWF0IjoxNjYwMTY3NTIyLCJuYmYiOjE2NjAxNjc1MjIsImV4cCI6MTY2MDE3MTEyMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.zbsRPr3L76WZRsZCA7vOA2zNtvxDmm74ymvv9a5tCOJLyVqFrj4BEmIWT1JR_XxYIBRg_DPY03ZSESGmPupBNe1DzFodPg167UuI0rwKUUD-A4ElCIFs2GFBLP1pTXr3TPQcrzcMB4yccbrxtDjw-UsoTwdnzAYhgbN2bwWEjSYhUwdSCrQx4ox6HaaDvreKO9XELQfYn_tkvcaMyW1ER-bUFMkCxmBktbVISQ_3sxSjbHsVrV2dF9EW6DKLm16YClNsKXgNirHC3T9RBseydPlv6oSE8NbZo-J4SOXxjUaLfi2cm7tMrh1z-CZiasru9sXA8Hkxc9Hvb_7lMdop3Q" GET  https://api.petfinder.com/v2/animal=dog&count=5&pages=10&location=Los+Angeles+CA&output=full&format=json&breed=';

//URL using depecrated version 1 of Petfinder API
//let PETFINDER_SEARCH_URL = 'http://api.petfinder.com/pet.find?key=4ac3fe4007cf229375a357a8aeed3957&callback=?&animal=dog&count=5&pages=10&location=Los+Angeles+CA&output=full&format=json&breed=';

let sortBreedMatches=[];

//global variables to store Wikipedia API data
let wikiBreedName= [];
let wikiBreedInfo= [];
let wikiBreedImage=[];

//Store PetFinder breed name translations
let petFinderBreedName= [];

let selectedBreed="";

//global variables to store PetFinder API characteristics
let petName= [];
let petAge= [];
let petSex= [];
let petSize= [];
let petDescription= [];
let petPhoto= []; 

const questionBank= [
	{
		question: "How much time do you spend exercising everyday?",
		options: ["I don't exercise",
				  "30 minutes",
				  "1 Hour",
				  "More than 1 Hour"]
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
		options: ["10 minutes a day",
				  "30 minutes a day",
				  "1 Hour",
				  "More than 1 Hour"]
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
		breeds: [
				{
					wiki: "Chow Chow",
					petFinder: "Chow Chow"
				},
				{
					wiki: "Shar Pei",
					petFinder: "Shar Pei"
				},	
				{
					wiki: "Chinese Crested Dog",
					petFinder: "Chinese Crested Dog"
				},
				{
					wiki: "Pekingese",
					petFinder: "Pekingese"
				},
				{
					wiki: "Basset Hound",
					petFinder: "Basset Hound"
				},
				{
					wiki: "Japanese Chin",
					petFinder: "Japanese Chin"
				},
				{
					wiki: "Sussex Spaniel",
					petFinder: "Sussex Spaniel"
				},
				{
					wiki: "Borzoi",
					petFinder: "Borzoi"
				}, 
				{
					wiki: "Chihuahua (dog)",
					petFinder: "Chihuahua"
				}, 
				{
					wiki: "Pomeranian (dog)",
					petFinder: "Pomeranian"
				}
				],	
    
	},
	//totalPoints= 1
	{
		breeds: [
				{
					wiki: "Chow Chow",
					petFinder: "Chow Chow"
				},
				{
					wiki: "Shar Pei",
					petFinder: "Shar Pei"
				},	
				{
					wiki: "Chinese Crested Dog",
					petFinder: "Chinese Crested Dog"
				},
				{
					wiki: "Pekingese",
					petFinder: "Pekingese"
				},
				{
					wiki: "Basset Hound",
					petFinder: "Basset Hound"
				},
				{
					wiki: "Japanese Chin",
					petFinder: "Japanese Chin"
				},
				{
					wiki: "Sussex Spaniel",
					petFinder: "Sussex Spaniel"
				},
				{
					wiki: "Borzoi",
					petFinder: "Borzoi"
				}, 
				{
					wiki: "Chihuahua (dog)",
					petFinder: "Chihuahua"
				}, 
				{
					wiki: "Pomeranian (dog)",
					petFinder: "Pomeranian"
				}
				],
	},
	//totalPoints= 2
	{
		breeds: [
				{
					wiki: "Pomeranian (dog)",
					petFinder: "Pomeranian"
				},
				{
					wiki: "Shih Tzu", 
					petFinder: "Shih Tzu"
				},
				{
					wiki: "Caucasian Shepherd Dog",
					petFinder: "Caucasian Sheepdog / Caucasian Ovtcharka" 
				},
				{
					wiki: "Clumber Spaniel",
					petFinder: "Clumber Spaniel" 
				},
				{
					wiki: "St. Bernard (dog)",
					petFinder: "Saint Bernard / St. Bernard"
				},
				{
					wiki: "Neapolitan Mastiff",
					petFinder: "Neapolitan Mastiff" 
				},
				{
					wiki: "Newfoundland dog",
					petFinder: "Newfoundland Dog" 
				},
				{
					wiki: "Maltese dog",
					petFinder: "Maltese"
				},
				{
					wiki: "Komondor",
					petFinder: "Komondor"
				},
				{
					wiki: "Dandie Dinmont Terrier",
					petFinder: "Dandi Dinmont Terrier"
				} 
				],
	},
	//totalPoints= 3
	{
		breeds: [
				{
					wiki: "Dandie Dinmont Terrier",
					petFinder: "Dandi Dinmont Terrier"
				},
				{
					wiki:"King Charles Spaniel",
					petFinder: "English Toy Spaniel" 
				}, 
				{
					wiki: "Maltese dog",
					petFinder: "Maltese"
				},
				{
					wiki: "Bulldog",
					petFinder: "English Bulldog"
				},
				{
					wiki: "Collie",
					petFinder: "Collie" 
				},
				{
					wiki: "Anatolian Shepherd",
					petFinder: "Anatolian Shepherd" 
				},
				{
					wiki: "Mexican Hairless Dog",
					petFinder: "Xoloitzcuintle / Mexican Hairless"
				},
				{
					wiki: "Shiba Inu",
					petFinder: "Shiba Inu" 
				},
				{
					wiki: "Irish Wolfhound",
					petFinder: "Irish Wolfhound" 
				},
				{
					wiki: "Dogue de Bordeaux",
					petFinder: "Dogue de Bordeaux" 
				}
				],
	},
	//totalPoints= 4
	{
		breeds: [
				{
					wiki: "Shiba Inu",
					petFinder: "Shiba Inu" 
				},
				{
					wiki: "Irish Wolfhound",
					petFinder: "Irish Wolfhound" 
				},
				{
					wiki: "Dogue de Bordeaux",
					petFinder: "Dogue de Bordeaux" 
				},
				{
					wiki: "Tibetan Mastiff",
					petFinder: "Tibetan Mastiff" 
				},
				{
					wiki: "Coton de Tulear",
					petFinder: "Coton de Tulear"
				},
				{
					wiki: "Havanese dog",
					petFinder: "Havanese"
				}, 
				{
					wiki: "Cardigan Welsh Corgi",
					petFinder: "Corgi"
				},
				{
					wiki: "Chinook (dog)",
					petFinder: "Chinook"
				},
				{
					wiki: "Dachshund",
					petFinder: "Dachshund"
				},
				{
					wiki: "Cocker Spaniel",
					petFinder: "Cocker Spaniel"
				}
				],
	},
	//totalPoints= 5
	{
		breeds: [
				{
					wiki: "Dachshund",
					petFinder: "Dachshund"
				},
				{
					wiki: "Cocker Spaniel",
					petFinder: "Cocker Spaniel"
				},
				{
					wiki: "Pharaoh Hound",
					petFinder: "Pharaoh Hound"
				},
				{
					wiki: "Bolognese dog",
					petFinder: "Bolognese"
				}, 
				{
					wiki: "Basenji",
					petFinder: "Basenji" 
				},
				{
					wiki: "French Bulldog",
					petFinder: "French Bulldog"
				},
				{
					wiki: "Bullmastiff",
					petFinder: "Bullmastiff" 
				},
				{
					wiki: "Cockapoo",
					petFinder: "Cockapoo"
				},
				{
					wiki: "Dobermann",
					petFinder: "Doberman Pinscher"
				},
				{
					wiki: "Skye Terrier",
					petFinder: "Skye Terrier" 
				} 
				],
	},
	//totalPoints= 6
	{
		breeds: [
				{
					wiki: "Skye Terrier",
					petFinder: "Skye Terrier" 
				}, 
				{
					wiki: "Affenpinscher",
					petFinder: "Affenpinscher"
				},
				{
					wiki: "Bernese Mountain Dog",
					petFinder: "Bernese Mountain Dog"
				},
				{
					wiki: "Canaan Dog",
					petFinder: "Canaan Dog"
				},
				{
					wiki: "Cavalier King Charles Spaniel",
					petFinder: "Cavalier King Charles Spaniel"
				},
				{
					wiki: "Mastiff",
					petFinder: "Mastiff"
				},
				{
					wiki: "Tibetan Spaniel",
					petFinder: "Tibetan Spaniel"
				},
				{
					wiki: "Alaskan Klee Kai",
					petFinder: "Klee Kai"
				},
				{
					wiki: "Italian Greyhound",
					petFinder: "Italian Greyhound"
				}, 
				{
					wiki: "Sealyham Terrier",
					petFinder: "Sealyham Terrier"
				} 
				],
	},
	//totalPoints= 7
	{
		breeds: [
				{
					wiki: "Shetland Sheepdog",
					petFinder: "Shetland Sheepdog Sheltie" 
				},
				{
					wiki: "Cane Corso",
					petFinder: "Cane Corso Mastiff"
				},
				{
					wiki: "Catahoula Cur",
					petFinder: "Catahoula Leopard Dog"
				},
				{
					wiki: "Pug",
					petFinder: "Pug"
				},
				{
					wiki: "American Staffordshire Terrier",
					petFinder: "American Staffordshire Terrier"
				},
				{
					wiki: "Keeshond",
					petFinder: "Keeshond"
				},				 
				{
					wiki: "Lhasa Apso",
					petFinder: "Lhasa Apso"
				},
				{
					wiki: "Lancashire Heeler",
					petFinder: "Lancashire Heeler"
				},
				{
					wiki: "Australian Silky Terrier",
					petFinder: "Silky Terrier"  
				},
				{
					wiki: "Staffordshire Bull Terrier",
					petFinder: "Staffordshire Bull Terrier" 
				}
				],
	},
	//totalPoints= 8
	{
		breeds: [
				{
					wiki: "Staffordshire Bull Terrier",
					petFinder: "Staffordshire Bull Terrier" 
				},
				{
					wiki: "Boerboel",
					petFinder: "Boerboel"
				}, 
				{
					wiki: "Bedlington Terrier",
					petFinder: "Bedlington Terrier"
				},
				{
					wiki: "Dutch Shepherd",
					petFinder: "Dutch Shepherd"
				},
				{
					wiki: "Old English Sheepdog",
					petFinder: "Old English Sheepdog"  
				},
				{
					wiki: "Pembroke Welsh Corgi",
					petFinder: "Corgi"
				},
				{
					wiki: "Polish Lowland Sheepdog",
					petFinder: "Polish Lowland Sheepdog"
				},
				{
					wiki: "Dogo Argentino",
					petFinder: "Dogo Argentino"
				},
				{
					wiki: "Afghan Hound",
					petFinder: "Afghan Hound"
				},
				{
					wiki: "Bichon Frise",
					petFinder: "Bichon Frise" 
				}
				],
	},
	//totalPoints= 9
	{
		breeds: [
				{
					wiki: "Dogo Argentino",
					petFinder: "Dogo Argentino"
				},
				{
					wiki: "Afghan Hound",
					petFinder: "Afghan Hound"
				},
				{
					wiki: "Bichon Frise",
					petFinder: "Bichon Frise" 
				},
				{
					wiki: "Akita (dog)",
					petFinder: "Akita"
				},
				{
					wiki: "Löwchen",
					petFinder: "Lowchen" 
				}, 
				{
					wiki: "Miniature Pinscher",
					petFinder: "Miniature Pinscher"
				},
				{
					wiki: "Poodle",
					petFinder: "Poodle"
				},
				{
					wiki: "Soft-coated Wheaten Terrier",
					petFinder: "Wheaten Terrier" 
				},
				{
					wiki: "American Bulldog",
					petFinder: "American Bulldog" 
				},
				{
					wiki:"Briard",
					petFinder: "Briard"
				}
				],
	},
	//totalPoints= 10
	{
		breeds: [
				{
					wiki:"Briard",
					petFinder: "Briard"
				},
				{
					wiki: "Leonberger",
					petFinder: "Leonberger"
				},
				{
					wiki: "Manchester Terrier",
					petFinder: "Manchester Terrier" 
				},
				{
					wiki: "Scottish Terrier",
					petFinder: "Scottish Terrier Scottie"
				},
				{
					wiki: "West Highland White Terrier",
					petFinder: "West Highland White Terrier Westie"
				},
				{
					wiki: "English Setter",
					petFinder: "English Setter"
				},
				{
					wiki: "Black Mouth Cur",
					petFinder: "Black Mouth Cur" 
				},
				{
					wiki: "Spinone Italiano",
					petFinder: "Italian Spinone"  
				},
				{
					wiki: "Plott Hound",
					petFinder: "Plott Hound"
				},
				{
					wiki: "Treeing Walker Coonhound",
					petFinder: "Treeing Walker Coonhound"
				}
				],
	},
	//totalPoints= 11
	{
		breeds: [
				{
					wiki: "Treeing Walker Coonhound",
					petFinder: "Treeing Walker Coonhound"
				}, 
				{
					wiki: "Sloughi",
					petFinder: "Sloughi" 
				},
				{
					wiki: "Greater Swiss Mountain Dog",
					petFinder: "Greater Swiss Mountain Dog"
 				},
 				{
 					wiki: "Bearded Collie",
 					petFinder: "Bearded Collie"
 				},
 				{
 					wiki: "Norfolk Terrier",
 					petFinder: "Norfolk Terrier"
 				},
 				{
 					wiki: "Rottweiler",
 					petFinder: "Rottweiler"
 				},
 				{
 					wiki: "Bouvier des Flandres",
 					petFinder: "Bouvier des Flanders"
 				},
 				{
 					wiki:"Glen of Imaal Terrier",
 					petFinder: "Glen of Imaal Terrier"
 				},
 				{
 					wiki: "Icelandic Sheepdog",
 					petFinder: "Icelandic Sheepdog"
 				},
				{
					wiki: "American Eskimo Dog",
					petFinder: "American Eskimo Dog"
				} 
				],
	},
	//totalPoints= 12
	{
		breeds: [
				{
					wiki: "American Eskimo Dog",
					petFinder: "American Eskimo Dog"
				},
				{
					wiki: "Tervuren dog",
					petFinder: "Belgian Shepherd / Tervuren"
				},
				{
					wiki: "Griffon Bruxellois",
					petFinder: "Brussels Griffon"  
				}, 
				{
					wiki: "Curly-Coated Retriever",
					petFinder: "Curly-Coated Retriever" 
				},
				{
					wiki: "English Cocker Spaniel",
					petFinder: "English Cocker Spaniel"
				},
				{
					wiki: "Wirehaired Pointing Griffon",
					petFinder: "Wirehaired Pointing Griffon"
				},
				{
					wiki: "Lakeland Terrier",
					petFinder: "Lakeland Terrier"
				},
				{
					wiki: "Papillon dog",
					petFinder: "Papillon"
				},
				{
					wiki: "Appenzeller Sennenhund",
					petFinder: "Appenzell Mountain Dog"
				},				 
				{
					wiki: "Korean Jindo",
					petFinder: "Jindo" 
				}
				],
	},
	//totalPoints= 13
	{
		breeds: [
				{
					wiki: "Korean Jindo",
					petFinder: "Jindo" 
				},
				{
					wiki: "Kerry Blue Terrier",
					petFinder: "Kerry Blue Terrier"
				},
				{
					wiki: "Kuvasz",
					petFinder: "Kuvasz"
				},
				{
					wiki: "American Water Spaniel",
					petFinder: "American Water Spaniel" 
				},
				{
					wiki: "Giant Schnauzer",
					petFinder: "Giant Schnauzer"
				},
				{
					wiki: "Golden Retriever",
					petFinder: "Golden Retriever" 
				},
				{
					wiki: "Gordon Setter",
					petFinder: "Gordon Setter"
				},
				{
					wiki: "Saluki",
					petFinder: "Saluki"
				},
				{
					wiki: "Samoyed dog",
					petFinder: "Samoyed"  
				},
				{
					wiki: "Whippet",
					petFinder: "Whippet"
				} 
				],
	},
	//totalPoints= 14
	{
		breeds: [
				{
					wiki: "Greyhound",
					petFinder: "Greyhound"
				},
				{
					wiki: "Irish Water Spaniel",
					petFinder: "Irish Water Spaniel"
				},
				{
					wiki: "Miniature Schnauzer",
					petFinder: "Miniature Schnauzer" 
				},
				{
					wiki: "Norwegian Elkhound",
					petFinder: "Norwegian Elkhound" 
				}, 
				{
					wiki: "Bloodhound",
					petFinder: "Bloodhound" 
				}, 
				{
					wiki: "American Pit Bull Terrier",
					petFinder: "Pit Bull Terrier"
				}, 
				{
					wiki: "Beagle",
					petFinder: "Beagle" 
				},
				{
					wiki: "Black Russian Terrier",
					petFinder: "Black Russian Terrier" 
				}, 
				{
					wiki: "Boston Terrier",
					petFinder: "Boston Terrier" 
				}, 
				{
					wiki: "Cairn Terrier",
					petFinder: "Cairn Terrier" 
				} 
				],
	},
	//totalPoints= 15
	{
		breeds: [
				{
					wiki: "Irish Terrier",
					petFinder: "Irish Terrier" 
				},	
				{
					wiki: "Norwich Terrier",
					petFinder: "Norwich Terrier" 
				},
				{
					wiki: "Rat Terrier",
					petFinder: "Rat Terrier"  
				},
				{
					wiki: "Yorkshire Terrier",
					petFinder: "Yorkshire Terrier Yorkie" 
				},
				{
					wiki: "Border Terrier",
					petFinder: "Border Terrier" 
				}, 
				{
					wiki: "Norwegian Buhund",
					petFinder: "Norwegian Buhund" 
				}, 
				{
					wiki: "Norwegian Lundehund",
					petFinder: "Norwegian Lundehund" 
				},
				{
					wiki: "Redbone Coonhound",
					petFinder: "Redbone Coonhound"
				}, 
				{
					wiki: "Rhodesian Ridgeback",
					petFinder: "Rhodesian Ridgeback"
				}, 
				{
					wiki: "Small Münsterländer",
					petFinder: "Munsterlander"
				}
				],
	},
	//totalPoints= 16
	{
		breeds: [
				{
					wiki: "Small Münsterländer",
					petFinder: "Munsterlander"
				},
				{
					wiki: "Airedale Terrier",
					petFinder: "Airedale Terrier"
				},
				{
					wiki: "Belgian Shepherd",
					petFinder: "Belgian Shepherd / Sheepdog"
				},
				{
					wiki: "Border Collie",
					petFinder: "Border Collie"
				},
				{
					wiki: "Brittany (dog)",
					petFinder: "Brittany Spaniel" 
				},
				{
					wiki: "English Springer Spaniel",
					petFinder: "English Springer Spaniel"
				},
				{
					wiki: "Field Spaniel",
					petFinder: "Field Spaniel"
				},
				{
					wiki:"German Pinscher",
					petFinder: "German Pinscher"
				},
				{
					wiki: "German Shorthaired Pointer",
					petFinder: "German Shorthaired Pointer"  
				},
				{
					wiki: "Ibizan Hound",
					petFinder: "Ibizan Hound"
				} 
				],
	},
	//totalPoints= 17
	{
		breeds: [
				{
					wiki: "Ibizan Hound",
					petFinder: "Ibizan Hound"
				},
				{
					wiki: "Irish Setter",
					petFinder: "Irish Setter" 
				}, 
				{
					wiki: "Nova Scotia Duck Tolling Retriever",
					petFinder: "Nova Scotia Duck Tolling Retriever" 
				},
				{
					wiki: "Portuguese Water Dog",
					petFinder: "Portuguese Water Dog" 
				},
				{
					wiki: "Schipperke",
					petFinder: "Schipperke" 
				},
				{
					wiki: "Siberian Husky",
					petFinder: "Siberian Husky" 
				},
				{
					wiki: "Standard Schnauzer",
					petFinder: "Standard Schnauzer" 
				},
				{
					wiki: "Swedish Vallhund",
					petFinder: "Swedish Vallhund"
				},
				{
					wiki: "Dalmatian (dog)",
					petFinder: "Dalmatian"
				},
				{	
					wiki: "Welsh Springer Spaniel",
					petFinder: "Welsh Springer Spaniel"
				}	
				],
	},
	//totalPoints= 18
	{
		breeds: [
				{
					wiki: "Australian Terrier",
					petFinder: "Australian Terrier" 
				},
				{
					wiki: "Finnish Lapphund",
					petFinder: "Finnish Lapphund" 
				},
				{
					wiki: "Bull Terrier",
					petFinder: "Bull Terrier"
				},
				{
					wiki: "American Foxhound",
					petFinder: "Foxhound"
				},
				{
					wiki: "Australian Shepherd",
					petFinder: "Australian Shepherd"
				},
				{
					wiki: "Belgian Shepherd",
					petFinder: "Belgian Shepherd / Malinois"
 				},
 				{
 					wiki: "Bluetick Coonhound",
 					petFinder: "Bluetick Coonhound"
 				},
 				{
 					wiki: "English Foxhound",
 					petFinder: "Foxhound"
 				},
				{
					wiki: "Entlebucher Mountain Dog",
					petFinder: "Entlebucher" 
				}, 
				{
					wiki: "Finnish Spitz",
					petFinder: "Finnish Spitz" 
				}
				],
	},
	//totalPoints= 19
	{
		breeds: [
				{
					wiki: "Finnish Spitz",
					petFinder: "Finnish Spitz" 
				},
				{
					wiki: "Flat-coated Retriever",
					petFinder: "Flat-Coated Retriever" 
				},
				{
					wiki: "German Wirehaired Pointer",
					petFinder: "German Wirehaired Pointer"
				}, 
				{
					wiki: "Harrier (dog)",
					petFinder: "Harrier"
				},
				{
					wiki: "Otterhound",
					petFinder: "Otterhound"
				},
				{
					wiki: "Petit Basset Griffon Vendéen",
					petFinder: "Petit Basset Griffon Vendeen"
				},
				{
					wiki: "Tibetan Terrier",
					petFinder: "Tibetan Terrier" 
				}, 
				{
					wiki: "Toy Fox Terrier",
					petFinder: "Toy Fox Terrier" 
				}, 
				{
					wiki: "Vizsla",
					petFinder: "Vizsla"
				},
				{
					wiki: "Boykin Spaniel",
					petFinder: "Boykin Spaniel"
				}  
				],
	},
	//totalPoints= 20
	{
		breeds: [
				{
					wiki: "Boykin Spaniel",
					petFinder: "Boykin Spaniel"
				}, 
				{
					wiki: "Chesapeake Bay Retriever",
					petFinder: "Chesapeake Bay Retriever"
				},				
				{
					wiki: "Great Pyrenees",
					petFinder: "Great Pyrenees"
				},
				{
					wiki: "Alaskan Malamute",
					petFinder: "Alaskan Malamute" 
				}, 
				{
					wiki: "American English Coonhound",
					petFinder: "English Coonhound"
				},
				{
					wiki: "Australian Cattle Dog",
					petFinder: "Australian Cattle Dog / Blue Heeler" 
				},
				{
					wiki: "Black and Tan Coonhound",
					petFinder: "Black and Tan Coonhound"
				},
				{
					wiki: "Boxer (dog)",
					petFinder: "Boxer" 	
				},
				{
					wiki: "Fox Terrier",
					petFinder: "Fox Terrier"
				},
				{
					wiki: "German Shepherd",
					petFinder: "German Shepherd Dog" 
				}  
				],
	},
	//totalPoints= 21
	{
		breeds: [
				{
					wiki: "German Shepherd",
					petFinder: "German Shepherd Dog"
				},
				{
					wiki: "Great Dane",
					petFinder: "Great Dane"
				},
				{
					wiki: "Irish Red and White Setter",
					petFinder: "Irish Setter"	
				},
				{
					wiki: "Jack Russell Terrier",
					petFinder: "Jack Russell Terrier"
				}, 
				{
					wiki: "Labrador Retriever",
					petFinder: "Labrador Retriever"
				},
				{
					wiki: "Pointer (dog breed)",
					petFinder:"Pointer"
				}, 
				{
					wiki: "Puli",
					petFinder: "Puli"
				}, 
				{
					wiki: "Scottish Deerhound",
					petFinder: "Scottish Deerhound"
				}, 
				{
					wiki: "Weimaraner",
					petFinder: "Weimaraner"
				},
				{
					wiki: "Welsh Terrier",
					petFinder: "Welsh Terrier"
				}
				],
	}
];


function scrollToBottom(){
	$("#start-button").click(function() {
    $('html, body').animate({
        scrollTop: $("#quiz-id").offset().top
    }, 2000);
});
}



function displayQuestion(){
	$(".js-quiz-section").html(generateQuestion());
	scrollToBottom();
}


function generateQuestion(){
	console.log('generateQuestion ran');

	return `<div class="js-question-form" id="js-question-form">
			<form>
				<fieldset id="fieldset">
					<legend id="legend"> Question: ${questionBank[currentQuestion].question}
					</legend>
					<label class="radio-button" id="radio-button">
						<input type="radio" name="answer-option" value="0" required>
						<span>${questionBank[currentQuestion].options[0]}</span>				
					</label>

					<label class="radio-button" id="radio-button">
						<input type="radio" name="answer-option" value="1" required>
						<span>${questionBank[currentQuestion].options[1]}</span>					
					</label>

					<label class="radio-button" id="radio-button">
						<input type="radio" name="answer-option" value="2" required>	
						<span>${questionBank[currentQuestion].options[2]}</span>				
					</label>

					<label class="radio-button" id="radio-button">
						<input type="radio" name="answer-option" value="3" required>	
						<span>${questionBank[currentQuestion].options[3]}</span>				
					</label>

					<input class="submit-button" id="submit-button" type="submit" value="Submit Answer">

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
			sortBreedMatches = userBreedMatches.sort();;
			callWikiAPI(sortBreedMatches);
			//position page to show breed matches
			$('html, body').animate({
        	scrollTop: $("#quiz-id").offset().top
    		}, 2000);

	}
}

//function to call Wiki API
function callWikiAPI (sortBreedMatches){

	for (let i=0; i < 10; i++){
		let dogBreed = sortBreedMatches[i].wiki;
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


	if (pageId === "976970"){
		wikiBreedImage.push("https://upload.wikimedia.org/wikipedia/commons/b/b4/Aigrette_Velikiy_%28Tsaluma_say_strazce_z_Tibetu_x_Legenda_Tibeta_vlastelin_kolets%29.jpg")
	}
	else if (pageId === "21693913"){
		wikiBreedImage.push("https://i.pinimg.com/originals/20/fd/2b/20fd2bc6c63643dd7f0926aee84b6594.jpg")
	}
	else {
		wikiBreedImage.push(page[pageId].original.source)
	}

	for (let i=0; i < 10; i++){
		if (page[pageId].title === sortBreedMatches[i].wiki){
			petFinderBreedName.push(sortBreedMatches[i].petFinder);
		}
	}
	
$(".js-wiki-section").html(renderWiki());

callPetFinderAPI(wikiBreedName);

}

function renderWiki(){
	return `
		<div class= "js-render-wiki">
			<div class="wiki-message"
				<p>Click on an image to see available adoptions in Los Angeles.</p>
				<h1>Your matches are: </h1>
			</div>
			<div class= "dog-breeds">
				<div class="pet-lookup" data-breed="${petFinderBreedName[0]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[0]}</h2>
						<img src="${wikiBreedImage[0]}" id="wiki-photo" alt="${wikiBreedName[0]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[0]}</p>
					</div>
				</div>
				<div class= "read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[0]}" target="_blank">Read more on Wikipedia </a>	
				</div>
				
				<div class="pet-lookup" data-breed="${petFinderBreedName[1]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[1]}</h2>
						<img src="${wikiBreedImage[1]}" id="wiki-photo" alt="${wikiBreedName[1]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[1]}</p>
					</div>
				</div>	
				<div class= "read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[1]}" target="_blank">Read more on Wikipedia </a>	
				</div>
				
				<div class="pet-lookup" data-breed="${petFinderBreedName[2]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[2]}</h2>
						<img src="${wikiBreedImage[2]}" id="wiki-photo" alt="${wikiBreedName[2]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[2]}</p>
					</div>
				</div>	
				<div class= "read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[2]}" target="_blank">Read more on Wikipedia </a>	
				</div>
					
				<div class="pet-lookup" data-breed="${petFinderBreedName[3]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[3]}</h2>
						<img src="${wikiBreedImage[3]}" id="wiki-photo" alt="${wikiBreedName[3]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[3]}</p>
					</div>
				</div>	
				<div class="read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[3]}" target="_blank">Read more on Wikipedia </a>	
				</div>
				
				<div class="pet-lookup" data-breed="${petFinderBreedName[4]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[4]}</h2>
						<img src="${wikiBreedImage[4]}" id="wiki-photo" alt="${wikiBreedName[4]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[4]}</p>
					</div>
				</div>	
				<div class= "read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[4]}" target="_blank">Read more on Wikipedia </a>	
				</div>
				
				<div class="pet-lookup" data-breed="${petFinderBreedName[5]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[5]}</h2>
						<img src="${wikiBreedImage[5]}" id="wiki-photo" alt="${wikiBreedName[5]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[5]}</p>
					</div>
				</div>	
				<div class= "read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[5]}" target="_blank">Read more on Wikipedia </a>	
				</div>
				
				<div class="pet-lookup" data-breed="${petFinderBreedName[6]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[6]}</h2>
						<img src="${wikiBreedImage[6]}" id="wiki-photo" alt="${wikiBreedName[6]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[6]}</p>
					</div>
				</div>	
				<div class= "read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[6]}" target="_blank">Read more on Wikipedia </a>	
				</div>
				
				<div class="pet-lookup" data-breed="${petFinderBreedName[7]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[7]}</h2>
						<img src="${wikiBreedImage[7]}" id="wiki-photo" alt="${wikiBreedName[7]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[7]}</p>
					</div>
				</div>	
				<div class= "read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[7]}" target="_blank">Read more on Wikipedia </a>	
				</div>
				
				<div class="pet-lookup" data-breed="${petFinderBreedName[8]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[8]}</h2>
						<img src="${wikiBreedImage[8]}" id="wiki-photo" alt="${wikiBreedName[8]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[8]}</p>
					</div>
				</div>	
				<div class= "read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[8]}" target="_blank">Read more on Wikipedia </a>	
				</div>
				
				<div class="pet-lookup" data-breed="${petFinderBreedName[9]}">
					<div class="inline-block breed-name-and-image">
						<h2>${wikiBreedName[9]}</h2>
						<img src="${wikiBreedImage[9]}" id="wiki-photo" alt="${wikiBreedName[9]}">
					</div>
					<div class="inline-block wiki-info">
						<p>${wikiBreedInfo[9]}</p>
					</div>
				</div>	
				<div class= "read-more-wiki">
					<a href="https://en.wikipedia.org/wiki/${wikiBreedName[9]}" target="_blank">Read more on Wikipedia </a>	
				</div>
				
			</div>
		</div>
	`;
}

//function to call Petfinder API
function callPetFinderAPI(breedNames){
	
	$('.pet-lookup').on("click", function(){
		selectedBreed = $(this).attr('data-breed');
		console.log(selectedBreed);
		let url = PETFINDER_SEARCH_URL + selectedBreed;
		$.getJSON(url, displayPetFinder);

		$(".js-render-wiki").html("");
	});
	
}

function displayPetFinder(data){
	console.log(data);

	let results = (data.petfinder.lastOffset.$t);
	let resultsAsNumber = parseInt(results);
	//what if less than 5 pets are available? HTML?
	//If pets < 5, then only render HTML one at a time? (ex. Australian Terrier)
	//Take to Start Page? Or Please select another breed?

	if (JSON.stringify(data.petfinder.pets) == "{}"){
		$(".js-adopt-section").html(renderNoPets());
		//position page to show breed matches
			$('html, body').animate({
        	scrollTop: $("#quiz-id").offset().top
    		}, 2000);
	}
	else{

		for (let i=0; i < 5; i++){
			//PET NAME
			//If no more pets available
			if (i == resultsAsNumber) {
				break;
			}
			//If only 1 pet available
			else if ((data.petfinder.lastOffset.$t) == 1){
				petName.push(data.petfinder.pets.pet.name.$t);
			}
			//If more than 1 pet available
			else if ((data.petfinder.lastOffset.$t) > 1 ){
				petName.push(data.petfinder.pets.pet[i].name.$t);
			}

			//PET AGE
			//Only 1 pet available
			if ((data.petfinder.lastOffset.$t) == 1){
				//If Age is not available
				if ((data.petfinder.pets.pet.age) == ""){
					petAge.push("Age not available.");
				}
				//If Age is available
				else{
				petAge.push(data.petfinder.pets.pet.age.$t);
				}
			}
			//More than 1 pet available
			else if  ((data.petfinder.lastOffset.$t) > 1){
				//If Age is not available
				if (JSON.stringify(data.petfinder.pets.pet[i].age) == "{}"){
					petAge.push("Age not available.");
				}
				//If Age is available
				else{
					petAge.push(data.petfinder.pets.pet[i].age.$t);
				}	
			}
	
			//PET SEX
			//Only 1 pet available
			if ((data.petfinder.lastOffset.$t) == 1){
				//If sex not available
				if ((data.petfinder.pets.pet.sex) == ""){
					petSex.push("Sex not available.");
				}
				//If Sex available
				else if ((data.petfinder.pets.pet.sex.$t) == "M"){
					petSex.push("Male");
				}
				else if ((data.petfinder.pets.pet.sex.$t) == "F"){
					petSex.push("Female");
				}
			} 
			//More than 1 pet available
			else if((data.petfinder.lastOffset.$t) > 1){
				//If sex not available
				if (JSON.stringify(data.petfinder.pets.pet[i].sex) == "{}"){
				petSex.push("Sex not available.");
				}
				//If sex is available
				else {
					if ((data.petfinder.pets.pet[i].sex.$t) == "M"){
						petSex.push("Male");
						}
					else if ((data.petfinder.pets.pet[i].sex.$t) == "F"){
						petSex.push("Female");
						}	
				}
	
			}

			//PET SIZE
			//Only 1 pet available
			if ((data.petfinder.lastOffset.$t) == 1){
				//If pet size is not available
				if ((data.petfinder.pets.pet.size) == ""){
					petSize.push("Size not available.");
				}
				//If pet size is available
				else if ((data.petfinder.pets.pet.size.$t) == "S"){
					petSize.push("Small");
				}
				else if ((data.petfinder.pets.pet.size.$t) == "M"){
					petSize.push("Medium");
				}
				else if ((data.petfinder.pets.pet.size.$t) == "L"){
					petSize.push("Large");
				}
				else if ((data.petfinder.pets.pet.size.$t) == "XL"){
					petSize.push("Extra Large");
				}
			}

			//More than 1 pet available
			else if ((data.petfinder.lastOffset.$t) > 1){
				//If Pet size not available
				if (JSON.stringify(data.petfinder.pets.pet[i].size) == "{}"){
					petSize.push("Size not available.");
				}
				//If pet size is available
				else {
					if((data.petfinder.pets.pet[i].size.$t) == "S"){
						petSize.push("Small");
					}
					else if((data.petfinder.pets.pet[i].size.$t) == "M"){
						petSize.push("Medium");
					}	
					else if((data.petfinder.pets.pet[i].size.$t) == "L"){
						petSize.push("Large");
					}
					else if((data.petfinder.pets.pet[i].size.$t) == "XL"){
						petSize.push("Extra Large");
					}
				}
			}	
			//PET DESCRIPTION
			//Only 1 pet available
			if ((data.petfinder.lastOffset.$t) == 1){
				//No description available
				if ((data.petfinder.pets.pet.description) == ""){
					petDescription.push("No description is currently available.")
				}
				//Description available
				else{
					petDescription.push(data.petfinder.pets.pet.description.$t);
				}
				
			}
			//More than 1 pet available
			else if ((data.petfinder.lastOffset.$t) > 1){
				//No pet description available
				if (JSON.stringify(data.petfinder.pets.pet[i].description) == "{}"){
					petDescription.push("No description is currently available.");
				}
				//Pet Description is available
				else {
					petDescription.push(data.petfinder.pets.pet[i].description.$t);
				}	
			}

			//PET PHOTO
			//Only 1 pet available
			if ((data.petfinder.lastOffset.$t) == 1){
				//No pet photo available
				if((data.petfinder.pets.pet.media) == ""){
					petPhoto.push("Photo not available.");
				}
				//Photo is available
				else {
					petPhoto.push(data.petfinder.pets.pet.media.photos.photo[3].$t);
				}	
			}
			//More than 1 pet available
			else if ((data.petfinder.lastOffset.$t) > 1){
				//No pet Photo Available
				if (JSON.stringify(data.petfinder.pets.pet[i].media) == "{}"){
					petPhoto.push("Photo not available.");
				}
				//Pet Photo is available
				else {
					petPhoto.push(data.petfinder.pets.pet[i].media.photos.photo[3].$t);
				}
			}	
			//console.log(petDescription);
			
		}
		//Render returned matches
		$(".js-adopt-section").html(renderPets());
		//position page to show breed matches
			$('html, body').animate({
        	scrollTop: $("#quiz-id").offset().top
    		}, 2000);
	}
}

//Render HTML for breeds that return no matches.
function renderNoPets(){
	return `
	<div class= "js-no-pets-rendered">
		<h2>We're sorry, there are currently no ${selectedBreed}s available in Los Angeles.</h2>
	</div>
	`;
}

function renderPets(){
	return `
		<div class= "js-render-pets">
			<div class="matches-message">Here are 5 available ${selectedBreed}s for you:</div>
			<div class="returned-matches">
				<div class="available-pet">
					<div class="inline-block pet-characteristics">
						<h2>${petName[0]}</h2>
						<img id="pet-photo" src="${petPhoto[0]}" onerror="this.src='https://ak-s.ostkcdn.com/img/mxc/Missing-Image_Dog.png'" alt="${petName[0]}">
						<div class="pet-size">Size: ${petSize[0]}</div>
						<div class="pet-sex">Sex: ${petSex[0]}</div>
						<div class="pet-age">Age: ${petAge[0]}</div>
					</div>	
					<div class="inline-block pet-description">
						<h3>Meet ${petName[0]}:</h3>
						<p>${petDescription[0]}</p>
					</div>
					<div class= "read-more-petfinder">
						<a href="https://www.petfinder.com/search/dogs-for-adoption/us/ca/los-angeles/?breed%5B0%5D=${selectedBreed}&name=${petName[0]}" target="_blank">Take a look at my Petfinder profile!</a>
					</div>
				</div>
				<div class="available-pet">
					<div class="inline-block pet-characteristics">
						<h2>${petName[1]}</h2>
						<img id="pet-photo" src="${petPhoto[1]}" onerror="this.src='https://ak-s.ostkcdn.com/img/mxc/Missing-Image_Dog.png'"  alt="${petName[1]}">
						<div class= "pet-size">Size: ${petSize[1]}</div>
						<div class="pet-sex">Sex: ${petSex[1]}</div>
						<div class="pet-age">Age: ${petAge[1]}</div>
					</div>
					<div class="inline-block pet-description">
						<h3>Meet ${petName[1]}:</h3>
						<p>${petDescription[1]}</p>
					</div>
					<div class= "read-more-petfinder">
						<a href="https://www.petfinder.com/search/dogs-for-adoption/us/ca/los-angeles/?breed%5B0%5D=${selectedBreed}&name=${petName[1]}" target="_blank">Take a look at my Petfinder profile!</a>
					</div>
				</div>
				<div class="available-pet">
					<div class="inline-block pet-characteristics">
						<h2>${petName[2]}</h2>
						<img id="pet-photo" src="${petPhoto[2]}" onerror="this.src='https://ak-s.ostkcdn.com/img/mxc/Missing-Image_Dog.png'" alt="${petName[2]}">
						<div class= "pet-size">Size: ${petSize[2]}</div>
						<div class="pet-sex">Sex: ${petSex[2]}</div>
						<div class="pet-age">Age: ${petAge[2]}</div>
					</div>
					<div class="inline-block pet-description">
						<h3>Meet ${petName[2]}:</h3>
						<p>${petDescription[2]}</p>
					</div>
					<div class= "read-more-petfinder">
						<a href="https://www.petfinder.com/search/dogs-for-adoption/us/ca/los-angeles/?breed%5B0%5D=${selectedBreed}&name=${petName[2]}" target="_blank">Take a look at my Petfinder profile!</a>
					</div>
				</div>
				<div class="available-pet">
					<div class="inline-block pet-characteristics">
						<h2>${petName[3]}</h2>
						<img id="pet-photo" src="${petPhoto[3]}" onerror="this.src='https://ak-s.ostkcdn.com/img/mxc/Missing-Image_Dog.png'" alt="${petName[3]}">
						<div class="pet-size">Size: ${petSize[3]}</div>
						<div class="pet-sex">Sex: ${petSex[3]}</div>
						<div class="pet-age">Age: ${petAge[3]}</div>
					</div>
					<div class="inline-block pet-description">
						<h3>Meet ${petName[3]}:</h3>
						<p>${petDescription[3]}</p>
					</div>
					<div class= "read-more-petfinder">
						<a href="https://www.petfinder.com/search/dogs-for-adoption/us/ca/los-angeles/?breed%5B0%5D=${selectedBreed}&name=${petName[3]}" target="_blank">Take a look at my Petfinder profile!</a>
					</div>
				</div>
				<div class="available-pet">
					<div class="inline-block pet-characteristics">
						<h2>${petName[4]}</h2>
						<img id="pet-photo" src="${petPhoto[4]}" onerror="this.src='https://ak-s.ostkcdn.com/img/mxc/Missing-Image_Dog.png'" alt="${petName[4]}">
						<div class="pet-size">Size: ${petSize[4]}</div>
						<div class="pet-sex">Sex: ${petSex[4]}</div>
						<div class="pet-age">Age: ${petAge[4]}</div>
					</div>
					<div class="inline-block pet-description">
						<h3>Meet ${petName[4]}:</h3>
						<p>${petDescription[4]}</p>
					</div>
					<div class= "read-more-petfinder">
						<a href="https://www.petfinder.com/search/dogs-for-adoption/us/ca/los-angeles/?breed%5B0%5D=${selectedBreed}&name=${petName[4]}" target="_blank">Take a look at my Petfinder profile!</a>
					</div>
				</div>
			</div>
			<div class="see-more-matches">
				<a href="https://www.petfinder.com/search/dogs-for-adoption/us/ca/los-angeles/?breed%5B0%5D=${selectedBreed}" target="_blank">Find more ${selectedBreed}s on PetFinder!</a>
			</div>
		</div>
			
	`;
}

function takeQuiz(){
	$(".start-button").on('click', function (event){
	})
}

function startApp(){
	takeQuiz();
	displayQuestion();
	handleAnswers();
}


$(startApp());
