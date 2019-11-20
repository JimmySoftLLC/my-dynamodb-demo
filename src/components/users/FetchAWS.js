import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FetchAWS extends Component {
  static propTypes = {
    getUserFromAWS: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <button
          className='btn btn-light btn-block page-top-margin'
          onClick={this.props.getUserFromAWS}
        >
          Fetch table from AWS
        </button>
      </div>
    );
  }
}

export default FetchAWS;
