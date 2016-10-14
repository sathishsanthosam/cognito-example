'use strict';

angular.module('cognito')
    .controller('signupController',
    [
        '$rootScope',
        '$scope',
        '$state',
        'userRegistrationService',

        function ($rootScope,
                  $scope,
                  $state,
                  userRegistrationService) {
        	 $scope.data = {};
        	 $scope.signup = function() {
        		 userRegistrationService.signup($scope.data,function(success,result){
        			 if(success){
        				 console.log(result);
        				 $state.go('survey'); 
        			 }else{
        				 console.log(result);
        			 }
        		 });        	     
        	  };
        }
    ]);