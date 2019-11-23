console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));

  const done = (err, res) =>
    callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      },
    });

  switch (event.httpMethod) {
    case 'GET':
      console.log(event.queryStringParameters);
      dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
      break;
    case 'POST':
      var myEventBody = JSON.parse(event.body);
      switch (myEventBody.myMethod) {
        case 'deleteItem':
          dynamo.deleteItem(myEventBody.myBody, done);
          break;
        case 'putItem':
          dynamo.putItem(myEventBody.myBody, done);
          break;
        case 'updateItem':
          dynamo.updateItem(JSON.parse(event.body), done);
          break;
        default:
          done(new Error(`Unsupported method "${event.httpMethod}"`));
      }
      break;
    default:
      done(new Error(`Unsupported method "${event.httpMethod}"`));
  }
};
