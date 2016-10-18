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

            $scope.init = function(){
                 $scope.surveys = [];
                 dynamoDbService.readSurveyByUserId('',function(surveyData){
                     $scope.surveys = surveyData;
                });
                $scope.add = function() {
                    $state.go('newSurvey');
                };
            };

            $scope.init();
             
        }
    ]);