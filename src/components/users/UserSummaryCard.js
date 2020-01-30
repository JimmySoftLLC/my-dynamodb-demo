import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const UserSummaryCard = ({ user }) => {
  const dataAndMethodsContext = useContext(DataAndMethodsContext);

  return (
    <div className='card text-center'>
      <img
        src={user.avatar_url}
        alt=''
        className='round-img'
        style={{ width: '120px' }}
      />
      <h3>{user.login}</h3>
      <Link
        to={'/user/' + user.login}
        className='btn btn-dark btn-sm my-1'
      >
        More info
        </Link>{' '}
      {dataAndMethodsContext.onMyTeamPage ? (
        <button
          className='btn btn-dark btn-sm my-1'
          onClick={() => dataAndMethodsContext.removeUserFromTeam(user.login)}
        >
          Remove
          </button>
      ) : (
          <button className='btn btn-dark btn-sm my-1' onClick={() => dataAndMethodsContext.addUserToTeam(user)}>
            Add
          </button>
        )}
    </div>
  );
};

export default UserSummaryCard;
