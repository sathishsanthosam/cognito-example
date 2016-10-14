'use strict';

angular.module('cognito')
 .service('cognitoService', [
        '$rootScope','$state',

        function($rootScope,$state) {
        	
        	AWS.config.region = 'us-west-2'; //This is required to derive the endpoint
        	AWSCognito.config.region = 'us-west-2'; //This is required to derive the endpoint        	
        	var _IDENTITY_POOL_ID = "us-west-2:37cd0372-0ab6-4372-ba42-017c0c9da914";
        	var _USER_POOL_ID = " us-west-2_gnuBniLHj";
        	var _CLIENT_ID = "39e67f5peolbhs3r1nr8m7rnrq";
        	var _POOL_DATA = {
        			    UserPoolId: _USER_POOL_ID,
        			    ClientId: _CLIENT_ID
        			  };        	 
        	 AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        	        IdentityPoolId: _IDENTITY_POOL_ID
        	  });
        	
        	this.getUserPool = function getUserPool() {
        	    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(_POOL_DATA);
        	};      	
        	

            this.login = function login(userName,password) {
            	console.log("LOGIN user: " + userName + " - PW: " + password);
                return true;
            };

            this.signup = function signup (postData) {            	
                 
            	    var userPool = this.getUserPool();
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
            	        	 console.log('Error ' + err);
            	            return;
            	        }
            	        cognitoUser = result.user;
            	        console.log('user name is ' + cognitoUser.getUsername());
            	        $state.go('survey');
            	    });
            };


        }]);