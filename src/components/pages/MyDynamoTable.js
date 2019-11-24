import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MyDynamoTable = props => {
  console.log('testing at my dynamoTable ');
  return (
    <Fragment>
      <h2>Dynamo Table Items</h2>
      <p className='p'>
        The following is the results from Scan, Put, Update from dynamoDB.
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
