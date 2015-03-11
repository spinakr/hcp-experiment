angular.module('hcp-experiment.controllers', [])
.controller('MainController', function($scope, $cookies,$http){
    
    $http.get("api/tests")
    .success(function(data){
        $scope.tests = data;
        console.log("Fetched data: %o", data);
    })
    .error(function(data){
        console.log("Error: %o", data)
    });


})
.controller('FormController', function($scope,$http){
    $scope.formData = {};
    
    $scope.createTest = function() {
    $http.post('/api/tests', $scope.formData)
        .success(function(data) {
            $scope.formData = {}; 
            $scope.tests = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };



    $scope.processForm = function (){
        alert('processed!');
    }
})
.controller('ExperimentController', function($scope){

});
