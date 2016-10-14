'use strict';

angular.module('cognito')
 .service('loginService', [
        '$rootScope','$state','cognitoService',

        function($rootScope,$state,cognitoService) {
        	
            this.login = function  login(username,password,callback) { 
            	
            	// Need to provide placeholder keys unless unauthorised user access is enabled for user pool
                AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

                var authenticationData = {
                  Username: username,
                  Password: password,
                };
                var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

                var userData = {
                  Username: username,
                  Pool: cognitoService.getUserPool()
                };

                console.log("Authenticating the user");
                var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
                console.log(AWS.config);
                cognitoUser.authenticateUser(authenticationDetails, {
                  onSuccess: function (result) {
                	  console.log(result);
                	  callback(true,result);
                    //callback.cognitoCallback(null, result);
                  },
                  onFailure: function (err) {
                	  console.log(err);
                	  callback(false,err);
                    //callback.cognitoCallback(err.message, null);
                  },
                });
            };


        }]);