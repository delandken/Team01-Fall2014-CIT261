angular.module('MatchingGame', ['ngRoute']).config(function($routeProvider){
	$routeProvider.when('/main', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	});

	$routeProvider.when('/highscore', {
		templateUrl: 'views/highscore.html',
		controller: 'HighScoreCtrl'
	});

	$routeProvider.when('/options', {
		templateUrl: 'views/options.html',
		controller: 'OptionsCtrl'
	});

	$routeProvider.when('/game', {
		templateUrl: 'views/game.html',
		controller: 'GameCtrl'
	});

	$routeProvider.otherwise('/main');
});