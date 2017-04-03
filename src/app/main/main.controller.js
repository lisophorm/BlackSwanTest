(function () {
  'use strict';

  angular
    .module('BlackSwanExercise01')
    .controller('MasterController', MasterController);

  /** @ngInject */
  function MasterController($timeout, Preloader, $rootScope, $mdDialog, GitHubFeed, $scope, $mdMedia, $state, searchResults, $stateParams) {
    var vm = this;

    // media query for the Repo container
    $scope.$mdMedia = $mdMedia;

    vm.loadInProgress = false;

    // current search results
    vm.results = [];

    vm.currentQuery = "";


    // search for Repos

    vm.searchGitHub = function (searchString) {

      vm.loadInProgress = true;
      Preloader.show();
      vm.currentQuery = searchString;
      GitHubFeed.search(searchString)
        .then(function (response) {
          console.log('response', response);
          vm.loadInProgress = false;
          vm.results = response;
          searchResults.setScroll(0);
          searchResults.setQuery(searchString);

          $("#scrollArea").animate({scrollTop: 0}, 100);

          Preloader.hide();

        }, function (x) {
          console.log(x);

          Preloader.hide();
          showError(x);

        });
    };


    function backToResults() {

      vm.loadInProgress = true;
      vm.currentQuery = searchResults.getQuery();
      GitHubFeed.search(vm.currentQuery)
        .then(function (response) {
          vm.searchString = vm.currentQuery;
          console.log('resp in controler', response);
          vm.loadInProgress = false;
          vm.results = response;
          var scrollPos = searchResults.getScroll();

          console.log('GET scroll', scrollPos);

          Preloader.hide(function () {
            $("#scrollArea").animate({scrollTop: scrollPos}, 100);

          });

        }, function (x) {
          Preloader.hide();
          console.log(x);
          showError(x);
        });
    }

    function showError(x) {
      var errorString = x.statusText + "(" + x.status + ")";
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Error')
          .textContent(errorString)
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
      vm.searchGitHub(vm.searchString, true);
    };

    vm.gotoRepo = function (username, reponame) {
      var scrollPos = $("#scrollArea").scrollTop();
      searchResults.setScroll(scrollPos);
      Preloader.show(function () {
        $state.go("detail", {
          "username": username,
          "reponame": reponame
        });
      });
    };


    if ($stateParams.backToSearch) {
      backToResults();
    }


  }
})();
