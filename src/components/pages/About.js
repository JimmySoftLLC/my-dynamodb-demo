import React, { Fragment } from 'react';
import AlertDialog from '../../components/layout/AlertDialog';

const About = () => {
  return (
    <Fragment>
      <AlertDialog />
      <h2 className='page-top-margin'>Instructional video</h2>
      <div className="video-responsive">
        <iframe width="560" height="315" title="myFrame" src="https://www.youtube.com/embed/6VQAzkumQfA" frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
      <h2 >About myDynamoDB</h2>
      <p className='p'>
        MyDynamoDB is a react app that saves github user data to a database
        using API gateway, lambda functions, and a dynamoDB database. The user
        data comes from github using the github API.
      </p>
      <p className='p'>
        The front end is roughly based on a react project from Brad Traversy's
        tutorial which you can find at{' '}
        <a
          href='https://www.udemy.com/share/101Xdq/'
          target='_blank'
          rel='noopener noreferrer'
        >
          udemy
        </a>
        . Then I changed it to fit my needs.
      </p>
      <p className='p'>
        I also have a blog post that goes into detail on setting up a dynamoDB
        database, API gateway and lambda functions. You can find it at {'  '}
        <a
          href='https://www.mysoftwarejourney.com/2019/11/19/serverless-is-awesome/'
          target='_blank'
          rel='noopener noreferrer'
        >
          mysoftwarejourney.com
        </a>
      </p>
      <h2 className=''>myDynamoDB API</h2>
      <p className='p'>
        Originally I was going to write my own RESTful service to connect to
        dynamoDB.
      </p>
      <p className='p'>
        After discussing this with some developers they suggested I try a lambda
        function instead. I found a boiler plate for dynamoDB when setting up my
        lambda function. It has only one header entry{' '}
        <code>'Content-Type': 'application/json'</code>. If you want CORS you
        need to add following headers to your lambda function.
        <code className='hljs dos'>
          {`'Access-Control-Allow-Origin': '*',,
        `}
          <br />
          {`'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
          `}
          <br />
          {`'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',`}
          <br />
        </code>
        Still even after this is it did not work. Most browsers send out an
        OPTIONS request to test CORS so your server code has to return success
        for OPTIONS. Then in my react app I had to add one last header as
        follows.
        <code className='hljs dos'>{`headers: {Accept: '*/*',}`}</code>
      </p>
      <p className='p'>
        In this app I use POST with a JSON body for all dynamoDB methods. The
        following JSON object is an example for dynamo.putItem.
        <code className='hljs dos'>{`
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
              }
            `}</code>
        The API uses POST for security reasons because the query strings in a
        URL can be logged on the server. Plus it is nice to use a JSON body for
        all requests since it is easy to convert your class, data, etc to a JSON
        string. <code>myMethod</code> defines what dynamoDB function to call.
      </p>
      <p className='p'>
        All this code is available on my git hub account which you can find here{' '}
        <a
          href='https://github.com/JimmySoftLLC/my-dynamodb-demo'
          target='_blank'
          rel='noopener noreferrer'
        >
          my-dynamodb-demo .
        </a>
      </p>
      <h2 className=''>Setting up dynamoDB locally</h2>
      <p className='p'>
        Before provisioning at AWS you might want to run a development version
        of dynamoDB. This way you can debug all your code locally for free.
        <a
          href='https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html'
          target='_blank'
          rel='noopener noreferrer'
        >
          {' '}
          Downloading And Running Instructions at AWS
        </a>
      </p>
      <p className='p'>
        The following instructions are for a mac. Read the documentation above
        for other systems.
      </p>
      <p className='p-indent'>
        1. First install AWS command line interface using the following command.
        <code className='hljs dos'>pip install awscli</code>
        2. Configure aws cli by typing the following command.
        <code className='hljs dos'>aws configure</code>
        3. Enter a fake access key and secret access key and choose none for the
        default region and none for the default output format.
        <code className='hljs dos'>
          AWS Access Key ID: fakeMyKeyId <br />
          AWS Secret Access Key: fakeSecretAccessKey <br />
          Default region name: none
          <br />
          Default output format: none
          <br />
        </code>
        4. Download the downloadable dynamoDB zip file from the link above and
        unzip to a folder called{' '}
        <code className='hljs dos'>/Users/YourUserName/dynamo</code>
        5. Log into your terminal and navigate to the dynamo folder you just
        created. Run the following command to get the database started.
        <code className='hljs dos'>
          java -Djava.library.<span className='hljs-built_in'>path</span>
          =./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
        </code>
        6. If successful you should have something like this.
        <code className='hljs dos'>
          Initializing DynamoDB Local with the following configuration:
          <br />
          Port: 8000
          <br />
          InMemory: false
          <br />
          DbPath: null
          <br />
          SharedDb: true
          <br />
          shouldDelayTransientStatuses: false
          <br />
          CorsParams: *<br />
        </code>
        7. Downloadable dynamoDB commands always require the following endpoint
        added
        <code> --endpoint-url http://localhost:8000</code>. They will not work
        without this. For example the following command will list the tables in
        the database. Since we just set up a new database there will not be any
        tables.
        <code className='hljs dos'>
          aws dynamodb list-tables --endpoint-url http://localhost:8000
        </code>
        8. The following command creates a table named Music. The partition key
        is Artist, and the sort key is SongTitle.
        <code className='hljs dos'>
          aws dynamodb create-table \ --table-name Music \<br />
          --attribute-definitions \ AttributeName=Artist,AttributeType=S \
          <br />
          AttributeName=SongTitle,AttributeType=S \ --key-schema
          <br />
          AttributeName=Artist,KeyType=HASH
          <br />
          AttributeName=SongTitle,KeyType=RANGE \ --provisioned-throughput
          <br />
          ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url
          <br />
          http://localhost:8000
          <br />
        </code>
        9. Use the following reference for all the command available{' '}
        <a
          href='https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html'
          target='_blank'
          rel='noopener noreferrer'
        >
          dynamoDB CLI reference
        </a>
      </p>
      <p className='p page-bottom-margin'></p>
    </Fragment>
  );
};

export default About;
