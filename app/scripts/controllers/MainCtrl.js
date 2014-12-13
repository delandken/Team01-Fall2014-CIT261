angular.module('MatchingGame').controller('MainCtrl', function($rootScope, $timeout){
    'use strict';
    $timeout(function() {
        $rootScope.animateMe = 'animate-view';
    }, 50);
});