'use strict';

angular.module('cognito')
    .controller('profileController',
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
                 $rootScope.$broadcast('loading:show');
                 $scope.data.name = cognitoService.getCurrentUser().username;
                 profileService.getUserAttributes(function(result){
                    for (i = 0; i < result.length; i++) {
						$scope.data[result[i].getName()]  =  result[i].getValue();
					}
                     $rootScope.$broadcast('loading:hide');
                }, function (error) {
                     console.log("Error while api call!!!") ;
                     $rootScope.$broadcast('loading:hide');
                 });
            };

            $scope.updateProfile = function updateProfile(){
                $rootScope.$broadcast('loading:show');
                profileService.updateUserAttributes($scope.data,function(success,result){
        			 if(success){
        				 $state.go('survey');
                         $rootScope.$broadcast('loading:hide');						 
        			 }else{
        				 console.log(result);
                         $rootScope.$broadcast('loading:hide');
        			 }
        		 });
            };

             $scope.resetPassword = function() {
                    $state.go('resetPassword');
                };

            $scope.init();
        }
    ]);