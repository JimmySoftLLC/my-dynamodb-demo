import React, { Fragment } from 'react';
import UserItem from '../users/UserItem';
import PropTypes from 'prop-types';

const MyTeam = props => {
  return (
    <Fragment>
      <h2 className='page-top-margin'>My Project Team</h2>
      <p>
        Based on my search I have selected these developers I want to
        collaborate with on a fun project.
      </p>
      <p>
        The next step is to reach out to them and see what we can work on
        together.
      </p>
      <div style={userStyle}>
        {props.users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </Fragment>
  );
};

MyTeam.propTypes = {
  users: PropTypes.array.isRequired,
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem',
};

export default MyTeam;
