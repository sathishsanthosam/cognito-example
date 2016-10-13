'use strict';

angular.module('cognito')
    .controller('surveyController',
    [
        '$rootScope',
        '$scope',
        '$state',
        'dynamoDbService',

        function ($rootScope,
                  $scope,
                  $state,
                  dynamoDbService) {
        	 dynamoDbService.readData("").then(function(sucess){
        		 $scope.datas = sucess.data.survey;
        	 });        	 
        }
    ]);