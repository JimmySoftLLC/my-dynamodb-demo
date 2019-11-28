import React, {Component, Fragment} from 'react';
import UserSummaryCard from '../users/UserSummaryCard';
import PropTypes from 'prop-types';

class MyTeam extends Component {
    static propTypes = {
        my_users: PropTypes.array.isRequired,
        onMyTeamPage: PropTypes.bool.isRequired,
        team_name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    onChangeLocal = e => {
        this.props.onChange(e);
    };

    render() {
        return (
            <Fragment>
                <h3>My Project Team
                    <input
                        type='text'
                        name='team_name'
                        placeholder='Team Name'
                        value={this.props.team_name}
                        onChange={this.onChangeLocal}
                        className='input-aws-table'
                    />
                </h3>
                <p className='p'>
                    Based on my search I have selected these developers to collaborate with.
                </p>
                <div className='grid-4 page-bottom-margin '>
                    {this.props.my_users.map(user => (
                        <UserSummaryCard
                            key={user.id}
                            user={user}
                            my_users={this.props.my_users}
                            onMyTeamPage={this.props.onMyTeamPage}
                            removeUserFromTeam={this.props.removeUserFromTeam}
                            addUserToTeam={this.props.addUserToTeam}
                        />
                    ))}
                </div>
            </Fragment>
        );
    };
}

export default MyTeam;
