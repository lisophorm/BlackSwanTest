angular
  .module('beyondEercise01').service('searchResults', function () {
  var results = [];
  var query = "";
  var scrollPos = 0;

  var saveSearch = function (newObj) {
    results = newObj;
  };

  var findDetails = function (videoID) {
    for (var i = 0; i < results.length; i++) {
      if (results[i].id == videoID) {
        return results[i];
      }
    }
    return false;
  }

  var getSearch = function () {
    return results;
  };

  var clearQuery = function () {
    query = false;
  }


  var setQuery = function (newquery) {
    query = newquery;
  }

  var getQuery = function () {
    return query;
  }

  var setScroll = function (newscroll) {
    scrollPos = newscroll;
  }

  var getScroll = function () {
    return scrollPos;
  }

  return {
    saveSearch: saveSearch,
    getSearch: getSearch,
    findDetails: findDetails,
    clearQuery: clearQuery,
    setQuery: setQuery,
    getQuery: getQuery,
    setScroll: setScroll,
    getScroll: getScroll
  };

});
