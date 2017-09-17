$(function(){ 

	//start button removes background and starts game

	$("button").click(function() {
    $(".background").toggle();
    $('x');
});
	$(document).ready(function(){
	var app = {
		cards: 
		[0,0,1,1,2,2,3,3,4,4,5,5,6,6,],
		 //array of cards 
		
		init: function () {
			app.shuffle();


		},
		shuffle: function() { //card shuffling function
			var random = 0;
			var temp = 0;
			for(i = 0; i < app.cards.length; i++) { //iterates through the number of cards 14 times and each time it will present a random number
				random = Math.round(Math.random() * i);
				console.log(random); //shows random 14 numbers in the console log
				temp = app.cards[i];
				app.cards[i] = app.cards[random];
				app.cards[random] = temp; //stores the current index number into app.cards, then set it into the temp variable then set app.cards into random, and random back to temp 



			}
			app.setCards();
			console.log('shuffled cards:  ' +app.cards); //shows how the cards were shuffled

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
				$(this).html('<p>'+$(this).data('cardValue')+'</p>').addClass('selected'); //adds the selected class
				app.checkGame();

			});


		},
		checkGame: function() {
			if($('.selected').length === 2){
				if($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) { //checks to see if the first and last cards clicked, match. If they do remove the cards
					$('.selected').each(function(){
					console.log('MATCHED!');
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
				$('.game').html("<h1> Game Over! </h1>"); //if there are 0 classes with the notmatched class then the game is over!
			}
		}

	};

		//count down timer 
		$(".start").click( function(){

		var count=10;
		var counter=setInterval(timer, 1000);
		function timer() {
			count=count-1;
			if (count <=0)
			{
				clearInterval(counter);
				$('.game').html("<h1> Game Over! </h1>");
				return;
			}
			document.getElementById('timer').innerHTML=count + " seconds left!";
		}

		});

		//click counter 
		var number = 0;
		document.onclick = function(){
			number++;
			document.getElementById("clicks").innerHTML = number  + " click(s) ";
		}


	app.init(); //init means initialisation 


	});

});












