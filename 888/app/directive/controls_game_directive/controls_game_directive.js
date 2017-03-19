'use strict';

angular.module('app').directive('controlsGame', ['userService', function (userService) {

    return {
        restrict: 'EA',
        replace: true,
        templateUrl: '../app/directive/controls_game_directive/controls_game_directive.html',
        link: function (scope, elem, attrs) {
            scope.BlackImage = "../Images/Black_disabled.png"; // default image for black button
            scope.RedImage = "../Images/Red_disabled.png";  // default image for red button
            scope.strikes = "../Images/lives_02.png";  // default lives image in start game
            scope.isDisabledAutoPlay = false; // for disabled button auto play after user choose play regular game
            scope.isDisabledButtons = false; // for disabled buttons red and black after user choose play auto play mode
            scope.isAuto = false; // turn game to auto play mode on/off
            scope.strikeLimit = 2; // games for player
            scope.userWins = 0; // steps to win and use for steps image

            // function for hidden pre loader 3D after 3 sec
            // and make screen with no event click until the window is loaded
            (function () {
                setTimeout(function () {
                    angular.element('#pre').css('visibility', 'hidden');
                    angular.element('.dependent_on_screen').css('pointer-events', 'auto');
                }, 3000);
            })();


            scope.mouseEnter = function (color) {
                if (color === 'red') {
                    scope.RedImage = "../Images/Red_idle.png";
                }
                else {
                    scope.BlackImage = "../Images/Black_idle.png";
                }
            };

            scope.mouseLeave = function (color) {
                if (color === 'red') {
                    scope.RedImage = "../Images/Red_disabled.png";
                }
                else {
                    scope.BlackImage = "../Images/Black_disabled.png";
                }
            };

            scope.mouseDown = function (color) {
                if (color === 'red') {
                    scope.RedImage = "../Images/Red_Selected.png";
                }
                else {
                    scope.BlackImage = "../Images/Black_Selected.png";
                }
            };
            // show tutorial on screen
            scope.showGuide = function () {
                scope.helpGuide = {
                    'width': '100%'
                }
            };
            // hide tutorial on screen
            scope.hideGuide = function () {
                scope.helpGuide = {
                    'width': '0'
                }
            };


            // function for change css class card X and card V to show / hide after user guess
            scope.changeClasses = function (element) {
                element.addClass('visible1');
                element.removeClass('hidden1');
                element.css({'visibility': 'visible'});
                setTimeout(function () {
                    element.addClass('hidden1');
                    element.removeClass('visible1');
                    element.css({'visibility': 'hidden'});
                }, 1000);
            };
            // function for change css class card to show / hide after user guess
            scope.changeClassesForCard = function (element) {
                element.addClass('visible1');
                element.removeClass('hidden1');
                element.css({'visibility': 'visible'});
            };
            // mode auto play run until user win or lose
            scope.autoPlay = function () {
                var num = Math.floor(Math.random() * 100) + 1;
                var color = num % 2 == 0 ? 'Red' : 'Black';
                scope.isAuto = true;
                if (scope.userWins === 4) {
                    setTimeout(function () {
                        alert('You are the winner');
                    }, 1500);
                    scope.isAuto = false;
                    return false;
                }
                if (scope.strikeLimit > 0) {
                    setTimeout(function () {
                        scope.randomCard(color);
                    }, 500);
                }
            };
            // function for random card after each click or auto play mode
            scope.randomCard = function (color) {
                scope.isAuto === true ? scope.isDisabledButtons = true : scope.isDisabledAutoPlay = true;

                var cardX = angular.element('.cardX');
                var cardV = angular.element('.cardV');
                var card = angular.element('.card_1');

                var result = userService.getCard(color);
                scope.cardImage = result.card;

                if (result.isGuess) {
                    ++scope.userWins;
                    scope.changeClassesForCard(card);
                    setTimeout(function () {
                        scope.changeClasses(cardV);
                    }, 800);

                    if (scope.userWins === 4 && scope.isAuto === false) {
                        setTimeout(function () {
                            alert('You are the winner');
                        }, 1500);
                        scope.isDisabledAutoPlay = true;
                        scope.isDisabledButtons = true;
                    }
                }
                else {
                    scope.changeClassesForCard(card);
                    setTimeout(function () {
                        scope.changeClasses(cardX);
                    }, 800);
                    if (scope.strikeLimit === 1) {
                        scope.strikes = "../Images/lives_00.png";
                        scope.strikeLimit--;
                        scope.isDisabledButtons = true;
                        setTimeout(function () {
                            alert('Game Over')
                        }, 2500);
                    }
                    else {
                        scope.strikes = "../Images/lives_01.png";
                        scope.strikeLimit--;
                    }
                }
                if (scope.isAuto) {
                    setTimeout(function () {
                        scope.$apply();
                        scope.autoPlay();
                    }, 1500)
                }
            };
            // to show the guide after the window in load for user
            scope.showGuide();
        }
    }
}]);