(function() {
  'use strict';

  angular
    .module('beyondEercise01')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        params: {
          backToSearch: null,
        },
        templateUrl: 'app/main/main.html',
        controller: 'MasterController',
        controllerAs: 'vm'
      })
      .state('detail', {
      url: '/video/:videoID',
      templateUrl: 'app/detail/detail.html',
      controller: 'DetailController',
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
  }

})();
