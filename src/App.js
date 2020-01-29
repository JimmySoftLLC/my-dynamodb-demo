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
import SelectTeamMenu from './components/layout/SelectTeamMenu';
import EmailTeam from './components/pages/EmailTeam';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AlertState from './context/alert/AlertState';
import AlertDialogState from './context/alertDialog/AlertDialogState';
import DataAndMethodsState from './context/dataAndMethods/dataAndMethodsState';
import './App.css';

const App = () => {
  const [amazonResponse, setAmazonResponse] = useState(' ');
  const [tableName] = useState('my_open_source_team');
  const lambdaFunctionURL =
    'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi';

  const getUsersForEmail = async users => {
    //setLoading(true);
    //setEmail_to('');
    let myToEmails = '';
    for (let i = 0; i < users.length; i++) {
      try {
        const res = await axios.get(
          'https://api.dataAndMethods.com/users/' +
          users[i].login +
          '?client_id=' +
          process.env.REACT_APP_GITHUB_CLIENT_ID +
          '&client_secret=' +
          process.env.REACT_APP_GITHUB_CLIENT_SECRET
        );
        if (res.data.email !== null) {
          myToEmails += res.data.email + ',';
        }
      } catch (err) { }
    }
    //setEmail_to(myToEmails);
    //setLoading(false);
  };

  const scanDynamoDB = async TableName => {
    try {
      const res = await axios.post(
        lambdaFunctionURL,
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
      //setMy_teams(myResData.Items);
    } catch (err) {
      setAmazonResponse('');
      //setMy_teams([]);
    }
  };

  const putItemDynamoDB = async (TableName, team_id, team_name, team_data) => {
    try {
      const res = await axios.post(
        lambdaFunctionURL,
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
      // setAlertDialog(
      //   err.message + ' Put not completed because this team is write protected.'
      // );
    }
  };

  const updateItemDynamoDB = async (
    TableName,
    team_id,
    team_name,
    team_data
  ) => {
    try {
      const res = await axios.post(
        lambdaFunctionURL,
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
      // setAlertDialog(
      //   err.message +
      //   ' Update not completed because this team is write protected.'
      // );
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
      //setTeam_id('');
      //setTeam_name('');
      //setTeam_data('[]');
      //setMy_users([]);
      //setLoading(false);
    } catch (err) {
      // setAlertDialog(err.message);
    }
  };

  const getItemDynamoDB = async (TableName, team_id) => {
    try {
      const res = await axios.post(
        lambdaFunctionURL,
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
      //setTeam_id(res.data.Item.team_id);
      //setTeam_name(res.data.Item.team_name);
      //setTeam_data(res.data.Item.team_data);
      //(JSON.parse(res.data.Item.team_data));
    } catch (err) {
      // setAlertDialog(err.message);
    }
  };

  const setText = (name, value) => {
    switch (name) {
      case 'team_name':
        //setTeam_name(value);
        break;
      case 'team_id':
        //setTeam_id(value);
        break;
      case 'team_data':
        //setTeam_data(value);
        break;
      case 'search_text':
        //setSearch_text(value);
        break;
      case 'email_subject':
        //setEmail_subject(value);
        break;
      case 'email_bcc':
        //setEmail_bcc(value);
        break;
      case 'email_body':
        //setEmail_body(value);
        break;
      case 'email_cc':
        //setEmail_cc(value);
        break;
      case 'email_to':
        //setEmail_to(value);
        break;
      default:
    }
  };

  return (
    <AlertState>
      <AlertDialogState>
        <DataAndMethodsState>
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
                        <Alert />
                        <AlertDialog />
                        <Search />{' '}
                        <Users />{' '}
                      </Fragment>
                    )}
                  />{' '}
                  <Route exact path='/about' component={About} />{' '}
                  <Route
                    exact
                    path='/myTeam'
                    render={() => (
                      <Fragment>
                        <Alert />
                        <SelectTeamMenu />{' '}
                        <MyTeam />{' '}
                      </Fragment>
                    )}
                  />{' '}
                  <Route
                    exact
                    path='/myEmail'
                    render={() => (
                      <Fragment>
                        <EmailTeam
                          getUsersForEmail={getUsersForEmail}
                          setText={setText}
                        />{' '}
                      </Fragment>
                    )}
                  />{' '}
                  <Route
                    exact
                    path='/myDynamoTable'
                    render={() => (
                      <Fragment>
                        <FetchAWS />{' '}
                        <MyDynamoTable amazonResponse={amazonResponse} />{' '}
                      </Fragment>
                    )}
                  />{' '}
                  <Route
                    exact
                    path='/user/:login'
                    render={props => (
                      <UserDetailsCard />
                    )}
                  />{' '}
                  <Route />
                </Switch>{' '}
              </div>{' '}
              <Footer />
            </div>{' '}
          </Router>{' '}
        </DataAndMethodsState>
      </AlertDialogState>
    </AlertState>
  );
};

export default App;
