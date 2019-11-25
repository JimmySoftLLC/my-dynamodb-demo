import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MyDynamoTable = props => {
  console.log('testing at my dynamoTable ');
  return (
    <Fragment>
      <h3>Dynamo Table Items</h3>
      <p className='p'>
        If you press scan you will see what teams are available. Enter the team
        number and press get and the team members can be viewed under My Team.
        Create a new team by entering: team id > 10, team name, and [ ] for team
        data.
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
