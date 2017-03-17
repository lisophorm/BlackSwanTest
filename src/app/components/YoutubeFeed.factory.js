// stores and manages the current search result from the twitter api

(function () {
  'use strict';

  angular
    .module('beyondEercise01')
    .factory('YoutubeFeed', YoutubeFeed);

  function YoutubeFeed($http, $q,configVar,$filter) {

    var tweetList = [];

    var searchYoutubeFeed = function (query) {
      var deferred = $q.defer();

      var url = configVar.url + '/search/?q=' + query;
      url += parseParams(configVar.APIparams);

      console.log('url',url);

      $http.get(url)
        .then(function (response) {
          deferred.resolve(parseData(response.data.items));
        }, function (x) {
          deferred.reject(x);
        });

      return deferred.promise;
    };


    function parseData(data) {
      console.log("parsedata",data);
      var videos = [];

      if (data.length > 0) {

        data.forEach(function(item) {
          console.log(item);
          var video = {
            id: item.id.videoId,
            channelId: item.snippet.channelId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt:$filter('date')(item.snippet.publishedAt,'MMM d, yyyy'),
            images: {
              default: {
                url: item.snippet.thumbnails.default.url
              },
              medium: {
                url: item.snippet.thumbnails.medium.url
              },
              high: {
                url: item.snippet.thumbnails.high.url
              }
            }
          };

          videos.push(video);
        });
      }
      return videos;
    }

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
      searchYoutubeFeed: searchYoutubeFeed
    };

    return service;
  }
})();
