import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FetchAWS extends Component {
  state = {
    TableName: 'my_open_source_team',
  };

  onChangeLocal = e => {
    this.props.onChange(e);
  };

  static propTypes = {
    scanDynamoDB: PropTypes.func.isRequired,
    putItemDynamoDB: PropTypes.func.isRequired,
    updateItemDynamoDB: PropTypes.func.isRequired,
    deleteItemDynamoDB: PropTypes.func.isRequired,
    getItemDynamoDB: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  scanDynamoDB = () => {
    this.props.scanDynamoDB(this.state.TableName);
  };

  putItemDynamoDB = () => {
    console.log('put command called  ' + this.state.TableName + 'team_id');
    this.props.putItemDynamoDB(
      this.state.TableName,
      parseInt(this.props.team_id),
      this.props.team_name,
      this.props.team_data
    );
  };

  updateItemDynamoDB = () => {
    this.props.updateItemDynamoDB(
      this.state.TableName,
      parseInt(this.props.team_id),
      this.props.team_name,
      this.props.team_data
    );
  };

  deleteItemDynamoDB = () => {
    this.props.deleteItemDynamoDB(
      this.state.TableName,
      parseInt(this.props.team_id)
    );
  };

  getItemDynamoDB = () => {
    this.props.getItemDynamoDB(
      this.state.TableName,
      parseInt(this.props.team_id)
    );
  };

  render() {
    return (
      <div>
        <h3 className='page-top-margin'>Dynamo Table Items</h3>
        <p className='p'>
          If you press scan you will see what teams are available. Enter the
          team number and press get and the team members can be viewed under My
          Team. Create a new team by entering: team id > 10, team name, and [ ]
          for team data.
        </p>
        <button className='btn btn-light' onClick={this.scanDynamoDB}>
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
        <p className='input-aws-table-label'>
          Team Id (Note: use only get for 0 to 10 they are write protected)
        </p>
        <input
          type='text'
          name='team_id'
          placeholder='Team Id'
          value={this.props.team_id}
          onChange={this.onChangeLocal}
          className='input-aws-table'
        />
        <p className='input-aws-table-label'>Team Name</p>
        <input
          type='text'
          name='team_name'
          placeholder='Team Name'
          value={this.props.team_name}
          onChange={this.onChangeLocal}
          className='input-aws-table'
        />
        <p className='input-aws-table-label'>Team Data (JSON string)</p>
        <textarea
          type='text'
          name='team_data'
          rows='6'
          placeholder='Team Data'
          value={this.props.team_data}
          onChange={this.onChangeLocal}
          className='text-area-aws-table'
        />
      </div>
    );
  }
}

export default FetchAWS;
