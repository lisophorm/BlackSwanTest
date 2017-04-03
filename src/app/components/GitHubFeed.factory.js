(function () {
  'use strict';

  angular
    .module('BlackSwanExercise01')
    .factory('GitHubFeed', GitHubFeed);

  function GitHubFeed($http, $q, configVar, $filter) {


    var search = function (query) {
      var deferred = $q.defer();


      var url = configVar.url + '/search/repositories?q=' + query;

      console.log('url', url);

      $http.get(url)
        .then(function (response) {
          console.log('raw response', response);
          deferred.resolve(response.data.items);
        }, function (x) {
          deferred.reject(x);
        });

      return deferred.promise;
    };

    var getIssues = function (username, reponame) {
      var deferred = $q.defer();


      var url = configVar.url + '/search/issues?q=repo:' + username + '/' + reponame;

      console.log('url', url);

      $http.get(url)
        .then(function (response) {
          console.log('issues raw response', response);
          deferred.resolve(response.data.items);
        }, function (x) {
          deferred.reject(x);
        });

      return deferred.promise;
    };


    function parseParams(obj) {
      var params = '';
      for (var p in obj) {
        if ((obj.hasOwnProperty(p)) && (obj[p] !== '')) {
          params += '&' + p + '=' + obj[p];
        }
      }
      return params;
    }

    var service = {
      getIssues: getIssues,
      search: search
    };

    return service;
  }
})();
