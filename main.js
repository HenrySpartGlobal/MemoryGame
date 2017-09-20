$(function() {

        //start button removes background and starts game

        $("button").click(function() {
        $(".background").toggle();
        $(".background_music")[0].pause();
    });

    $(document).ready(function() {

        var points = 0; //points

        var counterOutside; //counter 

        //start of an 'object' for the memory game
        var app = {
            cards: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, ], //array of cards 

            init: function() {
                app.shuffle();
            },

            shuffle: function() { //card shuffling function
                var random = 0;
                var temp = 0;
                for (i = 0; i < app.cards.length; i++) { //iterates through the number of cards 14 times and each time it will present a random number
                    random = Math.round(Math.random() * i);
                    console.log(random); //displays 14 random numbers in the console log
                    temp = app.cards[i];
                    app.cards[i] = app.cards[random];
                    app.cards[random] = temp; //stores the current index number into app.cards, then set it into the temp variable then set app.cards into random, and random back to temp 
                };
                app.setCards();
                console.log('shuffled cards:  ' + app.cards); //displays the order the cards were shuffled in the console

            },
            setCards: function() { //this function sets a random value to the cards
                $('.cards').each(function(index) {

                    $(this).attr('data-card-value', app.cards[index]); //the .attr gets the attribute value on only the first element
                    app.cards[index];
                });

                app.clickEvents();
            },
            clickEvents: function() {
                $('.cards').on('click', function() {
                    $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected'); //adds the "selected" class to clicked cards
                    app.checkGame();

                });
            },
            checkGame: function() {
                if ($('.selected').length === 2) {
                    if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) { //checks to see if the first and last cards clicked, match. If they do remove the cards
                        $('.selected').each(function() {
                            points++;
                            $('#points').html(points + " points"); //add 2 points if the cards match
                            $(".myAudioElement")[0].play(); //play audio 
                            console.log('music played')
                            $(this).animate({
                                opacity: 0
                            }).removeClass('notmatched'); //if the they match then hide them with opacity and remove 'notmatched' from the class

                        });
                        $('.selected').each(function() {
                            $(this).removeClass('selected');
                        });
                        app.checkWin(); 
                    } else {
                        setTimeout(function() {
                            $('.selected').each(function() {
                                $(this).html('').removeClass('selected');
                            });
                        }, 1000); //removes the selected class, and turns them to their orignal class if 2 cards dont match
                    }
                }
            },
            checkWin: function() { //if there are 0 classes with the "notmatched" class then the game is over!
                if ($('.notmatched').length === 0) {
                    $('.game').html("<h1> All Cards Matched! </h1>" + "<h2> CLICKS: " + number + "</h2>"); 
                    $('.game').append($('clicks'));
                    $('.game').prepend('<img src="images/Mr_Cherry.png"/>');
                    $('.game').append($('.button'));
                    $(".winner")[0].play();
                    clearInterval(counterOutside);
                    $('.button').click(function() { //start button reloads the page
                        location.reload();
                    });
                }
            }
        };
        //end of object - End of Memory Game

        //count down timer 
        $(".start").click(function() {

            var count = 45; // time in seconds
            counterOutside = setInterval(timer, 1000); //runs every one second
            function timer() {
                count = count - 1;
                if (count <= 0) { //if timer hits zero do the following
                    clearInterval(counterOutside);
                    $('.game').html("<h1> You ran out of Time! </h1>" + "<h2> CLICKS: " + number + "</h2>");
                    $(".gameover")[0].play(); //game over sounds
                    $('.game').append($('.button')); //restarts the game
                    $('.button').click(function() {
                        location.reload();
                        
                    });
                   $('.game').prepend('<img src="images/game_over.jpg"/>');

                    return;
                }
                document.getElementById('timer').innerHTML = count + " seconds left!";
            }
        });
        //click counter 
        var number = 0;
        $('.cards').click(function() {
            number++;
            document.getElementById("clicks").innerHTML = number + " click(s) "
        }); //counts everytime the user clicks on a card - the "points" system

        //Bounce animation
        var bouncetime = 1000;
        var fruitheight = 280;
        var fruitsize = 80;

        $('.fruit1').css({
            'width': fruitsize,
            'height': fruitsize,
            'margin-right': -(fruitsize / 2),
            'display': 'block-inline',
            'bottom': fruitheight
        });

        fruitbounce();

        function fruitbounce() {
            $('.fruit1').animate({
                'bottom': 20
            }, bouncetime, 'easeInQuad', function() {
                $('.fruit1').animate({
                    'bottom': fruitheight
                }, bouncetime, 'easeOutQuad', function() {
                    fruitbounce();
                });
            });

        };
        //background scroll 
        var scrollSpeed = 75;
        // set the main position
        var current = 0;
        // set the direction
        var direction = 'h';

        function bgscroll() {
        // 1 pixel row at a time
            current -= 1;
            // move the background with backgrond-position css properties
            $('body').css("backgroundPosition", (direction == 'h') ? current + "px 0" : "0 " + current + "px");
        }

        //Calls the scrolling function repeatedly
        setInterval(bgscroll, scrollSpeed);

        app.init(); //initialisation - runs the shuffle card function
    });

});