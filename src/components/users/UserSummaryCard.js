import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class UserSummaryCard extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    removeUserFromTeam: PropTypes.func.isRequired,
    addUserToTeam: PropTypes.func.isRequired,
  };

  removeUser = () => {
    //console.log('remove user operation');
    this.props.removeUserFromTeam(this.props.user.login);
  };

  addUser = () => {
    //console.log('add user operation');
    this.props.addUserToTeam(this.props.user);
  };

  render() {
    return (
      <div className='card text-center'>
        <img
          src={this.props.user.avatar_url}
          alt=''
          className='round-img'
          style={{ width: '120px' }}
        />
        <h3>{this.props.user.login}</h3>
        <Link
          to={'/user/' + this.props.user.login}
          className='btn btn-dark btn-sm my-1'
        >
          More info
        </Link>{' '}
        {this.props.onMyTeamPage ? (
          <button
            className='btn btn-dark btn-sm my-1'
            onClick={this.removeUser}
          >
            Remove
          </button>
        ) : (
          <button className='btn btn-dark btn-sm my-1' onClick={this.addUser}>
            Add
          </button>
        )}
      </div>
    );
  }
}

export default UserSummaryCard;
