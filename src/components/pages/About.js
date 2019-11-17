import React, { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <h2 className='page-top-margin'>About myDynamoDB</h2>
      <p className='p'>
        MyDynamoDB demonstrates using dynamoDB to save users that you select to
        be part of my team. The users are picked from git hub.
      </p>
      <p className='p'>
        The main purpose is to demonstrate how you could use dynamoDB to save
        these users to a database.
      </p>
      <p className='p'>
        The front end is in react. I started with a react project from Brad
        Traversy's tutorial which you can find at{' '}
        <a href='https://www.udemy.com/share/101Xdq/'>udemy</a>.{' '}
      </p>
      <h2 className=''>Setting up dynamoDB locally</h2>
      <p className='p'>
        Before provisioning at AWS it is important to run a development version
        of dynamoDB. This way you can debug all your code locally for free.
        <a href='https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html'>
          {' '}
          Downloading And Running Instructions at AWS
        </a>
        <p className='p'>
          The following instructions are for a mac. Read the documentation above
          for other systems.
        </p>
        <p className='p'>
          1. First install AWS command line interface using the following
          command.
          <code className='hljs dos'>pip install awscli</code>
          2. Configure aws cli by typing the following command.
          <code className='hljs dos'>aws configure</code>
          3. Enter a fake access key and secret access key and choose none for
          the default region and none for the default output format.
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
            java -Djava.library.<span class='hljs-built_in'>path</span>
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
          7. Downloadable dynamoDB commands always require the following
          endpoint added
          <code> --endpoint-url http://localhost:8000</code>. They will not work
          without this. For example the following command will list the tables
          in the database. Since we just set up a new database there will not be
          any tables.
          <code className='hljs dos'>
            aws dynamodb list-tables --endpoint-url http://localhost:8000
          </code>
          8. The following command creates a table named Music. The partition
          key is Artist, and the sort key is SongTitle.
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
          <a href='https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html'>
            dynamoDB CLI reference
          </a>
        </p>
      </p>
      <h2 className=''>myDynamoDB API connections</h2>
      <p className='p'>
        MyDynamoDB use AWS endpoint in the following configuration.
      </p>
    </Fragment>
  );
};

export default About;
