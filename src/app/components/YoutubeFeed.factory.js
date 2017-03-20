(function () {
  'use strict';

  angular
    .module('beyondEercise01')
    .factory('YoutubeFeed', YoutubeFeed);

  function YoutubeFeed($http, $q, configVar, $filter) {

    var nextPage = false;
    var prevPage = false;
    var currentPage = false;
    var currentQuery = false;

    var searchYoutubeFeed = function (query, direction) {
      var deferred = $q.defer();
      if (query != currentQuery) {
        console.log("NEW SEARCH");
        nextPage = false;
        prevPage = false;
        currentPage = false;
        currentQuery = query;
      }

      var url = configVar.url + '/search/?q=' + query;

      if (direction !== undefined) {
        console.log('dieection parameter');
        if (direction > 0 && nextPage) {
          currentPage = nextPage;
          console.log('go next');
          url += "&pageToken=" + nextPage;
        } else if (direction < 0 && prevPage) {
          console.log('go prev');
          currentPage = prevPage;
          url += "&pageToken=" + prevPage;
        } else if (direction == 0 && currentPage) {
          console.log('back to search results');
          url += "&pageToken=" + currentPage;
        }
      } else {
        console.log('no dieection parameter');
      }
      console.log('prevPage', prevPage);
      console.log('currentPage', currentPage);
      console.log('nextPage', nextPage);


      url += parseParams(configVar.APIparams);

      console.log('url', url);

      $http.get(url)
        .then(function (response) {
          console.log('raw response', response);
          if (typeof response.data.nextPageToken !== 'undefined') {
            console.log('next page present');
            nextPage = response.data.nextPageToken;
          } else {
            console.log('NO next page present');
            nextPage = false;
          }
          if (typeof response.data.prevPageToken !== 'undefined') {
            console.log('prev page present');
            prevPage = response.data.prevPageToken;
          } else {
            console.log('NO prev page present');
            prevPage = false;
          }


          deferred.resolve(parseData(response.data.items));
        }, function (x) {
          deferred.reject(x);
        });

      return deferred.promise;
    };

    var hasNext = function () {
      return nextPage;
    };

    var hasPrev = function () {
      return prevPage;
    };

    var videoInfo = function (videoID) {
      var deferred = $q.defer();

      var url = configVar.url + '/videos?id=' + videoID;
      url += parseParams(configVar.APIparams);


      $http.get(url)
        .then(function (response) {
          var currentVideo = parseData(response.data.items);
          deferred.resolve(currentVideo[0]);
        }, function (x) {
          deferred.reject(x);
        });

      return deferred.promise;
    };


    function parseData(data) {
      console.log("parsedata", data);
      var videos = [];

      if (data.length > 0) {

        data.forEach(function (item) {
          var video = {


            channelId: item.snippet.channelId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: $filter('date')(item.snippet.publishedAt, 'MMM d, yyyy'),
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
          if (item.kind == "youtube#searchResult") {
            video.id = item.id.videoId;
          } else {
            video.id = item.id;

          }
          videos.push(video);
        });
      }
      return videos;
    }

    var getCurrentQuery = function () {
      return currentQuery;
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
      searchYoutubeFeed: searchYoutubeFeed,
      videoInfo: videoInfo,
      hasNext: hasNext,
      hasPrev: hasPrev,
      getCurrentQuery: getCurrentQuery
    };

    return service;
  }
})();
