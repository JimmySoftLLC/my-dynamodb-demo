import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import FetchAWS from './components/users/FetchAWS';
import UserDetailsCard from './components/users/UserDetailsCard';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import MyTeam from './components/pages/MyTeam';
import MyDynamoTable from './components/pages/MyDynamoTable';
import Footer from './components/layout/Footer';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    amazonResponse: ' ',
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
    my_users: [],
  };

  //search github users
  searchUsers = async text => {
    //console.log(text);
    this.setState({ loading: true });
    this.setState({ buttonType: false });
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
      this.setState({ users: res.data.items, loading: false });
    } catch (err) {
      this.setState({ users: [], loading: false });
    }
  };

  getUser = async userName => {
    this.setState({ loading: true });
    this.setState({ buttonType: false });
    try {
      const res = await axios.get(
        'https://api.github.com/users/' +
          userName +
          '?client_id=' +
          process.env.REACT_APP_GITHUB_CLIENT_ID +
          '&client_secret=' +
          process.env.REACT_APP_GITHUB_CLIENT_SECRET
      );
      this.setState({ user: res.data, loading: false });
    } catch (err) {
      this.setState({ user: {}, loading: false });
    }
  };

  // scanDynamoDB = async () => {
  //   try {
  //     const res = await axios.get(
  //       'https://22j5hgzvof.execute-api.us-east-1.amazonaws.com/production/restapi?TableName=my_open_source_team'
  //     );
  //     console.log(res.data);
  //     let myResData = res.data;
  //     let myMessage = 'Number of teams: ' + myResData.Count + '\n';
  //     myMessage += '----------------------\n';
  //     for (var i = 0; i < myResData.Count; i++) {
  //       myMessage +=
  //         'Team: ' +
  //         myResData.Items[i].team_id +
  //         ' Name: ' +
  //         myResData.Items[i].team_name +
  //         '\n';
  //     }
  //     this.setState({ amazonResponse: myMessage });
  //   } catch (err) {
  //     this.setState({ amazonResponse: '' });
  //   }
  // };

  scanDynamoDB = async TableName => {
    try {
      const res = await axios.post(
        'https://22j5hgzvof.execute-api.us-east-1.amazonaws.com/production/restapi',
        {
          myBody: {
            TableName: TableName,
          },
          myMethod: 'scan',
        }
      );
      console.log(res.data);
      let myResData = res.data;
      let myMessage = 'Number of teams: ' + myResData.Count + '\n';
      myMessage += '----------------------\n';
      for (var i = 0; i < myResData.Count; i++) {
        myMessage +=
          'Team: ' +
          myResData.Items[i].team_id +
          ' Name: ' +
          myResData.Items[i].team_name +
          '\n';
      }
      this.setState({ amazonResponse: myMessage });
    } catch (err) {
      this.setState({ amazonResponse: '' });
    }
  };

  putItemDynamoDB = async (TableName, team_id, team_name, team_data) => {
    try {
      const res = await axios.post(
        'https://22j5hgzvof.execute-api.us-east-1.amazonaws.com/production/restapi',
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
        }
      );
      console.log(res.data);
      //this.setState({ amazonResponse: myMessage });
    } catch (err) {
      //this.setState({ amazonResponse: '' });
    }
  };

  deleteItemDynamoDB = async (TableName, team_id) => {
    try {
      const res = await axios.post(
        'https://22j5hgzvof.execute-api.us-east-1.amazonaws.com/production/restapi',
        {
          myMethod: 'deleteItem',
          myBody: {
            TableName: TableName,
            Key: {
              team_id: team_id,
            },
          },
        }
      );
      console.log(res.data);
      //this.setState({ amazonResponse: myMessage });
    } catch (err) {
      //this.setState({ amazonResponse: '' });
    }
  };

  getUserRepos = async userName => {
    this.setState({ loading: true });
    this.setState({ buttonType: false });
    try {
      const res = await axios.get(
        'https://api.github.com/users/' +
          userName +
          '/repos?per_page=5&sort=created:asc' +
          '&client_id=' +
          process.env.REACT_APP_GITHUB_CLIENT_ID +
          '&client_secret=' +
          process.env.REACT_APP_GITHUB_CLIENT_SECRET
      );
      this.setState({ repos: res.data, loading: false });
    } catch (err) {
      this.setState({ repos: {}, loading: false });
    }
  };

  removeUserFromTeam = async login => {
    console.log('Remove item: ' + login);
    let tempUser = [];
    for (var i = 0; i < this.state.my_users.length; i++) {
      if (this.state.my_users[i].login !== login) {
        tempUser.push(this.state.my_users[i]);
      }
    }
    this.setState({ my_users: tempUser });
  };

  addUserToTeam = async myUser => {
    let foundDuplicate = false;
    for (var j = 0; j < this.state.my_users.length; j++) {
      if (this.state.my_users[j].login === myUser.login) {
        foundDuplicate = true;
      }
    }
    if (foundDuplicate) {
      console.log('found duplicate');
      this.setState({
        alert: {
          msg:
            'Developer already in My Team, human cloning not currently implemented.',
          type: 'light',
        },
      });
      setTimeout(() => this.setState({ alert: null }), 5000);
    } else {
      let tempUser = [];
      tempUser = this.state.my_users.slice(0);
      tempUser.push(myUser);
      let tempUser2 = [];
      for (var i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i].login !== myUser.login) {
          tempUser2.push(this.state.users[i]);
        }
      }
      this.setState({ my_users: tempUser });
      this.setState({ users: tempUser2 });
    }
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const {
      users,
      loading,
      user,
      repos,
      my_users,
      amazonResponse,
    } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Alert alert={this.state.alert} />
                    <Search
                      setAlert={this.setAlert}
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                    />
                    <Users
                      loading={loading}
                      users={users}
                      my_users={my_users}
                      removeUserFromTeam={this.removeUserFromTeam}
                      addUserToTeam={this.addUserToTeam}
                      onMyTeamPage={false}
                    />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/myTeam'
                render={props => (
                  <Fragment>
                    <MyTeam
                      my_users={my_users}
                      removeUserFromTeam={this.removeUserFromTeam}
                      addUserToTeam={this.addUserToTeam}
                      onMyTeamPage={true}
                    />
                  </Fragment>
                )}
              />
              <Route
                exact
                path='/myDynamoTable'
                render={props => (
                  <Fragment>
                    <FetchAWS scanDynamoDB={this.scanDynamoDB} />
                    <MyDynamoTable amazonResponse={amazonResponse} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <UserDetailsCard
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
