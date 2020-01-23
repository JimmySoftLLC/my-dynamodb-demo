import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

const SelectTeamMenu = ({
  my_teams,
  team_name,
  team_data,
  setAlert,
  getItemDynamoDB,
  team_id,
  scanDynamoDB,
  putItemDynamoDB,
  updateItemDynamoDB,
  tableName,
  setOnMyTeamPage,
  setRedirectTo,
}) => {
  useEffect(() => {
    // in place of component did mount
    scanTeamsButtonPressed();
    setOnMyTeamPage(true);
    setRedirectTo('');
    // eslint-disable-next-line
  }, []);

  const alertContext = useContext(AlertContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const showTeamMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const copyTeamButtonPressed = () => {
    let foundUniqueId = false;
    let spillOutIndex = 0;
    let randomInt = 0;
    while (foundUniqueId === false) {
      spillOutIndex++;
      if (spillOutIndex > 150) break;
      randomInt = Math.floor(Math.random() * (100 - 11)) + 11;
      for (let i = 0; i < my_teams.length; i++) {
        if (randomInt === my_teams[i].team_id) break;
        if (i === my_teams.length - 1) {
          foundUniqueId = true;
        }
      }
    }
    if (foundUniqueId === true) {
      putItemDynamoDB(tableName, randomInt, team_name + ' copy', team_data);
      setTimeout(() => scanTeamsButtonPressed(), 1000);
      setTimeout(() => getUpdates(randomInt), 2000);
      alertContext.setAlert(
        'waiting for eventually consistent reads',
        'light',
        2000
      );
    }
  };

  const newTeamButtonPressed = () => {
    let foundUniqueId = false;
    let spillOutIndex = 0;
    let randomInt = 0;
    while (foundUniqueId === false) {
      spillOutIndex++;
      if (spillOutIndex > 150) break;
      randomInt = Math.floor(Math.random() * (100 - 11)) + 11;
      for (let i = 0; i < my_teams.length; i++) {
        if (randomInt === my_teams[i].team_id) break;
        if (i === my_teams.length - 1) {
          foundUniqueId = true;
        }
      }
    }
    let newTeamName = 'new team ' + randomInt.toString();
    if (foundUniqueId === true) {
      putItemDynamoDB(tableName, randomInt, newTeamName, '[]');
      setTimeout(() => scanTeamsButtonPressed(), 1000);
      setTimeout(() => getUpdates(randomInt), 2000);
      alertContext.setAlert(
        'waiting for eventually consistent reads',
        'light',
        2000
      );
    }
  };

  const getUpdates = id => {
    getItemDynamoDB(tableName, parseInt(id));
  };

  const menuItemSelectedGetUpdates = event => {
    getItemDynamoDB(tableName, parseInt(event.currentTarget.id));
    setAnchorEl(null);
  };

  const scanTeamsButtonPressed = () => {
    scanDynamoDB(tableName);
  };

  const saveButtonPressed = () => {
    updateItemDynamoDB(tableName, parseInt(team_id), team_name, team_data);
    setTimeout(() => scanTeamsButtonPressed(), 1000);
    alertContext.setAlert(
      'waiting for eventually consistent reads',
      'light',
      1000
    );
  };

  const getUpdateButtonPressed = () => {
    getItemDynamoDB(tableName, parseInt(team_id));
  };

  const clickedOffMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button className='btn btn-light page-top-margin' onClick={showTeamMenu}>
        Select team
      </button>
      <button className='btn btn-light' onClick={scanTeamsButtonPressed}>
        Scan teams
      </button>
      <button className='btn btn-light' onClick={newTeamButtonPressed}>
        New team
      </button>
      <button className='btn btn-light' onClick={copyTeamButtonPressed}>
        Copy team
      </button>
      <button className='btn btn-light' onClick={saveButtonPressed}>
        Save
      </button>
      <button className='btn btn-light' onClick={getUpdateButtonPressed}>
        Get updates
      </button>
      <Link to='/myEmail' className='btn btn-light'>
        Compose email
      </Link>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={clickedOffMenu}
      >
        {my_teams.map(team => (
          <MenuItem
            key={team.team_id}
            id={team.team_id}
            onClick={menuItemSelectedGetUpdates}
          >
            {team.team_name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

SelectTeamMenu.propTypes = {
  my_teams: PropTypes.array.isRequired,
  getItemDynamoDB: PropTypes.func.isRequired,
  scanDynamoDB: PropTypes.func.isRequired,
  updateItemDynamoDB: PropTypes.func.isRequired,
  putItemDynamoDB: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  tableName: PropTypes.string.isRequired,
};

export default SelectTeamMenu;
