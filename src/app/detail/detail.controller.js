(function () {
  'use strict';

  angular
    .module('BlackSwanExercise01')
    .controller('DetailController', DetailController);

  /** @ngInject */
  function DetailController($mdDialog, $rootScope, $stateParams, searchResults, $state, GitHubFeed, Preloader) {
    var vm = this;

    $rootScope.bigLoading = true;
    vm.issueState = "";

    GitHubFeed.getIssues($stateParams.username, $stateParams.reponame).then(function (res) {
      vm.loadInProgress = false;
      vm.issues = res;
      console.log('single video', res);
      Preloader.hide(function () {
        $rootScope.bigLoading = false;
      });

    }, function (x) {
      Preloader.hide();
      showError(x);

    });


    vm.back = function () {
      $rootScope.bigLoading = true;
      Preloader.show(function () {
        $state.go("home", {"backToSearch": true});
      });
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
