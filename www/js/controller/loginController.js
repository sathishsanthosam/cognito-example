'use strict';

angular.module('cognito')
    .controller('loginController',
    [
        '$rootScope',
        '$scope',
        '$state',
		'$ionicLoading',
        'loginService',

        function ($rootScope,
                  $scope,
                  $state,
				  $ionicLoading,
                  loginService) {
        	 $scope.data = {};
        	 $scope.login = function() {
				 $rootScope.$broadcast('loading:show');
        		 var ret = loginService.login($scope.data.username, $scope.data.password,function(success,result){
        			 if(success){
						 //$ionicLoading.hide();
        				 $state.go('survey');
						 $rootScope.$broadcast('loading:hide');
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