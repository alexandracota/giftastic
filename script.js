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

$(document).on('click', '.gif' , function() {
	if ($(this).attr('data-playing') === "false") {

		$(this).attr('src', $(this).attr('data-moving'));
		$(this).attr('data-playing', "true");
	} else {

		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-playing', "false");
	}
	//If this is playing

	//If this is not playing

});

//Display animal GIF
function displayAnimalGif () {




	//When an animal button is clicked,
	$("#animal-buttons").on('click', '.animal-button' , function() {
	
		// console.log($(this).attr('data-animal'))

		var animal = $(this).attr('data-animal');

		//URL and API key.
		var apiKey = "dc6zaTOxFJmzC";
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apiKey;
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
				var stillImage = response.data[b].images.downsized_still.url;
				var movingImage = response.data[b].images.downsized.url;

				//Create element to have image displayed.
				var animalDiv = $("<img>")
				.attr("src", stillImage)
				.attr("data-still", stillImage)
				.attr("data-moving", movingImage)
				.attr("data-playing", "false")
				//add classes to each gif being displayed.
				.addClass("gif");	
				console.log(animalDiv);

				//Display the images
				
				$("#animals").prepend(animalDiv);

			};
		});

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
		a.attr("data-animal", animalArray[i]);
		//Provide the button's text with the value of the movie at index i.
		a.text(animalArray[i]);
		//Append animal buttons to element with animal-buttons ID in HTML
		
		$("#animal-buttons").append(a);
	};
};



//Click event listener to all elements with an ID of animal-buttons.
$(document).on("click", ".animal-button", displayAnimalGif);

//When another animal is added by the user...
$("#addAnimal").on("click", function(event) {
	//Prevent default.
	event.preventDefault();
	//Get the value of the animal input.
	var animal = $("#animal-input").val().trim();
	//Push the animal to the animals buttons
	animalArray.push(animal);
	//Render buttons to include the new animal button.
	renderButtons();
});


displayAnimalGif();
renderButtons();


});















