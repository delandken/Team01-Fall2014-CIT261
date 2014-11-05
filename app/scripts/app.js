angular.module('MatchingGame', ['ngRoute']).config(function($routeProvider){
	$routeProvider.when('/main', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	});

	$routeProvider.when('/highscore', {
		templateUrl: 'views/highscore.html',
		controller: 'HighScoreCtrl'
	});

	$routeProvider.otherwise('/main');
});