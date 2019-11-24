import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FetchAWS extends Component {
  state = {
    text: 'my_open_source_team',
    team_id: '',
    team_name: '',
    team_data: '',
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  static propTypes = {
    scanDynamoDB: PropTypes.func.isRequired,
  };

  scanDynamoDB = () => {
    this.props.scanDynamoDB(this.state.text);
  };

  putDynamoDB = () => {
    //this.props.putDynamoDB('my_open_source_team');
  };

  updateDynamoDB = () => {
    //this.props.updateDynamoDB('my_open_source_team');
  };

  render() {
    return (
      <div>
        <button
          className='btn btn-light page-top-margin'
          onClick={this.scanDynamoDB}
        >
          Scan
        </button>
        <button className='btn btn-light' onClick={this.scanDynamoDB}>
          Put
        </button>
        <button className='btn btn-light' onClick={this.scanDynamoDB}>
          Update
        </button>

        <input
          type='text'
          name='text'
          placeholder='Team Id'
          value={this.state.team_id}
          onChange={this.onChange}
        />
        <input
          type='text'
          name='text'
          placeholder='Team Name'
          value={this.state.team_name}
          onChange={this.onChange}
        />
        <input
          type='text'
          name='text'
          placeholder='Team Data'
          value={this.state.team_data}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default FetchAWS;
