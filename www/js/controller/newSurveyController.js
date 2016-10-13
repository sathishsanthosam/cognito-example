'use strict';

angular.module('cognito')
    .controller('newSurveyController',
    [
        '$rootScope',
        '$scope',
        '$state',
        'dynamoDbService',

        function ($rootScope,
                  $scope,
                  $state,
                  dynamoDbService) {
        	 $scope.data = {};
        	 $scope.data.currentDate = new Date().toJSON();
        	 $scope.submit = function() {
        		 dynamoDbService.writeData($scope.data);        		 
        	     $state.go('survey');
        	  };
        }
    ]);