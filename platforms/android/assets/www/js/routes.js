angular.module('main.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('add', {
      url: "/add",
      views: {
        'menuContent' :{
          templateUrl: "add.html"
        }
      }
    })
    .state('view', {
      url: "/view",
      views: {
        'menuContent' :{
          templateUrl: "view.html"
        }
      }
    })

  $urlRouterProvider.otherwise("/view");

});