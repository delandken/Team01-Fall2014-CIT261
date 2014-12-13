angular.module('MatchingGame').controller('HighScoreCtrl', function($scope, $rootScope, HighScoreService) {
    'use strict';
	$scope.highscore = {};
	
		//Add the high score to the list:
		HighScoreService.getAllSortedByHighScore(10).then(function(highScores){
			$scope.highScores = highScores;
		});

        $scope.goBack = $rootScope.goBack;
	
});