angular.module('MatchingGame').controller('HighScoresCtrl', function($scope, HighScoreService) {

	
	
	$scope.highScores = function() {
		//Add the high score to the list:
		HighScoreService.add($scope.game.currentMatches).then(function(){
			HighScoreService.getAllSortedByHighScore(5).then(function(highScores){
				$scope.highScores = highScores;
			});
		});
	}
	
});