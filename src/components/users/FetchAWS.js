import React from 'react';
import PropTypes from 'prop-types';

const FetchAWS = ({ team_id, team_name, team_data, setText,scanDynamoDB,putItemDynamoDB,updateItemDynamoDB,deleteItemDynamoDB,getItemDynamoDB,tableName }) => {

const onChange = e => {
    setText(e.target.name, e.target.value);
};

  const scanButtonPressed = () => {
    scanDynamoDB(tableName);
  };

  const putButtonPressed = () => {
    putItemDynamoDB(
        tableName,
      parseInt(team_id),
      team_name,
      team_data
    );
  };

  const updateButtonPressed = () => {
    updateItemDynamoDB(
        tableName,
      parseInt(team_id),
      team_name,
      team_data
    );
  };

  const deleteButtonPressed = () => {
    deleteItemDynamoDB(
        tableName,
      parseInt(team_id)
    );
  };

  const getButtonPressed = () => {
    getItemDynamoDB(
        tableName,
      parseInt(team_id)
    );
  };

    return (
      <div>
        <h3 className='page-top-margin'>Dynamo Table Items</h3>
        <p className='p'>
          Scan gives a list of items in the dynamoDB table. Team ID is the primary key.  Get will get the primary key entered. Put creates a new team using the primary key where Team id > 10, team name = some text, and team data = an empty array [ ].  Delete will delete the item.
        </p>
        <button className='btn btn-light' onClick={scanButtonPressed}>
          Scan
        </button>
        <button className='btn btn-light' onClick={putButtonPressed}>
          Put
        </button>
        <button className='btn btn-light' onClick={updateButtonPressed}>
          Update
        </button>
        <button className='btn btn-light' onClick={deleteButtonPressed}>
          Delete
        </button>
        <button className='btn btn-light' onClick={getButtonPressed}>
          Get
        </button>
        <p className='input-aws-table-label'>
          Team Id (Note: use only get for 0 to 10 they are write protected)
        </p>
        <input
          type='text'
          name='team_id'
          placeholder='Team Id'
          value={team_id}
          onChange={onChange}
          className='input-aws-table'
        />
        <p className='input-aws-table-label'>Team Name</p>
        <input
          type='text'
          name='team_name'
          placeholder='Team Name'
          value={team_name}
          onChange={onChange}
          className='input-aws-table'
        />
        <p className='input-aws-table-label'>Team Data (JSON string)</p>
        <textarea
          name='team_data'
          rows='6'
          placeholder='Team Data'
          value={team_data}
          onChange={onChange}
          className='text-area-aws-table'
        />
      </div>
    );
};

FetchAWS.propTypes = {
    scanDynamoDB: PropTypes.func.isRequired,
    putItemDynamoDB: PropTypes.func.isRequired,
    updateItemDynamoDB: PropTypes.func.isRequired,
    deleteItemDynamoDB: PropTypes.func.isRequired,
    getItemDynamoDB: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    tableName: PropTypes.string.isRequired,
};

export default FetchAWS;
