angular
  .module('beyondEercise01').service('searchResults', function () {
  var results = [];

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

  return {
    saveSearch: saveSearch,
    getSearch: getSearch,
    findDetails: findDetails
  };

});
