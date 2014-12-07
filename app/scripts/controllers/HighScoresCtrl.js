angular.module('MatchingGame').controller('HighScoresCtrl', function($scope, HighScoreService) {

	$scope.highscore = {};
	
	function allScores() {
		//Add the high score to the list:
			HighScoreService.getAllSortedByHighScore(5).then(function(highScores){
				$scope.highScores = highScores;
		});
	}
	
});