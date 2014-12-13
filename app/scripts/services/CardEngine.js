/*jshint -W084 */
angular.module('MatchingGame').factory('CardEngine', function() {
    'use strict';
    var options = {
        shape: [
            'square',
            'circle',
            'triangle',
            'pentagon',
            'octagon'
        ],
        color: [
            'blue',
            'green',
            'orange',
            'purple',
            'yellow',
            'red'
        ]
    };

    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
        return o;
    }

    function generateDeck(numCards, matchingStyle) {
        //First, validate that the number of cards is even:
        if (numCards % 2 !== 0) {
            throw 'Invalid number of cards';
        }

        //Now, determine the max number of items we can get:
        var myOptions = shuffle(window.angular.copy(options[matchingStyle])),
            otherOptionName = matchingStyle === 'shape' ? 'color' : 'shape',
            otherOption = shuffle(window.angular.copy(options[otherOptionName])),
            cards = [];

        if(myOptions.length < numCards / 2) {
            throw 'Not that many options available.';
        }

        myOptions = myOptions.slice(0, numCards / 2);


        var currentCard,
            copyCard;
        for(var i = 0, cardOption; cardOption = myOptions[i]; i++) {
            //Get a random item from the option
            currentCard = {active: false};
            currentCard[matchingStyle] = cardOption;
            currentCard[otherOptionName] = otherOption[Math.floor(Math.random() * otherOption.length)];
            cards.push(currentCard);
            copyCard = window.angular.copy(currentCard);
            copyCard[otherOptionName] = otherOption[Math.floor(Math.random() * otherOption.length)];
            cards.push(copyCard);
        }

        return shuffle(cards);
    }

    return {
        generateDeck: generateDeck
    };
});