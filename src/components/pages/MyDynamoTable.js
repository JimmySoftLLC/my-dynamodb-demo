import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MyDynamoTable extends Component {
  componentDidMount() {
    this.props.getUserFromAWS();
  }
  static propTypes = {
    my_amazon_payload: PropTypes.object.isRequired,
    getUserFromAWS: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <h2 className='page-top-margin'>My Dynamo Table</h2>
        <button className='btn btn-light btn-block'>
          Fetch table from AWS
        </button>
        <p className='p'>
          The following is the result of a get request to my dynamoDB table on
          AWS. It was set up on AWS using an api gateway and a lamda function
          connected to my dynamoDB database.
        </p>
        <p className='p'>
          The next step is get all the remaining endpoints working.
        </p>
        <p className='p'>{this.props.my_amazon_payload}</p>
        <div className='grid-4 page-bottom-margin '></div>
      </div>
    );
  }
}

export default MyDynamoTable;
