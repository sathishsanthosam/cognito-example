'use strict';

angular.module('cognito')
    .controller('userRegistrationController',
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
        	 $scope.onRegister = function() {
        		 userRegistrationService.onRegister($scope.data,function(success,result){
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