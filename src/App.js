import React, { Fragment, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import FetchAWS from './components/pages/FetchAWS';
import UserDetailsCard from './components/users/UserDetailsCard';
import Search from './components/pages/Search';
import Alert from './components/layout/Alert';
import AlertDialog from './components/layout/AlertDialog';
import About from './components/pages/About';
import MyTeam from './components/pages/MyTeam';
import MyDynamoTable from './components/pages/MyDynamoTable';
import Footer from './components/layout/Footer';
import axios from 'axios';
import SelectTeamMenu from "./components/layout/SelectTeamMenu";
import EmailTeam from "./components/pages/EmailTeam";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const App  = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [amazonResponse, setAmazonResponse] = useState(' ');
  const [my_users, setMy_users] = useState([]);
  const [my_teams, setMy_teams] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(' ');
  const [alertTitle, setAlertTitle] = useState(' ');
  const [team_id, setTeam_id] = useState(0);
  const [team_name, setTeam_name] = useState(' ');
  const [team_data, setTeam_data] = useState(' ');
  const [search_text, setSearch_text] = useState('');
  const [tableName] = useState('my_open_source_team');
  const [email_subject, setEmail_subject] = useState('');
  const [email_bcc, setEmail_bcc] = useState('');
  const [email_body, setEmail_body] = useState('');
  const [email_to, setEmail_to] = useState('');
  const [email_cc, setEmail_cc] = useState('');
  const [redirectTo, setRedirectTo] = useState('');
  const [onMyTeamPage, setOnMyTeamPage] = useState(false);

  //search github users
  const searchUsers = async text => {
    setLoading(true );
    try {
      const res = await axios.get(
        'https://api.github.com/search/users' +
          '?q=' +
          text +
          '&client_id=' +
          process.env.REACT_APP_GITHUB_CLIENT_ID +
          '&client_secret=' +
          process.env.REACT_APP_GITHUB_CLIENT_SECRET
      );
      setUsers(res.data.items);
      setLoading(false);
    } catch (err) {
      setUsers([]) ;
      setLoading(false );
    }
  };

  const getUser = async userName => {
    setLoading(true );
    try {
      const res = await axios.get(
          'https://api.github.com/users/' +
          userName +
          '?client_id=' +
          process.env.REACT_APP_GITHUB_CLIENT_ID +
          '&client_secret=' +
          process.env.REACT_APP_GITHUB_CLIENT_SECRET
      );
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setUser({}) ;
      setLoading(false );
    }
  };

  const getUsersForEmail = async users => {
    setLoading(true );
    setEmail_to('');
    let myToEmails = '';
    for (let i = 0; i<users.length; i++){
      try {
        const res = await axios.get(
            'https://api.github.com/users/' +
            users[i].login +
            '?client_id=' +
            process.env.REACT_APP_GITHUB_CLIENT_ID +
            '&client_secret=' +
            process.env.REACT_APP_GITHUB_CLIENT_SECRET
        );
        if (res.data.email !== null) {
          myToEmails +=res.data.email +',';
        }
      } catch (err) {

      }
    }
    setEmail_to(myToEmails);
    setLoading(false );
  };

  const scanDynamoDB = async TableName => {
    try {
      const res = await axios.post(
        'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi',
        {
          myBody: {
            TableName: TableName,
          },
          myMethod: 'scan',
        },
        {
          headers: {
            Accept: '*/*',
          },
        }
      );
      let myResData = res.data;
      let myMessage = 'Number of teams: ' + myResData.Count + '\n';
      myMessage += '----------------------\n';
      for (let i = 0; i < myResData.Count; i++) {
        myMessage +=
          'Team: ' +
          myResData.Items[i].team_id +
          ' Name: ' +
          myResData.Items[i].team_name +
          '\n';
      }
      setAmazonResponse(myMessage);
      setMy_teams(myResData.Items);
    } catch (err) {
      setAmazonResponse('');
      setMy_teams([]);
    }
  };

  const putItemDynamoDB = async (TableName, team_id, team_name, team_data) => {
    try {
      const res = await axios.post(
        'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi',
        {
          myBody: {
            TableName: TableName,
            Item: {
              team_id: team_id,
              team_name: team_name,
              team_data: team_data,
            },
            ReturnConsumedCapacity: 'TOTAL',
          },
          myMethod: 'putItem',
        },
        {
          headers: {
            Accept: '*/*',
          },
        }
      );
      setAmazonResponse(JSON.stringify(res.data));
    } catch (err) {
      setAlertDialog(
        err.message + ' Put not completed because this team is write protected.'
      );
    }
  };

  const updateItemDynamoDB = async (TableName, team_id, team_name, team_data) => {
    try {
      const res = await axios.post(
        'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi',
        {
          myBody: {
            TableName: TableName,
            Item: {
              team_id: team_id,
              team_name: team_name,
              team_data: team_data,
            },
            ReturnConsumedCapacity: 'TOTAL',
          },
          myMethod: 'putItem',
        },
        {
          headers: {
            Accept: '*/*',
          },
        }
      );
      setAmazonResponse(JSON.stringify(res.data));
    } catch (err) {
      setAlertDialog(
        err.message + ' Update not completed because this team is write protected.'
      );
    }
  };

  const deleteItemDynamoDB = async (TableName, team_id) => {
    try {
      const res = await axios.post(
        'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi',
        {
          myMethod: 'deleteItem',
          myBody: {
            TableName: TableName,
            Key: {
              team_id: team_id,
            },
          },
        },
        {
          headers: {
            Accept: '*/*',
          },
        }
      );
      setAmazonResponse(JSON.stringify(res.data));
      setTeam_id('');
      setTeam_name('');
      setTeam_data('[]');
      setMy_users([]);
      setLoading (false);
    } catch (err) {
      setAlertDialog(err.message);
    }
  };

  const getItemDynamoDB = async (TableName, team_id) => {
    try {
      const res = await axios.post(
          'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi',
          {
            myBody: {
              TableName: TableName,
              Key: {
                team_id: team_id,
              },
              ReturnConsumedCapacity: 'TOTAL',
            },
            myMethod: 'getItem',
          },
          {
            headers: {
              Accept: '*/*',
            },
          }
      );
      setAmazonResponse(JSON.stringify(res.data));
      setTeam_id(res.data.Item.team_id);
      setTeam_name(res.data.Item.team_name);
      setTeam_data(res.data.Item.team_data);
      setMy_users(JSON.parse(res.data.Item.team_data))
    } catch (err) {
      setAlertDialog(err.message);
    }
  };

  const getUserRepos = async userName => {
    setLoading(true );
    setRepos([]);
    try {
      const res = await axios.get(
          'https://api.github.com/users/' +
          userName +
          '/repos?per_page=40&sort=created:asc' +
          '&client_id=' +
          process.env.REACT_APP_GITHUB_CLIENT_ID +
          '&client_secret=' +
          process.env.REACT_APP_GITHUB_CLIENT_SECRET
      );
      setRepos(res.data);
      setLoading(false);
    } catch (err) {
      setRepos([]);
      setLoading(false);
    }
  };

  const removeUserFromTeam = async (login,redirectPath) => {
    let tempUser = [];
    for (var i = 0; i < my_users.length; i++) {
      if (my_users[i].login !== login) {
        tempUser.push(my_users[i]);
      }
    }
    setMy_users( tempUser );
    setTeam_data(JSON.stringify(tempUser));
    setRedirectTo(redirectPath);
  };

  const addUserToTeam = async (myUser,redirectPath) => {
    let foundDuplicate = false;
    for (let j = 0; j < my_users.length; j++) {
      if (my_users[j].login === myUser.login) {
        foundDuplicate = true;
      }
    }
    if (foundDuplicate) {
      setAlertDialog(
        'Developer already in My Team, human cloning not currently implemented.'
      );
    } else {
      let tempUser = my_users.slice(0);
      tempUser.push(myUser);
      let tempUser2 = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].login !== myUser.login) {
          tempUser2.push(users[i]);
        }
      }
      setTeam_data(JSON.stringify(tempUser));
      setMy_users(tempUser);
      setUsers(tempUser2);
    }
    setRedirectTo(redirectPath);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading (false);
  };

  const showAlert = (msg, type, timeout) => {
    setAlert( { msg: msg, type: type } );
    setTimeout(() => setAlert(null ), timeout);
  };

  const setAlertDialog = msg => {
    setAlertOpen(true);
    setAlertMessage(msg);
    setAlertTitle('Error');
  };

  const setAlertToClosed = () => {
    setAlertOpen(false);
  };

  const setText = (name,value) => {
    switch (name) {
      case 'team_name':
        setTeam_name(value);
        break;
      case 'team_id':
        setTeam_id(value);
        break;
      case 'team_data':
        setTeam_data(value);
        break;
      case 'search_text':
        setSearch_text(value);
        break;
      case 'email_subject':
        setEmail_subject(value);
        break;
      case 'email_bcc':
        setEmail_bcc(value);
        break;
      case 'email_body':
        setEmail_body(value);
        break;
      case 'email_cc':
        setEmail_cc(value);
        break;
      case 'email_to':
        setEmail_to(value);
        break;
      default:
    }
  };

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <Fragment>
                    <Alert alert={alert} />
                    <Search
                        setRedirectTo={setRedirectTo}
                        setOnMyTeamPage={setOnMyTeamPage}
                      setAlert={showAlert}
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      search_text={search_text}
                      setText={setText}
                    />
                    <Users
                      loading={loading}
                      users={users}
                      my_users={my_users}
                      removeUserFromTeam={removeUserFromTeam}
                      addUserToTeam={addUserToTeam}
                      onMyTeamPage={onMyTeamPage}
                      setOnMyTeamPage={setOnMyTeamPage}
                    />
                    <AlertDialog
                      alertOpen={alertOpen}
                      setAlertToClosed={setAlertToClosed}
                      alertMessage={alertMessage}
                      alertTitle={alertTitle}
                    />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/myTeam'
                render={() => (
                  <Fragment>
                    <Alert alert={alert} />
                    <SelectTeamMenu
                        setRedirectTo={setRedirectTo}
                        setOnMyTeamPage={setOnMyTeamPage}
                      setAlert={showAlert}
                      my_teams={my_teams}
                      scanDynamoDB={scanDynamoDB}
                      getItemDynamoDB={getItemDynamoDB}
                      putItemDynamoDB={putItemDynamoDB}
                      updateItemDynamoDB={updateItemDynamoDB}
                      team_id={team_id}
                      team_name={team_name}
                      team_data={team_data}
                      tableName={tableName}
                    />
                    <MyTeam
                      my_users={my_users}
                      removeUserFromTeam={removeUserFromTeam}
                      addUserToTeam={addUserToTeam}
                      onMyTeamPage={onMyTeamPage}
                      team_name={team_name}
                      setText={setText}
                      setOnMyTeamPage={setOnMyTeamPage}
                    />
                    <AlertDialog
                        alertOpen={alertOpen}
                        setAlertToClosed={setAlertToClosed}
                        alertMessage={alertMessage}
                        alertTitle={alertTitle}
                    />
                  </Fragment>
                )}
              />
              <Route
                  exact
                  path='/myEmail'
                  render={() => (
                      <Fragment>
                        <EmailTeam
                            loading={loading}
                            email_to={email_to}
                            email_cc={email_cc}
                            email_subject={email_subject}
                            email_bcc={email_bcc}
                            email_body={email_body}
                            getUsersForEmail={getUsersForEmail}
                            my_users={my_users}
                            setText={setText}
                        />
                      </Fragment>
                  )}
              />
              <Route
                exact
                path='/myDynamoTable'
                render={() => (
                  <Fragment>
                    <FetchAWS
                        tableName={tableName}
                      scanDynamoDB={scanDynamoDB}
                      putItemDynamoDB={putItemDynamoDB}
                      updateItemDynamoDB={updateItemDynamoDB}
                      deleteItemDynamoDB={deleteItemDynamoDB}
                      getItemDynamoDB={getItemDynamoDB}
                      team_id={team_id}
                      team_name={team_name}
                      team_data={team_data}
                      setText={setText}
                    />
                    <MyDynamoTable amazonResponse={amazonResponse} />
                    <AlertDialog
                      alertOpen={alertOpen}
                      setAlertToClosed={setAlertToClosed}
                      alertMessage={alertMessage}
                      alertTitle={alertTitle}
                    />
                  </Fragment>
                )}
              />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <UserDetailsCard
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                    removeUserFromTeam={removeUserFromTeam}
                    addUserToTeam={addUserToTeam}
                    onMyTeamPage={onMyTeamPage}
                    redirectTo={redirectTo}
                  />
                )}
              />
              <Route
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
};

export default App;
