'use strict';

angular.module('cognito')
 .service('userRegistrationService', [
        '$rootScope','$state','cognitoService',

        function($rootScope,$state,cognitoService) {
        	
            this.signup = function signup (postData,callback) {            	
                 
            	    var userPool = cognitoService.getUserPool();
            	    var cognitoUser;

            	    var attributeList = [];
            	    
            	    var dataEmail = {
            	        Name : 'email',
            	        Value : 'sathish.santhosam@gmail.com'
            	    };
            	    var dataPhoneNumber = {
            	        Name : 'phone_number',
            	        Value : '1234567890'
            	    };
            	    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
            	    //var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

            	    attributeList.push(attributeEmail);
            	    //attributeList.push(attributePhoneNumber);

            	    userPool.signUp(postData.username, postData.password, attributeList, null, function(err, result){
            	        if (err) {
            	        	callback(false,err);
            	        }
            	        cognitoUser = result.user;
            	        console.log('user name is ' + cognitoUser.getUsername());
            	        callback(true,result);
            	    });
            };


        }]);