import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = props => {
  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      <div className='grid-4'>
        {props.users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            currenlyOnMyTeamPage={props.currenlyOnMyTeamPage}
          />
        ))}
      </div>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  currenlyOnMyTeamPage: PropTypes.bool.isRequired,
};

export default Users;
