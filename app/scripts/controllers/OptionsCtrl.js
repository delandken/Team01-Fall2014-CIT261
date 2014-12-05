angular.module('MatchingGame').controller('OptionsCtrl', function($scope) {
	
	// Sound toggle
	$scope.soundOn = function() {
		alert('Turn sound on?');
	};
	$scope.soundOff = function() {
		alert('Turn sound off?');
	};
	
	// Game table size selection
	$scope.sizeSmall = function() {
		alert('3x3 Size Selected');
	};
	$scope.sizeMedium = function() {
		alert('4x4 Size Selected');
	};
	$scope.sizeLarge = function() {
		alert('5x5 Size Selected');
	};
});