var app = angular.module('hcp-experiment', [
        'hcp-experiment.controllers',
        'ngAnimate',
        'ngCookies',
        'ui.router'
        ]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('form',{
            url: '/form',
            templateUrl: 'partials/form.html',
            controller: 'FormController'
        })
        .state('form.demo',{
            url: '/demo',
            templateUrl: 'partials/demo.html'
        })
        .state('form.profile',{
            url: '/profile',
            templateUrl: 'partials/form-profile.html',
        })
        .state('form.data',{
            url: '/data',
            templateUrl: 'partials/form-data.html',
        });
    $stateProvider
        .state('main',{
            url: '/',
            templateUrl: 'partials/main.html',
            controller: 'MainController'
        });

    $urlRouterProvider.otherwise('/');
}]);


