angular.module('MatchingGame').filter('timeFormat', function() {

    return function(input) {
        var date = new Date(input),
            amPM = date >= 12 ? 'pm' : 'am',
            hour = date.getHours();

        hour = hour > 12 ? hour - 12 : hour;
        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + hour + ':' + date.getMinutes() + amPM;
    }
});