import React, { Fragment } from 'react';
import UserSummaryCard from '../users/UserSummaryCard';
import PropTypes from 'prop-types';

const MyTeam = props => {
  console.log('testing at my team ' + props.onMyTeamPage);
  return (
    <Fragment>
      <h2 className='page-top-margin'>My Project Team - {props.team_name}</h2>
      <p className='p'>
        Based on my search I have selected these developers to collaborate with.
      </p>
      <div className='grid-4 page-bottom-margin '>
        {props.my_users.map(user => (
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
    </Fragment>
  );
};

MyTeam.propTypes = {
  my_users: PropTypes.array.isRequired,
  onMyTeamPage: PropTypes.bool.isRequired,
  team_name: PropTypes.string.isRequired,
};

export default MyTeam;
