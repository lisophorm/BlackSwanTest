(function () {
  'use strict';

  angular
    .module('BlackSwanExercise01')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        params: {
          backToSearch: null
        },
        templateUrl: 'app/main/main.html',
        controller: 'MasterController',
        controllerAs: 'vm'
      })
      .state('detail', {
        url: '/issues/:username/:reponame',
        templateUrl: 'app/detail/detail.html',
        controller: 'DetailController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
