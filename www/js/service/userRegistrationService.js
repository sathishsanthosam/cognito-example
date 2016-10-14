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
            	        Value : postData.email
            	    };
            	    var dataPhoneNumber = {
            	        Name : 'phone_number',
            	        Value :  postData.phone
            	    };
            	    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
            	    //var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

            	    attributeList.push(attributeEmail);
            	    //attributeList.push(attributePhoneNumber);

            	    userPool.signUp(postData.name, postData.password, attributeList, null, function(err, result){
            	        if (err) {
            	        	callback(false,err);
            	        }
            	        cognitoUser = result.user;
            	        console.log('user name is ' + cognitoUser.getUsername());
            	        callback(true,result);
            	    });
            };


        }]);