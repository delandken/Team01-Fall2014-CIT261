angular.module('MatchingGame', ['ngRoute', 'ngResource']).config(function($routeProvider, $httpProvider){
	$routeProvider.when('/main', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	});

	$routeProvider.when('/highscore', {
		templateUrl: 'views/highscore.html',
		controller: 'HighScoresCtrl'
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

	console.log($httpProvider.defaults);
	// $httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});