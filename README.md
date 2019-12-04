## About myDynamoDB

MyDynamoDB demonstrates using dynamoDB to save users that you select to be part of My Team. The users are picked from git hub.

The main purpose is to demonstrate a react app that uses API gateway, lambda functions, and a dynamoDB database.

The front end is in react. I started with a react project from Brad Traversy's tutorial which you can find at udemy. Then I added a lot of new code. I liked brad's tutorial because it got you to a fun react app quickly.

## myDynamoDB API

Originally I was going to write my own RESTful service to connect to dynamoDB.

After discussing this with some developers they suggested I try a lambda function instead. I found a boiler plate for dynamoDB when setting up my lambda function. It has only one header entry `'Content-Type': 'application/json'`. If you want CORS you need to add following headers to your lambda function.

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, 
    Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',

Still even after this is it did not work. Most browsers send out an OPTIONS request to test CORS so your server code has to return success for OPTIONS. Then in my react app I had to add one last header as follows.
`headers: {Accept: '*/*',}`

In this app I use POST with a JSON body for all dynamoDB methods. The following JSON object is an example for dynamo.putItem.

    {
      myBody: {
        TableName: TableName,
        Item: {
          team_id: team_id,
          team_name: team_name,
          team_data: team_data,
        },
        ReturnConsumedCapacity: 'TOTAL',
      },
      myMethod: 'putItem',
    },

The API uses POST for security reasons because the query strings in a URL can be logged on the server. Plus it is nice to use a JSON body for all requests since it is easy to convert your class, data, etc to a JSON string. myMethod defines what dynamoDB function to call.

## Setting up dynamoDB locally
Before provisioning at AWS you might want to run a development version of dynamoDB. This way you can debug all your code locally for free. [Downloading And Running Instructions at AWS](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

The following instructions are for a mac. Read the documentation above for other systems.

1. First install AWS command line interface using the following command.

       pip install awscli
    
2. Configure aws cli by typing the following command.

       aws configure
    
3. Enter a fake access key and secret access key and choose none for the default region and none for the default output format.

       AWS Access Key ID: fakeMyKeyId
       AWS Secret Access Key: fakeSecretAccessKey
       Default region name: none
       Default output format: none

4. Download the downloadable dynamoDB zip file from the link above and unzip to a folder called

       /Users/YourUserName/dynamo

5. Log into your terminal and navigate to the dynamo folder you just created. Run the following command to get the database started.

       java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

6. If successful you should have something like this.

       Initializing DynamoDB Local with the following configuration:
       Port: 8000
       InMemory: false
       DbPath: null
       SharedDb: true
       shouldDelayTransientStatuses: false
       CorsParams: *

7. Downloadable dynamoDB commands always require the following endpoint added `--endpoint-url http://localhost:8000`. They will not work without this. For example the following command will list the tables in the database. Since we just set up a new database there will not be any tables.

       aws dynamodb list-tables --endpoint-url http://localhost:8000

8. The following command creates a table named Music. The partition key is Artist, and the sort key is SongTitle.

       aws dynamodb create-table \ --table-name Music \
       --attribute-definitions \ AttributeName=Artist,AttributeType=S \
       AttributeName=SongTitle,AttributeType=S \ --key-schema
       AttributeName=Artist,KeyType=HASH
       AttributeName=SongTitle,KeyType=RANGE \ --provisioned-throughput
       ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url
       http://localhost:8000

9. Use the following reference for all the command available  [dynamoDB CLI reference](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html)
 
