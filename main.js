$(function(){ 

	//start button removes background and starts game

	$("button").click(function() {
    $(".background").toggle();
});
	$(document).ready(function(){
	var app = {
		cards: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,], //array of cards 
		init: function () {
			app.shuffle();


		},
		shuffle: function() { //card shuffling function
			var random = 0;
			var temp = 0;
			for(i =1; i < app.cards.length; i++) { //iterates through the number of cards 14 times and each time it will present a random number
				random = Math.round(Math.random() * i);
				console.log(random); //shows random 14 numbers in the console log
				temp = app.cards[i];
				app.cards[i] = app.cards[random];
				app.cards[random] = temp; //stores the current index number into app.cards, then set it into the temp variable then set app.cards into random, and random back to temp 

			}
			console.log('shuffled cards:  ' +app.cards); //shows how the cards were shuffled

		},
		clickEvents: function() {


		}


	};

	app.init(); //init means initialisation 

	});

});












