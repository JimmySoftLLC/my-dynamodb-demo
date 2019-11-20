import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MyDynamoTable = props => {
  console.log('testing at my dynamoTable ');
  return (
    <Fragment>
      <h2>Dynamo Table Items</h2>
      <p className='p'>
        The following is the result of a get request to my dynamoDB tables on
        AWS. It was set up on AWS using an api gateway and a lamda function
        connected to my dynamoDB database.
      </p>
      <p className='p'>
        The next step is get all the remaining endpoints working.
      </p>
      <code className='hljs dos display-linebreak'>{props.amazonResponse}</code>
      <div className='grid-4 page-bottom-margin '></div>
    </Fragment>
  );
};

MyDynamoTable.propTypes = {
  amazonResponse: PropTypes.string.isRequired,
};

export default MyDynamoTable;
