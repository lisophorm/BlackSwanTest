(function () {
  'use strict';

  angular
    .module('beyondEercise01')
    .controller('MasterController', MasterController);

  /** @ngInject */
  function MasterController($timeout, $http, $mdDialog, YoutubeFeed,  $scope, $mdMedia, $mdSidenav, $mdToast,$state,searchResults) {
    var vm = this;

    $scope.$mdMedia = $mdMedia;


    // position of the tab 0=search 1=categories
    vm.tweetsType = 0;

    vm.loadInProgress = false;

    // current search results
    vm.videos = [];


    // search for new videos

    vm.searchYoutube = function (searchString, isHash) {

      vm.loadInProgress = true;
      YoutubeFeed.searchYoutubeFeed(searchString)
        .then(function (response) {
          vm.searchString = "";
          // checks if any of the results have been selected previously
          console.log('resp in controler', response);
          vm.loadInProgress = false;
          vm.videos=response;vm.videos

        }, function (x) {
          vm.loadInProgress = false;
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
        });
    }

    vm.search = function () {
      // I know this is not very raffinate...
      if (vm.searchString == "") {
        return false;
      }
      vm.searchYoutube(vm.hashtag + vm.searchString, true);
    }

    vm.gotoVideo=function(videoID) {
      console.log('goto vidoe',videoID);
      searchResults.saveSearch(vm.videos);
      $state.go("detail", { "videoID": videoID});

    }


    vm.searchYoutube("epicwin", true);

  }
})();
