angular.module('MatchingGame').controller('GameCtrl', function($scope, $timeout, $interval) {
	var activeCard;

	var cards = [
		{
			shape: 'square',
			color: 'purple',
			active: false},
		{
			shape: 'triangle',
			color: 'blue',
			active: false
		},
		{
			shape: 'circle',
			color: 'red',
			active: false
		},
		{
			shape: 'square',
			color: 'purple',
			active: false
		},
		{
			shape: 'circle',
			color: 'red',
			active: false
		},
		{
			shape: 'triangle',
			color: 'blue',
			active: false
		}
	];

	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};

	$scope.cards = shuffle(cards);

	$scope.currentTimer = 0;
	$scope.currentMatches = 0;
	$scope.guesses = 0;
	$scope.memoryRatio = 0;

	var timerTimeout = $interval(function() {
		$scope.currentTimer += 1;
	}, 1000);

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
				if (activeCard.shape === card.shape) {
					activeCard.match = true;
					card.match = true;

					$scope.currentMatches++;
				} else {
					activeCard.active = false;
					card.active = false;
				}

				activeCard = null;
				$scope.guesses++;
			} else {
				activeCard = card;
			}

			if ($scope.currentMatches > 0) {
				$scope.memoryRatio =Math.floor(($scope.currentMatches / $scope.guesses) * 100);
			}
		}, 510);
	}

	$scope.allMatched = function() {
		var allMatched = true;
		for (var i = 0, card; card = $scope.cards[i]; i++) {
			allMatched = allMatched && card.match;
		}

		if (allMatched) {
			$interval.cancel(timerTimeout);
		}
		return allMatched;
	}
});