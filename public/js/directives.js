app.directive('footer', function(){
    return{
        restrict: 'A',
        replace: true,
        templateUrl: "/js/directives/footer.html",
        controller: ['$scope', function($scope){
        }]
    }
});


app.directive('header', function(){
    return{
        restrict: 'A',
        replace: true,
        templateUrl: "/js/directives/header.html",
        controller: ['$scope', function($scope){
        }] 
    };
});

app.directive('experiment', function(){
    return{
        restrict: 'A',
        replace: true,
        templateUrl: '/js/directives/experiment.html',
        controller: 'ExperimentController'
    };
});


app.directive('experimentprac', function(){
    return{
        restrict: 'A',
        replace: true,
        templateUrl: '/js/directives/experiment-practice.html',
        controller: 'ExperimentController'
    };
});
