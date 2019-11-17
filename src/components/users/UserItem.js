import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({
  user: { login, avatar_url, html_url, my_users },
  currenlyOnMyTeamPage,
}) => {
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
        //target='_blank'
        //rel='noopener noreferrer'
      >
        More info
      </Link>{' '}
      {currenlyOnMyTeamPage ? (
        <button
          className='btn btn-dark btn-sm my-1'
          //onClick={this.props.clearUsers}
        >
          Remove
        </button>
      ) : (
        <button
          className='btn btn-dark btn-sm my-1'
          //onClick={this.props.clearUsers}
        >
          Add
        </button>
      )}
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  currenlyOnMyTeamPage: PropTypes.bool.isRequired,
};

export default UserItem;
