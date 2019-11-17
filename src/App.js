import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import MyTeam from './components/pages/MyTeam';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
  };

  //search github users
  searchUsers = async text => {
    //console.log(text);
    this.setState({ loading: true });
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
      console.log(res.status);
      console.log(res.data);
      this.setState({ users: res.data.items, loading: false });
    } catch (err) {
      this.setState({ users: [], loading: false });
    }
  };

  getUser = async userName => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        'https://api.github.com/users/' +
          userName +
          '?client_id=' +
          process.env.REACT_APP_GITHUB_CLIENT_ID +
          '&client_secret=' +
          process.env.REACT_APP_GITHUB_CLIENT_SECRET
      );
      console.log(res.status);
      console.log(res.data);
      this.setState({ user: res.data, loading: false });
    } catch (err) {
      this.setState({ user: {}, loading: false });
    }
  };

  getUserRepos = async userName => {
    this.setState({ loading: true });
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
      console.log(res.status);
      console.log(res.data);
      this.setState({ repos: res.data, loading: false });
    } catch (err) {
      this.setState({ repos: {}, loading: false });
    }
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, user, repos } = this.state;
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
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/myTeam'
                render={props => (
                  <Fragment>
                    <MyTeam users={users} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
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
            <Alert alert={this.state.alert} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
