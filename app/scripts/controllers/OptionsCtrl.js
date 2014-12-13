angular.module('MatchingGame').controller('OptionsCtrl', function($scope, $rootScope) {
	'use strict';
	$scope.value = 0;
	
	// Sound toggle
	$scope.soundOn = function() {
		window.alert('Turn sound on?');
	};
	$scope.soundOff = function() {
		window.alert('Turn sound off?');
	};
	
	// Game table size selection
	$scope.sizeSmall = function() {
		window.alert('3x3 Size Selected');
	};
	$scope.sizeMedium = function() {
		window.alert('4x4 Size Selected');
	};
	$scope.sizeLarge = function() {
		window.alert('5x5 Size Selected');
	};

	$scope.goBack = $rootScope.goBack;

	$scope.value = 0;
});