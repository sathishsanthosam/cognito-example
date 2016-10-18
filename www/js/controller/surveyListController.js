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
                 $rootScope.$broadcast('loading:show');
                 dynamoDbService.readSurveyByUserId('',function(surveyData){
                     $scope.surveys = surveyData;
                     $rootScope.$broadcast('loading:hide');
                     //$scope.$apply();
                     console.log($scope.surveys[0].survey_type);
                }, function (error) {
                     console.log("Error while api call!!!");
                     $rootScope.$broadcast('loading:hide');
                 });
                $scope.add = function() {
                    $state.go('addSurvey');
                };
            };

            $scope.init();
             
        }
    ]);