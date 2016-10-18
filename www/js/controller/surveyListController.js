'use strict';

angular.module('cognito')
    .controller('surveyListController',
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
                     console.log($scope.surveys[0].survey_type);
                });
                $scope.add = function() {
                    $state.go('addSurvey');
                };
            };

            $scope.init();
             
        }
    ]);