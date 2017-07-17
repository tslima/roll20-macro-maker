angular.module('roll20macromaker',['ngRoute','ngResource'])
  .config(function ($routeProvider,$httpProvider){

  $httpProvider.interceptors.push('meuInterceptor');

  $routeProvider.when('/macromaker',{
    templateUrl: '/partials/macromaker.html'
    ,controller: 'MacroMakerController'
  });

  $routeProvider.when('/auth',{
    templateUrl:'partials/auth.html'
  });

  $routeProvider.otherwise({redirectTo: '/macromaker'});


});
