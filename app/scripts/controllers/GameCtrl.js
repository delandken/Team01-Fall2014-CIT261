/*jshint -W084 */
angular.module('MatchingGame').controller('GameCtrl', function($scope, $timeout, $interval, $rootScope, $window, CardEngine, HighScoreService) {
	'use strict';

	var activeCard;

	$scope.game = {};
	$scope.goBack = $rootScope.goBack;

	function gameOver() {
		//Add the high score to the list:
		HighScoreService.add($scope.game.currentMatches).then(function(){
			HighScoreService.getAllSortedByHighScore(5).then(function(highScores){
				$scope.highScores = highScores;
			});
		});
	}

	function initGame() {
		$scope.game = {
			currentTimer: 0,
			currentMatches: 0,
			guesses: 0,
			level: 0,
			gameOver: false,
			totalTime: 30
		};

		activeCard = null;
		var timerInterval = $interval(function() {
			$scope.game.gameOver = !--$scope.game.totalTime;
			if ($scope.game.gameOver) {
				gameOver();
				$interval.cancel(timerInterval);
			}
		}, 1000);

		initLevel();
	}

	$scope.clickCard = function(card) {
		if (card.active) {
			card.active = false;
			activeCard = null;
			return;
		}
		//Toggle the class on the card:
		card.active = true;

		$timeout(function() {
			if (activeCard) {
				if (activeCard[$scope.game.matchMode] === card[$scope.game.matchMode]) {
					activeCard.match = true;
					card.match = true;

					$scope.game.currentMatches++;
					allMatched();
				} else {
					activeCard.active = false;
					card.active = false;
				}

				activeCard = null;
				$scope.game.guesses++;
			} else {
				activeCard = card;
			}
		}, 510);
	};

	$scope.restartGame = function() {
		initGame();
	};

	function initLevel() {
		$scope.game.matchMode = Math.random() < 0.5 ? 'shape' : 'color';
		$scope.game.level++;
		$scope.game.cards = CardEngine.generateDeck(10, $scope.game.matchMode);
	}

	function allMatched() {
		var matched = true;
		for (var i = 0, card; card = $scope.game.cards[i]; i++) {
			matched = matched && card.match;
		}

		if (matched && !$scope.gameOver) {
			initLevel();
		}
		return matched;	
	}


	initGame();
});