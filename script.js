$(document).ready(function() {

var animalArray = [
	"duck", 
	"frog", 
	"goose", 
	"pig", 
	"fish", 
	"llama", 
	"tortoise", 
	"bear", 
	"bee", 
	"cow"
	];
	


//displayAnimalGif function re-renders the HTML to display the appropriate content.
function displayAnimalGif () {
	
	///========== REVIEW HOW TO USE ATTR ===============///
	var animal = $(animalArray).val("data-animal");
	console.log(animal);
	///========== REVIEW HOW TO USE ATTR ===============///

	var apiKey = "dc6zaTOxFJmzC";
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apiKey;
	console.log(queryURL);

	//Ajax call for the specific animal button being clicked.
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		
		//For loop to pull first 10 images.
		for (var b = 0; b < 10; b++) {

		//Store image data.
		var imgURL = response.data[b].images.preview_gif.url;

		//Create element to have image displayed.
		var animalDiv = $("<img>").attr("src", imgURL);	

		//Display the images
		$("#animals").prepend(animalDiv);

		};
	});
};

//Dynamically create buttons.
function renderButtons() {
	//Clear div contents
	$("#animal-buttons").empty();
	//For loop to iterate through the animals in the array.
	for (var i = 0; i < animalArray.length; i++) {
		//Create button.
		var a = $("<button>");
		//Add class to button.
		a.addClass("animal-button animal");
		//Add data attribute with a value of the animal at index i
		a.val("data-animal", animalArray[i]);
		//Provide the button's text with the value of the movie at index i.
		a.text(animalArray[i]);
		//Append animal buttons to element with animal-buttons ID in HTML
		$("#animal-buttons").append(a);
	};
};

//Click event listener to all elements with an ID of animal-buttons.
$(document).on("click", "#animal-buttons", displayAnimalGif);

//When another animal is added by the user...
$("#addAnimal").on("click", function(event) {
	//Prevent default.
	event.preventDefault();
	//Get the value of the animal input.
	var animal = $("#animal-input").val().trim();
	//Push the animal to the animals buttons
	animals.push(animal);
	//Render buttons to include the new animal button.
	renderButtons();
});

displayAnimalGif();
renderButtons();


});
