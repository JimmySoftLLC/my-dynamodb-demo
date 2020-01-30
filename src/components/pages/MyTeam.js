import React, { Fragment, useContext, useEffect } from 'react';
import UserSummaryCard from '../users/UserSummaryCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import Alert from '../layout/Alert';
import AlertDialog from '../layout/AlertDialog';
import MyTeamMenuAndButtons from '../layout/MyTeamMenuAndButtons';

const MyTeam = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    useEffect(() => {
        // in place of component did mount
        dataAndMethodsContext.setOnMyTeamPage(true);
        dataAndMethodsContext.setRedirectTo(' ');
        // eslint-disable-next-line
    }, []);

    const onChange = e => {
        dataAndMethodsContext.setTeam_name(e.target.value);
    };

    return (
        <Fragment>
            <Alert />
            <AlertDialog />
            <MyTeamMenuAndButtons />{' '}
            <h3>My Project Team
                <input
                    type='text'
                    name='team_name'
                    placeholder='Team Name'
                    value={dataAndMethodsContext.team_name}
                    onChange={onChange}
                    className='input-aws-table'
                />
            </h3>
            <p className='p'>
                Based on my search I have selected these developers to collaborate with.
            </p>
            <div className='grid-4 page-bottom-margin '>
                {dataAndMethodsContext.my_team.map(user => (
                    <UserSummaryCard
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default MyTeam;
