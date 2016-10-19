'use strict';

angular.module('cognito')
    .controller('resetPasswordController',
    [
        '$rootScope',
        '$scope',
        '$state',
        'profileService',
        'cognitoService',

        function ($rootScope,
                  $scope,
                  $state,
                  profileService,
                  cognitoService) {        	
        	
            $scope.init = function(){
                  $scope.data = {};                
                 $scope.data.name = cognitoService.getCurrentUser().username;
            };

            $scope.resetPassword = function resetPassword(){
                $rootScope.$broadcast('loading:show');
                profileService.resetPassword($scope.data,function(success,result){
        			 if(success){
        				 $state.go('survey');
                         $rootScope.$broadcast('loading:hide');						 
        			 }else{
        				 console.log(result);
                         $rootScope.$broadcast('loading:hide');
        			 }
        		 });
            }

            $scope.init();
        }
    ]);