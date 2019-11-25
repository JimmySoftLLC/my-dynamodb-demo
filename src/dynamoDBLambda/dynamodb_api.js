console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

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

exports.handler = (event, context, callback) => {
  const done = (err, res) =>
    callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':
          'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
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
      var myEventBody = JSON.parse(event.body);
      switch (myEventBody.myMethod) {
        case 'deleteItem':
          if (myEventBody.myBody.Key.team_id <= lowestTeamNumber) {
            done(new Error(`The team number is not in a valid range.  `));
          } else {
            dynamo.deleteItem(myEventBody.myBody, done);
          }
          break;
        case 'putItem':
          if (myEventBody.myBody.Item.team_id <= lowestTeamNumber) {
            done(new Error(`The team number is not in a valid range.  `));
          } else {
            dynamo.putItem(myEventBody.myBody, done);
          }
          break;
        case 'updateItem':
          if (myEventBody.myBody.Item.team_id <= lowestTeamNumber) {
            done(new Error(`The team number is not in a valid range.  `));
          } else {
            dynamo.updateItem(myEventBody.myBody, done);
          }
          break;
        case 'getItem':
          dynamo.getItem(myEventBody.myBody, done);
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
