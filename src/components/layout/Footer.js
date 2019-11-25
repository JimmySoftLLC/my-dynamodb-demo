import React from 'react';
import PropTypes from 'prop-types';

const Footer = props => {
  return (
    <footer className='footer bg-primary'>
      <ul>
        <li>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.jimmysoftllc.com/'
          >
            <i className='fas fa-external-link-alt'></i> JimmySoft LLC
          </a>
        </li>
      </ul>
    </footer>
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
