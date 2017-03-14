'use strict';

angular.module('app').factory('userService', function () {

    var listOfCards = [
        '../../Images/cards/Card_Black_01.png',
        '../../Images/cards/Card_Black_02.png',
        '../../Images/cards/Card_Black_03.png',
        '../../Images/cards/Card_Black_04.png',
        '../../Images/cards/Card_Black_05.png',
        '../../Images/cards/Card_Black_06.png',
        '../../Images/cards/Card_Red_01.png',
        '../../Images/cards/Card_Red_02.png',
        '../../Images/cards/Card_Red_03.png',
        '../../Images/cards/Card_Red_04.png',
        '../../Images/cards/Card_Red_05.png',
        '../../Images/cards/Card_Red_06.png'
    ];
    var service = {};

    service.getCard = function (color) {
        // random card from list of image cards
        var card = listOfCards[Math.floor(Math.random() * listOfCards.length)];
        var isRight = card.indexOf(color); // try to find the word 'red' or 'black' in the src image to know if its true/false
        if (isRight !== -1) {
            return {
                card:card,
                isGuess:true
            };
        }
        else {
            return {
                card:card,
                isGuess: false
            };
        }
    };

    return service

});