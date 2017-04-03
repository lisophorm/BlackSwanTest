
(function () {
  'use strict';

  angular
    .module('BlackSwanExercise01')
    .factory('Preloader', Preloader);

  function Preloader($timeout, $rootScope) {

    var safetyTimeout = 0;

    var show = function (func) {
      $rootScope.bigLoading = true;
      safetyTimeout = $timeout(hide, 9000, true);

      if (typeof func !== 'undefined') {
        $timeout(func, 300, true);

      }
    };

    var hide = function (func) {
      $timeout.cancel(safetyTimeout);
      $timeout(function () {
        $rootScope.bigLoading = false;
      }, 300, true);
      if (typeof func !== 'undefined') {
        $timeout(func, 300, true);

      }
    };


    var service = {
      show: show,
      hide: hide
    };

    return service;
  }
})();
