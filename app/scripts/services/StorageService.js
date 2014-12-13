angular.module('MatchingGame').factory('StorageService', function($q, $filter){
  'use strict';
    var storageService = {};

    if (window.indexedDB) {
      window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
      window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

      var DBOpenRequest = window.indexedDB.open('MatchingGame', 3);
      var openDefer = $q.defer();
      var openPromise = openDefer.promise;

      DBOpenRequest.onerror = function(err) {
          console.log('Failed.');
          openDefer.reject(err);
      };
      DBOpenRequest.onsuccess = function() {
          openDefer.resolve(DBOpenRequest.result);
      };
      DBOpenRequest.onupgradeneeded = function(e) {
          var thisDB = e.target.result;

        if(thisDB.objectStoreNames.contains('score')) {
          thisDB.deleteObjectStore('score');
        }

        var scoreStore = thisDB.createObjectStore('score', {autoIncrement: true});
        scoreStore.createIndex('time', 'time',  { unique: false });
        scoreStore.createIndex('value', 'value', { unique: false });

      };

      storageService.add = function(key, value) {
        var defer = $q.defer();

        openPromise.then(function(db) {
          var transaction = db.transaction([key], 'readwrite');

          var store = transaction.objectStore(key);
          var request = store.add(value);

          request.onsuccess = function() {
            defer.resolve();
          };

          request.onerror = function() {
            defer.reject();
          };
        });

        return defer.promise;
      };

      storageService.getAll = function(key) {
        var defer = $q.defer();

        openPromise.then(function(db) {
          var results = [];
          db.transaction([key], 'readonly').objectStore(key).openCursor().onsuccess = function(e) {
            var cursor = e.target.result;
            if(cursor) {
              results.push(cursor.value);
              cursor.continue();
            } else {
              defer.resolve(results);
            }
          };
        });

        return defer.promise;
      };

      storageService.getAllSorted = function(key, index, direction, limit) {
        var defer = $q.defer();

        direction = direction || 'next';

        openPromise.then(function(db) {
          var results = [];
          db.transaction([key], 'readonly').objectStore(key).index(index).openCursor(null, direction).onsuccess = function(e) {
            var cursor = e.target.result;
            if(cursor && !(limit && limit - 1 < results.length)) {
              results.push(cursor.value);
              cursor.continue();
            } else {
              defer.resolve(results);
            }
          };
        });

        return defer.promise;
      };
    } else {
      var orderBy = $filter('orderBy');

      storageService.add = function(key, value) {
        var defer = $q.defer();
        storageService.getAll(key).then(function(items){
          items = items || [];
          items.push(value);
          console.log(items);
          window.localStorage.setItem(key, JSON.stringify(items));
          defer.resolve();
        });
        

        return defer.promise;
      };
      storageService.getAll = function(key) {
        var defer = $q.defer();

        defer.resolve(JSON.parse(window.localStorage.getItem(key)));

        return defer.promise;
      };
      storageService.getAllSorted = function(key, index, direction, limit) {
        var defer = $q.defer();

        var predicate = direction === 'prev' ? '+' : '-';
        storageService.getAll(key).then(function(items) {
          var sorted = orderBy(items, predicate + index, false);
          defer.resolve(sorted.slice(0, limit));
        });

        return defer.promise;
      };
    }


    return storageService;
});