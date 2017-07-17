angular.module('roll20macromaker').factory('Authent',function($resource){
  return $resource('/macromaker');
});
