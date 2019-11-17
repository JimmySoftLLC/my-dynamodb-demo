import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <nav className='footer bg-primary'>
      <p>Footer</p>
    </nav>
  );
};

Footer.defaultProps = {
  title: 'myDynamoDB',
  icon: 'fab fa-aws',
};

Footer.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Footer;
