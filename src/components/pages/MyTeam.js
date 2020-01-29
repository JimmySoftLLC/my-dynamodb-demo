import React, { Fragment, useContext } from 'react';
import UserSummaryCard from '../users/UserSummaryCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MyTeam = ({ setText, team_name }) => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

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
                {dataAndMethodsContext.my_users.map(user => (
                    <UserSummaryCard
                        key={user.id}
                        user={user}
                        onMyTeamPage={true}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default MyTeam;
