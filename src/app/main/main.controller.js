(function () {
  'use strict';

  angular
    .module('beyondEercise01')
    .controller('MasterController', MasterController);

  /** @ngInject */
  function MasterController($timeout, $http, $rootScope, $mdDialog, YoutubeFeed, $scope, $mdMedia, $mdSidenav, $mdToast, $state, searchResults, $stateParams) {
    var vm = this;

    $scope.$mdMedia = $mdMedia;


    vm.loadInProgress = false;

    // current search results
    vm.videos = [];

    vm.currentQuery = "";
    vm.paginatorVisible = false;
    vm.canPrev = false;
    vm.canNext = false;


    // search for new videos

    vm.searchYoutube = function (searchString, direction) {

      vm.loadInProgress = true;
      $rootScope.bigLoading = true;

      vm.currentQuery = searchString;
      YoutubeFeed.searchYoutubeFeed(searchString, direction)
        .then(function (response) {
          checkPagination();
          vm.searchString = "";
          // checks if any of the results have been selected previously
          console.log('resp in controler', response);
          vm.loadInProgress = false;
          vm.videos = response;
          searchResults.setScroll(0);
          $timeout(function () {
            console.log('RESET SCROLL');

            $("#scrollArea").scrollTop(0);
            $rootScope.bigLoading = false;

          }, 300, true);

        }, function (x) {
          $rootScope.bigLoading = false;
          showError(x);

        });
    }

    function backToResults() {

      vm.loadInProgress = true;
      vm.currentQuery = YoutubeFeed.getCurrentQuery();
      YoutubeFeed.searchYoutubeFeed(vm.currentQuery, 0)
        .then(function (response) {
          checkPagination();
          vm.searchString = "";
          // checks if any of the results have been selected previously
          console.log('resp in controler', response);
          vm.loadInProgress = false;
          vm.videos = response;
          var scrollPos = searchResults.getScroll();

          $timeout(function () {
            console.log('GET scroll', scrollPos);

            $rootScope.bigLoading = false;

          }, 300, true);


        }, function (x) {
          $rootScope.bigLoading = false;
          showError(x);

        });
    }

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

    vm.search = function () {
      // I know this is not very raffinate...
      if (vm.searchString == "") {
        return false;
      }
      vm.searchYoutube(vm.searchString, true);
    }

    vm.gotoVideo = function (videoID) {
      var scrollPos = $("#scrollArea").scrollTop();
      searchResults.setScroll(scrollPos);
      console.log('scroll', scrollPos);
      console.log('goto vidoe', videoID);
      searchResults.saveSearch(vm.videos);
      $rootScope.bigLoading = true;
      $timeout(function () {
        $state.go("detail", {"videoID": videoID});
      }, 250, true);


    }

    vm.next = function () {
      vm.searchYoutube(vm.currentQuery, 1);
    }

    vm.prev = function () {
      vm.searchYoutube(vm.currentQuery, -1);
    }

    function checkPagination() {
      vm.canPrev = YoutubeFeed.hasPrev();
      vm.canNext = YoutubeFeed.hasNext();
    }

    if ($stateParams.backToSearch) {
      backToResults();
    } else {
      vm.searchYoutube("epicwin");

    }


  }
})();
