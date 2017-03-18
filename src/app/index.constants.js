/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('beyondEercise01')
    .constant('configVar', {
      url: 'https://www.googleapis.com/youtube/v3',
      APIparams: {
        key: 'AIzaSyBi6WSVs3D7_93pZQxXAMYmSRPZcAncX6I',
        maxResults: 20,
        part: 'snippet',
        type: 'video'
      }
    });


})();
