'use strict';

angular.module('cognito')
    .controller('loginController',
    [
        '$rootScope',
        '$scope',
        '$state',
        'cognitoService',

        function ($rootScope,
                  $scope,
                  $state,
                  cognitoService) {
        	 $scope.data = {};
        	 $scope.login = function() {
        		 var ret = cognitoService.login($scope.data.username, $scope.data.password);        		 
        	     $state.go('survey');
        	  };
        	  $scope.signUp = function() {
        		  $state.go('/signup');
        	  };
        }
    ]);