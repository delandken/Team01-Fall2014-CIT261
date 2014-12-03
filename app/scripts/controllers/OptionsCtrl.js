angular.module('MatchingGame').controller('OptionsCtrl', function($scope) {
	
	// Sound toggle
	$scope.soundOn = function() {
		alert('Turn sound on?');
	};
	$scope.soundOff = function() {
		alert('Turn sound off?');
	};
	
	// Mode selection functions
	$scope.modeEasy = function() {
		alert('Easy Mode');
	};
	$scope.modeHard = function() {
		alert('Hard Mode');
	};
	
	// Game table size selection
	$scope.sizeSmall = function() {
		alert('4x4 Size Selected');
	};
	$scope.sizeMedium = function() {
		alert('6x6 Size Selected');
	};
	$scope.sizeLarge = function() {
		alert('10x10 Size Selected');
	};
	
	// Card function selection
	$scope.cardColor = function() {
		alert('Color Cards Selected');
	};
	$scope.cardSimple = function() {
		alert('Simple Cards Selected');
	};
	$scope.cardEnhanced = function() {
		alert('Enhanced Cards Selected');
	};
	
	// options list...
	$scope.optionsList = [
      {
          Sound Effects: {
              trigger1: 'On',
              trigger0: 'Off'
          }
          Music: {
              trigger1: 'On',
              trigger0: 'Off'
          }
          Bright: {
              slide: ' '
          }
          //Radio Boxes
          Difficulty: {
              hard: ' ',
              medium: ' ',
              easy: ' '
          }
    ];
});