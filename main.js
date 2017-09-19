$(function(){ 

	//start button removes background and starts game

	$("button").click(function() {
    $(".background").toggle();

});


$(document).ready(function(){
	
	var points = 0; //points variable

	//start of an object for the memory game
	var app = {
		cards: 
		[0,0,1,1,2,2,3,3,4,4,5,5,6,6,], //array of cards 

		init: function () {
			app.shuffle();
		},

		shuffle: function() { //card shuffling function
			var random = 0;
			var temp = 0;
			for(i = 0; i < app.cards.length; i++) { //iterates through the number of cards 14 times and each time it will present a random number
				random = Math.round(Math.random() * i);
				console.log(random); //displays 14 random numbers in the console log
				temp = app.cards[i];
				app.cards[i] = app.cards[random];
				app.cards[random] = temp; //stores the current index number into app.cards, then set it into the temp variable then set app.cards into random, and random back to temp 

			};
			app.setCards();
			console.log('shuffled cards:  ' + app.cards); //displays the order the cards were shuffled in

		},
		setCards: function () { //this function sets a random value to the cards
			$ ('.cards').each(function(index) {
				
				$(this).attr('data-card-value', app.cards[index]); //the .attr gets the attribute value on only the first element
				app.cards[index];
			});

			app.clickEvents(); 

		},
		clickEvents: function() {
			$('.cards').on('click', function() {
				$(this).html('<p>'+$(this).data('cardValue')+'</p>').addClass('selected'); //adds the "selected" class to clicked cards
				app.checkGame();

			});


		},
		checkGame: function() {
			if($('.selected').length === 2){
				if($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) { //checks to see if the first and last cards clicked, match. If they do remove the cards
					$('.selected').each(function(){
					points++; 
					$('#points').html(points + " points"); //add 2 points if the cards match
					$(this).animate({opacity: 0}).removeClass('notmatched'); //if the they match then hide them with opacity and remove notmatched from the class

					});
					$('.selected').each(function(){
					$(this).removeClass('selected');
				});
					app.checkWin(); 
				}else {
					setTimeout(function(){
						$('.selected').each(function(){
							$(this).html('').removeClass('selected');
						});
					}, 1000);

				}
				
			}
		},
		checkWin: function() {
			if($('.notmatched').length === 0 ) {
				$('.game').html("<h1> Well Done! </h1>" + "<h2> You matched all the cards!</h2>"); //if there are 0 classes with the "notmatched" class then the game is over!
			}
		}

	};
	//end of object - End of Memory Game

	//count down timer 
	$(".start").click( function(){

		var count=5; //60 seconds
		var counter=setInterval(timer, 1000); //runs every one second
		function timer() {
			count=count-1;
			if (count <=0)
			{
				clearInterval(counter);
				$('.game').html("<h2> You ran out of Time! :( </h2>");

				return;
			}
			document.getElementById('timer').innerHTML=count + " seconds left!";
		}

	});

	//click counter 
	var number = 0;
	$('.cards').click(function(){
		number++;
		document.getElementById("clicks").innerHTML = number  + " click(s) "
	}); //counts everytime the user cicks on a card

	//Bounce animation
	var bouncetime = 1000;
    var fruitheight = 280;
    var fruitsize = 80;
 
    $('.fruit1').css({'width':fruitsize, 'height':fruitsize, 'margin-right':-(fruitsize/2),'display':'block-inline', 'bottom':fruitheight});
   
   	fruitbounce();
 
    function fruitbounce() {
        $('.fruit1').animate({'bottom':20}, bouncetime, 'easeInQuad', function() {
            $('.fruit1').animate({'bottom':fruitheight}, bouncetime, 'easeOutQuad', function() {
                fruitbounce();
            });
        });

	};

	app.init(); //initialisation 

});

});















