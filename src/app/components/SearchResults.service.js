angular
  .module('BlackSwanExercise01').service('searchResults', function () {
  var query = "";
  var scrollPos = 0;

  var clearQuery = function () {
    query = false;
  };


  var setQuery = function (newquery) {
    query = newquery;
  };

  var getQuery = function () {
    return query;
  };

  var setScroll = function (newscroll) {

    scrollPos = newscroll;
    // fixes lazyloat bug
    if (newscroll == 1) {
      scrollPos += 2;
    }
  };

  var getScroll = function () {
    return scrollPos;
  };

  return {
    clearQuery: clearQuery,
    setQuery: setQuery,
    getQuery: getQuery,
    setScroll: setScroll,
    getScroll: getScroll
  };

});
