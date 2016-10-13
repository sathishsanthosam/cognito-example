'use strict';

angular.module('cognito')
    .controller('signupController',
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
        	 $scope.signup = function() {
        		 var ret = cognitoService.signup($scope.data);        		 
        	     $state.go('survey');
        	  };
        }
    ]);