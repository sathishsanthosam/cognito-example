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
                 $rootScope.$broadcast('loading:show');
                 dynamoDbService.readSurveyByUserId('',function(surveyData){
                     $scope.surveys = surveyData;
                     $rootScope.$broadcast('loading:hide');
                });
                $scope.add = function() {
                    $state.go('newSurvey');
                };
            };

            $scope.init();
             
        }
    ]);