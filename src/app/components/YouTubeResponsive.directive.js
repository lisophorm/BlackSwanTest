// intercepts the enter key inside an input field

angular
  .module('beyondEercise01').directive('youtubeResponsive', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      video_id: '=video-id'
    },
    template: '<label><a href="#" rel="tooltip" title="{{video_id}}" data-placement="right" ng-transclude></a></label>',
    link: function(scope, element, attrs) {
      if (scope.video_id) {
        element.addClass('tooltip-title');
      }
    },
  }
});
