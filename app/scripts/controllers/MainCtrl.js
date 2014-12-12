angular.module('MatchingGame').controller('MainCtrl', function($rootScope, $timeout){
    $timeout(function() {
        $rootScope.animateMe = 'animate-view';
    }, 50);
});