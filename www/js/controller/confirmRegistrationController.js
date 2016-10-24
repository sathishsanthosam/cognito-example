'use strict';

angular.module('cognito')
    .controller('confirmRegistrationController',
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
             $scope.data.name = $state.params.username;
        	 $scope.onConfirm = function() {
                  $rootScope.$broadcast('loading:show');
        		 userRegistrationService.confirmUser($scope.data.name,$scope.data.confirmationCode,function(success,result){
        			 if(success){
        				  $rootScope.$broadcast('loading:hide');
        				 $state.go('survey'); 
        			 }else{
                          $rootScope.$broadcast('loading:hide');
        				 console.log(result);
        			 }
        		 });        	     
        	  };
        }
    ]);