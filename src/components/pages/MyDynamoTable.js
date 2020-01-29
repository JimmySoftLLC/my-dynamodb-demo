import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/dataAndMethods/dataAndMethodsContext';
import TeamContext from '../../context/team/teamContext';

const MyDynamoTable = props => {
  const gitHubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const teamContext = useContext(TeamContext);
  return (
    <Fragment>
      <code className='hljs dos display-linebreak'>{props.amazonResponse}</code>
      <div className='grid-4 page-bottom-margin '></div>
    </Fragment>
  );
};

MyDynamoTable.propTypes = {
  amazonResponse: PropTypes.string.isRequired,
};

export default MyDynamoTable;
