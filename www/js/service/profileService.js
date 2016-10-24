'use strict';

angular.module('cognito')
 .service('profileService', [
        '$rootScope',

        function($rootScope) {        	
        	
			
			var cognitoUser;  	
        	

			this.setCognitoUser = function setCognitoUser(user){
				cognitoUser = user;
			};

			this.getUserAttributes = function getUserAttributes(callback){
				cognitoUser.getUserAttributes(function(err, result) {
					if (err) {
						alert(err);
						return;
					}
					callback(result);
				});
			};

			this.updateUserAttributes = function updateUserAttributes(userProfile,callback){
				var attributeList = [];
				var dataEmail = {
					Name : 'email',
					Value : userProfile.email
				};
				var dataPhoneNumber = {
					Name : 'phone_number',
					Value :  userProfile.phone_number
				};
				var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
				var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

				attributeList.push(attributeEmail);
				attributeList.push(attributePhoneNumber);

				cognitoUser.updateAttributes(attributeList, function(err, result) {
					if (err) {
						callback(false, err);
					}
					callback(true, result);
				});
			};

			this.resetPassword = function resetPassword(userData,callback){
				cognitoUser.changePassword(userData.oldPassword, userData.newPassword,function(err, result) {
					if (err) {
						alert(err);
						return;
					}
					callback(result);
				});
			};

			this.logout = function logout(){
				cognitoUser.signOut();
				console.log('User has been Logged off.');
			};

			
        }]);