angular.module('MatchingGame').controller('HighScoreCtrl', function($scope, HighScoreService) {

	$scope.highscore = {};
	
		//Add the high score to the list:
			HighScoreService.getAllSortedByHighScore(5).then(function(highScores){
			console.log(highScores);
				$scope.highScores = highScores;
		});
	
});