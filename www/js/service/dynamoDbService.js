'use strict';

angular.module('cognito')
 .service('dynamoDbService', [
        '$rootScope',
        '$http',

        function($rootScope,$http) {

            this.readSurveyByUserId = function readSurveyByUserId(userName,callback) {
                 var params = {
                TableName: 'survey'                
                };
                var docClient = new AWS.DynamoDB.DocumentClient();
                docClient.scan(params, onQuery);

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
                        user_id: {S: 'sathish.santhosam@gmail.com'},
                        survey_creation_date: {S: postData.currentDate},
                        survey_type: {S: postData.type},
                        survey_data : {S : postData.answer},
                        survey_id: {S : '2'}
                    }
                };
                console.log('item params',itemParams);
                DDB.putItem(itemParams, function (result) {
                    console.log(result);
                });
            };


        }]);