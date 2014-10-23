angular.module('MatchingGame', ['ngRoute']).config(function($routeProvider){
	$routeProvider.when('/main', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	});

	$routeProvider.otherwise('/main');
});