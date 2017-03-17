(function() {
  'use strict';

  angular
    .module('beyondEercise01')
    .run(runBlock);

  /** @ngInject */
  function runBlock(obLazytubeConfig) {
    //Change default player size
    obLazytubeConfig.width = 800;
    obLazytubeConfig.height = 600;

    //Disable related videos
    obLazytubeConfig.urlParams.rel = 0;

    //Disable responsive player
    obLazytubeConfig.responsive = true;



  }

})();
