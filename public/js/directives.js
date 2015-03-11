app.directive('footer', function(){
    return{
        restrict: 'A',
        replace: true,
        templateUrl: "/partials/footer.html",
        controller: ['$scope', function($scope){
        }]
    }
});


app.directive('header', function(){
    return{
        restrict: 'A',
        replace: true,
        templateUrl: "/partials/header.html",
    controller: ['$scope', function($scope){

    }] 
    };
});
