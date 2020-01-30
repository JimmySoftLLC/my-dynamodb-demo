import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';
import { Redirect } from 'react-router-dom';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const User = ({ match }) => {
  const dataAndMethodsContext = useContext(DataAndMethodsContext);

  useEffect(() => {
    // in place of component did mount
    dataAndMethodsContext.getUser(match.params.login);
    dataAndMethodsContext.getUserRepos(match.params.login);
    dataAndMethodsContext.setRedirectTo('');
    // eslint-disable-next-line
  }, []);

  const removeUser = () => {
    if (dataAndMethodsContext.onMyTeamPage) {
      dataAndMethodsContext.removeUserFromTeam(login, '/myTeam');
    } else {
      dataAndMethodsContext.removeUserFromTeam(login, '/');
    }
  };

  const addUser = () => {
    if (dataAndMethodsContext.onMyTeamPage) {
      dataAndMethodsContext.addUserToTeam(dataAndMethodsContext.user, '/myTeam');
    } else {
      dataAndMethodsContext.addUserToTeam(dataAndMethodsContext.user, '/');
    }
  };

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
  } = dataAndMethodsContext.user;

  if (dataAndMethodsContext.loading) return <Spinner />;

  let redirectToLocal;
  switch (dataAndMethodsContext.redirectTo) {
    case "/":
      redirectToLocal = <Redirect to='/' />;
      break;
    case "/myTeam":
      redirectToLocal = <Redirect to='/myTeam' />;
      break;
    default:
      redirectToLocal = null;
      break;
  }

  return (
    <Fragment>
      {redirectToLocal}
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
          {dataAndMethodsContext.onMyTeamPage ? (
            <button
              className='btn btn-dark my-1'
              onClick={removeUser}
            >
              Remove
                  </button>
          ) : (
              <button className='btn btn-dark my-1' onClick={addUser}>
                Add
                  </button>
            )}
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
                    a href={blog}
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
      <Repos repos={dataAndMethodsContext.repos} />
      <p className='p page-bottom-margin'></p>
    </Fragment>
  );
};
export default User;
