'use strict';

angular.module('cognito')
 .service('dynamoDbService', [
        '$rootScope',
        '$http',

        function($rootScope,$http) {

            this.readData = function readData(userName) {
            	return $http.get('data/survey.json').success(function(data) {
            			return data;
            	});                
            };

            this.writeData = function writeData (postData) {
                console.log('postData',postData);
                return true;
            };


        }]);