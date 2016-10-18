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

                      function init(){                       
                         $scope.surveys = [];
                        dynamoDbService.readSurveyByUserId('',function(surveyData){
                                $scope.surveys = surveyData;   
                                //console.log(surveyData[0].survey_creation_date);                              
                        });                        
                        $scope.add = function() {
                            $state.go('newSurvey');
                        }; 
                    };

                    init();
             
        }
    ]);