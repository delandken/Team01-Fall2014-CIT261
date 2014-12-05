angular.module('MatchingGame').factory('HighScoreService', function(StorageService, $q) {
    var add = function(newHighScore, date) {
        //Do not add a high score of 0. We don't want people to feel bad :(
        if (newHighScore === 0) {
            var $defer = $q.defer();
            $defer.resolve();

            return $defer.promise;
        }
        var date = date || new Date().getTime();
        return StorageService.add('score', {value: newHighScore, time: date});
    };

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