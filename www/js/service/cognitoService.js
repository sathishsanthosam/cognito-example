'use strict';

angular.module('cognito')
 .service('cognitoService', [
        '$rootScope','$state','$http',

        function($rootScope,$state,$http) {
        	
        	
			var POOL_DATA = {};
			var conf = {};   	
        	$http.get('conf/conf.yaml').success(function(data) {
                 conf = jsyaml.load(data);
				 AWS.config.region =conf.REGION;
        		 AWSCognito.config.region = conf.REGION;
				 POOL_DATA = {
        			    UserPoolId: conf.USER_POOL_ID,
        			    ClientId: conf.CLIENT_ID
						};        	 
				AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
						IdentityPoolId: conf.IDENTITY_POOL_ID
				});
                     
            });   
        	
        	this.getUserPool = function getUserPool() {
        	    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(POOL_DATA);
        	};  
        }]);