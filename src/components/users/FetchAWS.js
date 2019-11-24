import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FetchAWS extends Component {
  state = {
    TableName: 'my_open_source_team',
    team_id: 0,
    team_name: 'No Name',
    team_data: '{}',
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  static propTypes = {
    scanDynamoDB: PropTypes.func.isRequired,
    putItemDynamoDB: PropTypes.func.isRequired,
    updateItemDynamoDB: PropTypes.func.isRequired,
    deleteItemDynamoDB: PropTypes.func.isRequired,
    getItemDynamoDB: PropTypes.func.isRequired,
  };

  scanDynamoDB = () => {
    this.props.scanDynamoDB(this.state.TableName);
  };

  putItemDynamoDB = () => {
    console.log('put command called  ' + this.state.TableName + 'team_id');
    this.props.putItemDynamoDB(
      this.state.TableName,
      parseInt(this.state.team_id),
      this.state.team_name,
      this.state.team_data
    );
  };

  updateItemDynamoDB = () => {
    this.props.updateItemDynamoDB(
      this.state.TableName,
      parseInt(this.state.team_id),
      this.state.team_name,
      this.state.team_data
    );
  };

  deleteItemDynamoDB = () => {
    this.props.deleteItemDynamoDB(
      this.state.TableName,
      parseInt(this.state.team_id)
    );
  };

  getItemDynamoDB = () => {
    this.props.getItemDynamoDB(
      this.state.TableName,
      parseInt(this.state.team_id)
    );
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
        <button className='btn btn-light' onClick={this.putItemDynamoDB}>
          Put
        </button>
        <button className='btn btn-light' onClick={this.updateItemDynamoDB}>
          Update
        </button>
        <button className='btn btn-light' onClick={this.deleteItemDynamoDB}>
          Delete
        </button>
        <button className='btn btn-light' onClick={this.getItemDynamoDB}>
          Get
        </button>
        <input
          type='text'
          name='team_id'
          placeholder='Team Id >1999 0-1999 reserved'
          value={this.state.team_id}
          onChange={this.onChange}
        />
        <input
          type='text'
          name='team_name'
          placeholder='Team Name'
          value={this.state.team_name}
          onChange={this.onChange}
        />
        <input
          type='text'
          name='team_data'
          placeholder='Team Data'
          value={this.state.team_data}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default FetchAWS;
