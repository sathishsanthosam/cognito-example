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
                cognitoUser.authenticateUser(authenticationDetails, {
                  onSuccess: function (result) {  
                    $rootScope.userInfo = {};
                    $rootScope.userInfo.userName = username;         	  
                    cognitoService.addCognitoCredentials(result.idToken.jwtToken);
                    callback(true,result);
                  },
                  onFailure: function (err) {
                	  console.log(err);
                	  callback(false,err);                    
                  },
                });
            };


        }]);