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

			this.getCurrentUser = function getCurrentUser() {
        	    return this.getUserPool().getCurrentUser();;
        	};  

			this.getIdToken = function getIdToken(callback) {
        	    if (callback == null) {
					throw("callback in getIdToken is null...returning");
				}
				var currentUser = this.getCurrentUser();
				console.log('Current User', currentUser);
				this.getCurrentUser().getSession(function (err, session) {
				if (err) {
					console.log("Can't set the credentials:" + err);
					callback(null);
				}
				else {
					if (session.isValid()) {
						callback(session.getIdToken().getJwtToken());
					} else {
					console.log("Got the id token, but the session isn't valid");
					}
				}
				});
        	}; 
			
			this.addCognitoCredentials = function addCognitoCredentials(idToken){				
				var params = this.getCognitoParametersForIdConsolidation(idToken);

				AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);
				AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials(params);
			};


			this.getCognitoParametersForIdConsolidation = function getCognitoParametersForIdConsolidation(idToken){				
				var url = 'cognito-idp.' + conf.REGION.toLowerCase() + '.amazonaws.com/' + conf.USER_POOL_ID;
				var logins = [];
				logins[url] = idToken;				
				var params = {
					IdentityPoolId: conf.IDENTITY_POOL_ID, /* required */
					Logins: logins
				};

    			return params;
			};

			
        }]);