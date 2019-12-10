import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';

const User = ({user, getUser, repos, match, getUserRepos,loading }) => {
  useEffect(() => {
    // in place of component did mount
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

    const {
      name,
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      email,
    } = user;

    if (loading) return <Spinner />;

    return (
      <Fragment>
        <Link to='/myTeam' className='btn btn-light page-top-margin'>
          <i className="fas fa-arrow-left"></i> My Team
        </Link>
        <Link to='/' className='btn btn-light'>
          <i className="fas fa-arrow-left"></i> Find Developers
        </Link>
        Hireable: {''}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt=''
              style={{ width: '150px' }}
            />
            <h3>{name}</h3>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a
              href={html_url}
              className='btn btn-dark my-1'
              target='_blank'
              rel='noopener noreferrer'
            >
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>UserName: {login}</strong>
                  </Fragment>
                )}
              </li>
              <li>
                {login && (
                  <Fragment>
                    <strong>Company: {company}</strong>
                  </Fragment>
                )}
              </li>
              <li>
                {login && (
                  <Fragment>
                    <strong>Website: <
                      a href = {blog}
                      target='_blank'
                      rel='noopener noreferrer'
                    >{blog}</a> </strong>
                  </Fragment>
                )}
              </li>
              <li>
                {login && (
                    <Fragment>
                      <strong>Email: {email}</strong>
                    </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Public Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
        <p className='p page-bottom-margin'></p>
      </Fragment>
    );
};




User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
};

export default User;
