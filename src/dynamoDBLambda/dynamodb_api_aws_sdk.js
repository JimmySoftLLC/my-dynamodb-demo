console.log('Loading function');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
    region: 'us-east-1'
});

// Create DynamoDB document client
var dynamo = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10'
});

/**
 * Demonstrates a simple HTTP endpoint using API Gateway.
 * 
 * I use POST with a request body for all methods.
 * myMethod is used to define the method.
 * I like to do this for security reasons because the query strings 
 * in URL can be logged on the server.
 * 
 * The following JSON object is an example for dynamo.putItem.
 * 
 *        {
 *          myBody: {
 *            TableName: TableName,
 *            Item: {
 *               team_id: team_id,
 *               team_name: team_name,
 *               team_data: team_data,
 *             },
 *             ReturnConsumedCapacity: 'TOTAL',
 *           },
 *          myMethod: 'putItem',
 *        }
 * 
 * I also had to add the following get is to work with CORS
 * 'Access-Control-Allow-Origin': '*',
 * 'Access-Control-Allow-Methods': "GET,HEAD,OPTIONS,POST,PUT",
 * 'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
 * 
 */
//https://www.mydynamodb.com
exports.handler = (event, context, callback) => {
    const done = (err, res) =>
        callback(null, {
            statusCode: err ? '400' : '200',
            body: err ? err.message : JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            },
        });

    const lowestTeamNumber = 10; // items 0 to 10 protected from writing, for the demo app
    switch (event.httpMethod) {
        case 'OPTIONS':
            const response = {
                statusCode: 200,
                body: 'CORS check passed safe to proceed',
            };
            done(null, response);
            break;
        case 'POST':
            var myEventBody = JSON.parse(event.body)
            switch (myEventBody.myMethod) {
                case 'deleteItem':
                    if (myEventBody.myBody.Key.team_id <= lowestTeamNumber) {
                        done(new Error(`The team number is not in a valid range.  `));
                    } else {
                        dynamo.delete(myEventBody.myBody, done);
                    }
                    break;
                case 'putItem':
                    if (myEventBody.myBody.Item.team_id <= lowestTeamNumber) {
                        done(new Error(`The team number is not in a valid range.  `));
                    } else {
                        dynamo.put(myEventBody.myBody, done);
                    }
                    break;
                case 'updateItem':
                    if (myEventBody.myBody.Item.team_id <= lowestTeamNumber) {
                        done(new Error(`The team number is not in a valid range.  `));
                    } else {
                        dynamo.update(myEventBody.myBody, done);
                    }
                    break;
                case 'getItem':
                    dynamo.get(myEventBody.myBody, done);
                    break;
                case 'scan':
                    dynamo.scan(myEventBody.myBody, done);
                    break;
                default:
                    done(new Error(`Unsupported method "${event.httpMethod}"`));
            }
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
