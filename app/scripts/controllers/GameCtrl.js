angular.module('MatchingGame').controller('GameCtrl', function($scope, $timeout, $interval) {
	var activeCard;

	$scope.cards = [
		{
			shape: 'square',
			color: 'red',
			active: false},
		{
			shape: 'triangle',
			color: 'red',
			active: false
		},
		{
			shape: 'circle',
			color: 'blue',
			active: false
		},
		{
			shape: 'square',
			color: 'red',
			active: false
		},
		{
			shape: 'circle',
			color: 'blue',
			active: false
		},
		{
			shape: 'triangle',
			color: 'red',
			active: false
		}
	];

	$scope.currentTimer = 0;

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
				} else {
					activeCard.active = false;
					card.active = false;
				}

				activeCard = null;
			} else {
				activeCard = card;
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