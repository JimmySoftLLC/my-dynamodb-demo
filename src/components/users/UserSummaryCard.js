import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserSummaryCard = ({ user, onMyTeamPage, removeUserFromTeam, addUserToTeam }) => {

  const removeUser = () => {
    //console.log('remove user operation');
    removeUserFromTeam(login);
  };

  const addUser = () => {
    //console.log('add user operation');
    addUserToTeam(user);
  };

    const {
        avatar_url,
        login,
    } = user;


    return (
      <div className='card text-center'>
        <img
          src={avatar_url}
          alt=''
          className='round-img'
          style={{ width: '120px' }}
        />
        <h3>{login}</h3>
        <Link
          to={'/user/' + login}
          className='btn btn-dark btn-sm my-1'
        >
          More info
        </Link>{' '}
        {onMyTeamPage ? (
          <button
            className='btn btn-dark btn-sm my-1'
            onClick={removeUser}
          >
            Remove
          </button>
        ) : (
          <button className='btn btn-dark btn-sm my-1' onClick={addUser}>
            Add
          </button>
        )}
      </div>
    );
};

UserSummaryCard.propTypes = {
    user: PropTypes.object.isRequired,
    removeUserFromTeam: PropTypes.func.isRequired,
    addUserToTeam: PropTypes.func.isRequired,
};

export default UserSummaryCard;
