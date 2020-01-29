import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/dataAndMethods/dataAndMethodsContext';
import TeamContext from '../../context/team/teamContext';

const FetchAWS = ({ team_id, team_name, team_data, setText, scanDynamoDB, putItemDynamoDB, updateItemDynamoDB, deleteItemDynamoDB, getItemDynamoDB, tableName }) => {
  const gitHubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const teamContext = useContext(TeamContext);
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
        This page shows you the raw data from dynamodDB on AWS.
        One interesting thing you will notice is that the capacity units are much larger to write
        vs. read.  This is something you should be aware of when considering dynamoDB for
        your project.  Writes are costly.  Reads are fast.
      </p>
      <p className='p'>
        Scan lists the items.  Put, Update, Delete and Get acts on the Team Id.
        </p>
      <p className='p'>
        Note: New entries shall follow the following: id > 10, team name = some text, and team data = an empty array [ ].
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
        Team Id (Primary key: items 0 to 10 are write protected)
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

export default FetchAWS;
