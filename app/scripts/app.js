angular.module('MatchingGame', ['ngRoute', 'ngResource', 'ngAnimate']).config(function($routeProvider, $httpProvider){
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

	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).run(function($rootScope, $location, $timeout) {
	var curLocation;
	$rootScope.$on('$locationChangeSuccess', function() {
		curLocation = $location.path();
	});

	$rootScope.$watch(function(){return $location.path()}, function(newPath, oldPath) {
		if(newPath === curLocation) {
			$rootScope.animateClass='back-animate';
		} else {
			$rootScope.animateClass ='forward-animate';
		}
	});
});