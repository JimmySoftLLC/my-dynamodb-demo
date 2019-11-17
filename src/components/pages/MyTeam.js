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
      <div className='grid-4'>
        {props.my_users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            currenlyOnMyTeamPage={props.currenlyOnMyTeamPage}
          />
        ))}
      </div>
    </Fragment>
  );
};

MyTeam.propTypes = {
  my_users: PropTypes.array.isRequired,
  currenlyOnMyTeamPage: PropTypes.bool.isRequired,
};

export default MyTeam;
