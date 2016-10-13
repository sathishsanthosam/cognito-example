'use strict';

angular.module('cognito')
 .service('dynamoDbService', [
        '$rootScope',
        '$http',

        function($rootScope,$http) {

            this.readData = function login(userName) {
            	return $http.get('data/survey.json').success(function(data) {
            			return data;
            	});                
            };

            this.writeData = function signup (userName,postData) {
                console.log('postData',postData);
                return true;
            };


        }]);