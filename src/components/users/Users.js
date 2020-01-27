import React, { useContext } from 'react';
import UserSummaryCard from './UserSummaryCard';
import Spinner from '../layout/Spinner';
import GitHubContext from '../../context/gitHub/gitHubContext';

const Users = props => {
  const gitHubContext = useContext(GitHubContext);
  const { loading, users } = gitHubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='grid-4 page-bottom-margin'>
        {users.map(user => (
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

export default Users;
