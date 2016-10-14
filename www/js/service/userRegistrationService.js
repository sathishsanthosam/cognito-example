'use strict';

angular.module('cognito')
 .service('userRegistrationService', [
        '$rootScope','$state','cognitoService',

        function($rootScope,$state,cognitoService) {
        	
            this.onRegister = function onRegister (userRegistrationData,callback) {            	
                 
            	    var userPool = cognitoService.getUserPool();
            	    var cognitoUser;

            	    var attributeList = [];
            	    
            	    var dataEmail = {
            	        Name : 'email',
            	        Value : userRegistrationData.email
            	    };
            	    var dataPhoneNumber = {
            	        Name : 'phone_number',
            	        Value :  userRegistrationData.phone
            	    };
            	    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
            	    var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

            	    attributeList.push(attributeEmail);
            	    attributeList.push(attributePhoneNumber);

            	    userPool.signUp(userRegistrationData.name, userRegistrationData.password, attributeList, null, function(err, result){
            	        if (err) {
            	        	callback(false,err);
            	        }
            	        cognitoUser = result.user;
            	        console.log('user name is ' + cognitoUser.getUsername());
            	        callback(true,result);
            	    });
            };


        }]);