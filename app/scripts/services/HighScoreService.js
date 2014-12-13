/*jshint -W084 */
angular.module('MatchingGame').factory('HighScoreService', function($resource, StorageService, $q) {
    'use strict';
    //Define a Server API For Us:
    var HighScore = $resource('http://matchinggame.dev');

    HighScore.query(function(results) {
        var counter = 0;
        var storeScore = function(result) {
            store(result.value, result.time).then(function() {
                if (++counter < results.length) {
                    storeScore(results[counter]);
                }
            });
        }

        storeScore(results[0]);
    });

    var add = function(newHighScore, date) {
        //Do not add a high score of 0. We don't want people to feel bad :(
        if (newHighScore === 0) {
            var $defer = $q.defer();
            $defer.resolve();

            return $defer.promise;
        }
        date = date || new Date().getTime();

        //Send to the server for syncing:
        var highScore = new HighScore({value: newHighScore, scoreTime: date});
        highScore.$save();
        return store('score', {value: newHighScore, time: date});
    };

    var store = function(newHighScore, date) {
        return StorageService.add('score', {value: newHighScore, time: date});
    };

    var getAll = function() {
        return StorageService.getAll('score');
    };

    var getAllSortedByTime = function() {
        return StorageService.getAllSorted('score', 'time', 'prev');
    };

    var getAllSortedByHighScore = function(limit) {
        return StorageService.getAllSorted('score', 'value', 'prev', limit);
    };

    return {
        add: add,
        getAll: getAll,
        getAllSortedByTime: getAllSortedByTime,
        getAllSortedByHighScore: getAllSortedByHighScore
    };
});