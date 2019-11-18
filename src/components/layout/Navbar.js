import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={props.icon} /> {props.title}
      </h1>
      <ul>
        <li>
          <Link to='/myDynamoTable'>
            <i className='fab fa-aws'></i> My Table
          </Link>
        </li>
        <li>
          <Link to='/myTeam'>
            <i className='fas fa-users'></i> My Team
          </Link>
        </li>
        <li>
          <Link to='/'>
            <i className='fas fa-search'></i> Find Developers
          </Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'myDynamoDB',
  icon: 'fab fa-aws',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
