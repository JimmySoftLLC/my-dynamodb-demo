import React, { useContext } from 'react';
import UserSummaryCard from './UserSummaryCard';
import Spinner from '../layout/Spinner';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const Users = props => {
  const dataAndMethodsContext = useContext(DataAndMethodsContext);
  const { loading, users } = dataAndMethodsContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='grid-4 page-bottom-margin'>
        {users.map(user => (
          <UserSummaryCard
            key={user.id}
            user={user}
            onMyTeamPage={false}
          />
        ))}
      </div>
    );
  }
};

export default Users;
