'use strict';

angular.module('cognito')
 .service('cognitoService', [
        '$rootScope',

        function($rootScope) {

            this.login = function login(userName,password) {
            	console.log("LOGIN user: " + userName + " - PW: " + password);
                return true;
            };

            this.signup = function signup (postData) {
                console.log('postData',postData);
                return true;
            };


        }]);