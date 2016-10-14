'use strict';

angular.module('cognito')
    .controller('loginController',
    [
        '$rootScope',
        '$scope',
        '$state',
        'loginService',

        function ($rootScope,
                  $scope,
                  $state,
                  loginService) {
        	 $scope.data = {};
        	 $scope.login = function() {
        		 var ret = loginService.login($scope.data.username, $scope.data.password,function(success,result){
        			 if(success){
        				 console.log(result);
        				 $state.go('survey'); 
        			 }else{
        				 console.log(result);
        			 }
        		 });    		 
        	     //$state.go('survey');
        	  };
        	  $scope.signup = function() {
        		  $state.go('userRegistration');
        	  };
        }
    ]);