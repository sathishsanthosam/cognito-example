'use strict';

angular.module('cognito')
 .service('dynamoDbService', [
        '$rootScope',
        '$http',

        function($rootScope,$http) {

            this.readSurveyByUserId = function readSurveyByUserId(userName,callback) {
                 var params = {
                    TableName: 'survey',
                    IndexName: "user_id-index",
                    KeyConditionExpression: "user_id = :user_id",
                    ExpressionAttributeValues: {
                        ":user_id": AWS.config.credentials.params.IdentityId
                    }                
                };
                var docClient = new AWS.DynamoDB.DocumentClient();
                docClient.query(params, onQuery);

                function onQuery(err, data) {
                    if (err) {
                        console.error("Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        // print all the movies                        
                        callback(data.Items);
                }                
             };
            };

            this.writeSurvey = function writeSurvey(postData) {
                var DDB = new AWS.DynamoDB({
                params: {TableName: 'survey'}
                });

                // Write the item to the table
                var itemParams =
                {
                    Item: {
                        user_id: {S: AWS.config.credentials.params.IdentityId},
                        survey_creation_date: {S: postData.currentDate},
                        survey_type: {S: postData.type},
                        survey_data : {S : postData.answer},
                        survey_id: {S : this.getUUId()}
                    }
                };
                console.log('item params',itemParams);
                DDB.putItem(itemParams, function (result) {
                    console.log(result);
                });
            };

            this.getUUId = function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random()*16)%16 | 0;
                    d = Math.floor(d/16);
                    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                });
                return uuid;
            };


        }]);