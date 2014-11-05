angular.module('MatchingGame').controller('MainCtrl', function($scope, StorageService, $q){
	$q.all([StorageService.add('score', {value: 123}), StorageService.add('score', {value: 321})]).then(function() {
		$scope.highScores = StorageService.getAll('score').then(function(val) {
			$scope.highScores = val;
		})

	});
});