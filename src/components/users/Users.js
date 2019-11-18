import React from 'react';
import UserSummaryCard from './UserSummaryCard';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = props => {
  console.log('testing at my home page ' + props.onMyTeamPage);
  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      <div className='grid-4 page-bottom-margin'>
        {props.users.map(user => (
          <UserSummaryCard
            key={user.id}
            user={user}
            my_users={props.my_users}
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
