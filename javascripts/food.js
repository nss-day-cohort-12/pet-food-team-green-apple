// Declare new XHR variable which will eventually be used for the dogfood JSON file
var dogRequest = new XMLHttpRequest();
var catRequest = new XMLHttpRequest();

// Function for cleaning up strings
function cleanUp (string) {
	// First step, remove underscores with spaces
	string = string.replace(/_/g, " ");
	// if a space exists in the string, split > capitalize the first letter of each word > join back into one string
	if (string.indexOf(" ") !== -1) {
		string = string.split(" ").map(function(element){
			return element.charAt(0).toUpperCase() + element.slice(1);
		}).join(" ");
	} else {
		// If there's only one word, Capitalize the first letter
		string = string.charAt(0).toUpperCase() + string.slice(1);
	}
	return string;
};

// Testing with dog data only first
function executeThisCodeAfterFileIsLoaded () {

	// Parse the response text as JSON
	var data = JSON.parse(this.responseText);
	// console.log("data", data);

	// Declare element variables
	var dogContainer = document.getElementById("dog");

	// console.log("dogContainer: ", dogContainer);

	var productData = "";
	var currentProduct;

	// Loop through the dog_brands array
	if (data.dog_brands) {
	/////////////////
	//DOG FOOD LOOP//
	////////////////
		for (var i = 0; i < data.dog_brands.length; i++) {
			currentProduct = data.dog_brands[i];

			productData += `<div class="brandBlock">`;
			productData += `<p>Brand Name: ${currentProduct.name}</p>`;
			// console.log("name: ", currentProduct.name);
			// console.log("types: ", currentProduct.types);
			// Loop through the "types" array in dog_brands
			for (var j = 0; j < currentProduct.types.length; j++) {
				var currentTypes = currentProduct.types[j];
				productData += `<div class="productBlock">`;
				productData += `Product Type: ${cleanUp(currentTypes.type)}`;
				// console.log("currentTypes.type: ", currentTypes.type);
				// console.log("volumes: ");
				// Loop through the "volumes" array in types and display "name" & "price"
				for (var k = 0; k < currentTypes.volumes.length; k++) {
					var currentVolumes = currentTypes.volumes[k];
					productData += `<div class="volumeBlock">`;
					productData += `Name: ${currentVolumes.name}`;
					productData += `Price: $${currentVolumes.price}`;
					productData += `</div>`; // Closing volumeBlock
					// console.log("currentVolumes Name: ", currentVolumes.name);
					// console.log("currentVolumes Price: ", currentVolumes.price);
				}
			productData += `</div>`; //Closing productBlock
			// console.log("productData: ", productData);
			}
		productData += `</div>`; //Closing brandBlock
		}
		// Fill dog container with html string
		dogContainer.innerHTML = productData;


	} else if (data.cat_brands) {
	/////////////////
	//CAT FOOD LOOP//
	////////////////

	var catContainer = document.getElementById("cat");

		// Loop through the dog_brands array
		for (var i = 0; i < data.cat_brands.length; i++) {
			currentProduct = data.cat_brands[i];

			productData += `<div class="brandBlock">`;
			productData += `<p>Brand Name: ${currentProduct.name}</p>`;
			productData += `<p>Breeds: ${currentProduct.breeds}</p>`;
			// console.log("name: ", currentProduct.name);
			// console.log("types: ", currentProduct.types);
			// Loop through the "types" array in dog_brands
			for (var j = 0; j < currentProduct.types.length; j++) {
				var currentTypes = currentProduct.types[j];
				productData += `<div class="productBlock">`;
				productData += `Product Type: ${currentTypes.type}`;
				// console.log("currentTypes.type: ", currentTypes.type);
				// console.log("volumes: ");
				// Loop through the "volumes" array in types and display "name" & "price"
				for (var k = 0; k < currentTypes.volumes.length; k++) {
					var currentVolumes = currentTypes.volumes[k];
					productData += `<div class="volumeBlock">`;
					productData += `Name: ${currentVolumes.name}`;
					productData += `Price: $${currentVolumes.price}`;
					productData += `</div>`; // Closing volumeBlock
					// console.log("currentVolumes Name: ", currentVolumes.name);
					// console.log("currentVolumes Price: ", currentVolumes.price);
				}
			productData += `</div>`; //Closing productBlock
			}
		productData += `</div>`; //Closing brandBlock
		}
		// Fill dog container with html string
		catContainer.innerHTML = productData;
	};
}




dogRequest.addEventListener("load", executeThisCodeAfterFileIsLoaded);
catRequest.addEventListener("load", executeThisCodeAfterFileIsLoaded);

dogRequest.open("GET", "dog.json");
catRequest.open("GET", "cat.json");
dogRequest.send();
catRequest.send();


