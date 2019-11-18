import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class UserCard extends Component {
  componentDidMount() {
    // this.props.getUser(this.props.match.params.login);
    // this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    //currentlyOnMyTeamPage: PropTypes.bool.isRequired,
  };

  handleClick = () => {
    console.log('you finally made it here!!!!');
    //this.props.setAlert(this.props.user.login, 'light');
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
          More info dude
        </Link>{' '}
        {this.props.onMyTeamPage ? (
          <button
            className='btn btn-dark btn-sm my-1'
            onClick={this.props.handleClick}
          >
            Remove
          </button>
        ) : (
          <button
            className='btn btn-dark btn-sm my-1'
            onClick={this.props.handleClick}
          >
            Add
          </button>
        )}
      </div>
    );
  }
}

export default UserCard;
