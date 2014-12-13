angular.module('MatchingGame', ['ngRoute', 'ngResource', 'ngAnimate']);
angular.module('MatchingGame').config(function($routeProvider, $httpProvider){
	'use strict';

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
});
angular.module('MatchingGame').run(function($rootScope, $location) {
	'use strict';
	
	var curLocation;
	$rootScope.$on('$locationChangeSuccess', function() {
		curLocation = $location.path();
	});

	$rootScope.$watch(function(){return $location.path();}, function(newPath) {
		if(newPath === curLocation) {
			$rootScope.animateClass='back-animate';
		} else {
			$rootScope.animateClass ='forward-animate';
		}
	});
});