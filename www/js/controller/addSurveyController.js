'use strict';

angular.module('cognito')
    .controller('addSurveyController',
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
        		 dynamoDbService.writeSurvey($scope.data);        		 
        	     $state.go('survey');
        	  };
        }
    ]);