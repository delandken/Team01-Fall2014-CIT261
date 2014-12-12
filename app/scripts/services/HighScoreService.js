angular.module('MatchingGame').factory('HighScoreService', function($resource, StorageService, $q) {
    //Define a Server API For Us:
    var HighScore = $resource('http://matchinggame.dev');

    var highScores = HighScore.query(function(results) {
        for(var i = 0, result; result = results[i]; i++) {
            store(result.value, result.time);
        }
    });

    var add = function(newHighScore, date) {
        //Do not add a high score of 0. We don't want people to feel bad :(
        if (newHighScore === 0) {
            var $defer = $q.defer();
            $defer.resolve();

            return $defer.promise;
        }
        var date = date || new Date().getTime();

        //Send to the server for syncing:
        var newHighScore = new HighScore({value: newHighScore, scoreTime: date});
        newHighScore.$save();
        return store('score', {value: newHighScore, time: date});
    };

    var store = function(newHighScore, date) {
        console.log(newHighScore, date);
        return StorageService.add('score', {value: newHighScore, time: date});
    }

    var getAll = function() {
        return StorageService.getAll('score');
    };

    var getAllSortedByTime = function() {
        return StorageService.getAllSorted('score', 'time', 'prev');
    }

    var getAllSortedByHighScore = function(limit) {
        return StorageService.getAllSorted('score', 'value', 'prev', limit);
    }

    return {
        add: add,
        getAll: getAll,
        getAllSortedByTime: getAllSortedByTime,
        getAllSortedByHighScore: getAllSortedByHighScore
    };
});