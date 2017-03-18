
(function () {
  'use strict';

  angular
    .module('beyondEercise01')
    .controller('DetailController', DetailController);

  /** @ngInject */
  function DetailController($timeout, $http, $mdDialog, $rootScope, $stateParams, $mdMedia, $mdSidenav, $mdToast, searchResults, $state, YoutubeFeed) {
    var vm = this;

    $rootScope.bigLoading = true;


    vm.videoID = $stateParams.videoID;
    YoutubeFeed.videoInfo(vm.videoID).then(function (res) {
      vm.loadInProgress = false;

      vm.video = res;
      console.log('single video', res);
      $timeout(function () {
        $rootScope.bigLoading = false;
      }, 250, true);

    }, function (x) {
      $rootScope.bigLoading = false;
      showError(x);

    });


    vm.videoWidth = "100%";

    vm.back = function () {
      $rootScope.bigLoading = true;

      $timeout(function () {
        $state.go("home", {"backToSearch": true});
      }, 250, true);


    };

    function showError(x) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Error')
          .textContent(JSON.stringify(x.data))
          .ariaLabel('Alert error')
          .ok('Got it!')
        //.targetEvent(ev)
      );
    }

  }
})();
