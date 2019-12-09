import React, {Fragment} from 'react';
import UserSummaryCard from '../users/UserSummaryCard';
import PropTypes from 'prop-types';

const MyTeam = ({my_users,onMyTeamPage,removeUserFromTeam,addUserToTeam,setText,team_name}) => {
    const onChange = e => {
        setText(e.target.name, e.target.value);
    };
    return (
        <Fragment>
            <h3>My Project Team
                <input
                    type='text'
                    name='team_name'
                    placeholder='Team Name'
                    value={team_name}
                    onChange={onChange}
                    className='input-aws-table'
                />
            </h3>
            <p className='p'>
                Based on my search I have selected these developers to collaborate with.
            </p>
            <div className='grid-4 page-bottom-margin '>
                {my_users.map(user => (
                    <UserSummaryCard
                        key={user.id}
                        user={user}
                        onMyTeamPage={onMyTeamPage}
                        removeUserFromTeam={removeUserFromTeam}
                        addUserToTeam={addUserToTeam}
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
    setText: PropTypes.func.isRequired,
};

export default MyTeam;
