import React from 'react';
import UserSummaryCard from './UserSummaryCard';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = props => {
  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      <div className='grid-4 page-bottom-margin'>
        {props.users.map(user => (
          <UserSummaryCard
            key={user.id}
            user={user}
            onMyTeamPage={props.onMyTeamPage}
            removeUserFromTeam={props.removeUserFromTeam}
            addUserToTeam={props.addUserToTeam}
          />
        ))}
      </div>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onMyTeamPage: PropTypes.bool.isRequired,
};

export default Users;
