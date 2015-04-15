angular.module('hcp-experiment.controllers', [])
.controller('MainController', function($scope, $cookies, $http){
    
    $http.get("api/useravg")
    .success(function(data){
        $scope.data = data;

        console.log("Fetched data: %o", data);
    })
    .error(function(data){
        console.log("Error: %o", data)
    });


})
.controller('FormController', function($cookies, $rootScope, $scope, $http){
    $rootScope.formData = {};

    $scope.occupations = ['Technology student', 'Non-technical student', 'Other'];

    //embed demosntration video
    (function(){var x=document.createElement('script'), s=document.getElementsByTagName('script')[0];x.async=true;x.src='http://static.wideo.co/js/embed/wideoembed.js';s.parentNode.insertBefore(x,s)})();

    $rootScope.formData.data = {};
    $rootScope.formData.data.calcTimes = [];
    $rootScope.formData.data.results = [];
    $rootScope.formData.hcp_id = $cookies.get("hcp-id");

    if(!$rootScope.formData.hcp_id){
        var id = Math.floor((1 + Math.random()) * 0x10000).toString(16) + Math.floor((1 + Math.random()) * 0x10000).toString(16);
        var now = new Date();
        $cookies.put("hcp-id", id, {expires: new Date(now.getFullYear(), now.getMonth()+6, now.getDate())})
        $rootScope.formData.hcp_id = id;
    }


    $scope.createData = function() {
    $http.post('/api/data', $scope.formData)
        .success(function(data) {
            $rootScope.formData = {}; 
            $scope.data = data;
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
.controller('ExperimentController', function($rootScope, $scope){



    $scope.respons = '';
    $scope.challenges = [];

    $scope.letters = "abcdefghijklmnopqrstuvwxyz";



    $scope.timing = +new Date(); 
    $scope.start = function(){
        $scope.timing = +new Date(); 
    }
    
    $scope.newChar = function (){
        var current = +new Date();
        $rootScope.formData.data.calcTimes.push((current - $scope.timing)/1000);   
        $scope.timing = current;

        if($scope.respons.substring($scope.respons.length-1)  == $scope.challenges.answer[$scope.respons.length-1] ){
            $rootScope.formData.data.results.push(1);
        }else{
            $rootScope.formData.data.results.push(0);
        }
    }


    $scope.range = function(n){
        return new Array(n);
    }
    $scope.mapping = function mapping(x){
        var letters = "abcdefghijklmnopqrstuvwxyz" ;
        return letters.search(x);

    }

    $scope.preventBackspace = function(e) {
        console.log("keydown");
        var evt = e || window.event;
        if (evt) {
            var keyCode = evt.charCode || evt.keyCode;
            if (keyCode === 8) {
                if (evt.preventDefault) {
                    evt.preventDefault();
                } else {
                    evt.returnValue = false;
                }
            }
        }
    }

    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    $scope.mappings = [];

    for(i=0; i<9; i++){
        $scope.mappings.push({
            letter: letters[i],
            digit: i+1
        });

//        var rand = Math.floor(Math.random()*letters.length);
//        $scope.mappings.push({
//            letter: letters[rand],
//            digit: Math.floor(Math.random()*10)+1
//        });
//        letters.remove(rand);
    }

    $scope.mapping = function(x){
        for(i=0; i < $scope.mappings.length; i++){
            if($scope.mappings[i].letter == x){
                return $scope.mappings[i].digit;
            }
        }
    }
    $scope.humanFunc = function(ch){
        var j = ($scope.mapping(ch[10]) + $scope.mapping(ch[11]))%10;
        return ($scope.mapping(ch[j]) + $scope.mapping(ch[12]) + $scope.mapping(ch[13]))%10;
    }

    $scope.randomChallenge =function(length){
        var respons = {
            challenges: [],
            answer: []
        };

        for(j=0; j<length; j++){
            var ch = [];

            for (i=0; i<14; i++){
                ch.push($scope.mappings[Math.floor(Math.random()*9)].letter);
            }
            respons.challenges.push(ch);
            respons.answer.push($scope.humanFunc(ch));
        }
        return respons;
    }

    $scope.challenges = $scope.randomChallenge(10);


});


