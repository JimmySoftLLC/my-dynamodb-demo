import React, { Fragment } from 'react';
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
import SelectTeamMenu from './components/layout/SelectTeamMenu';
import EmailTeam from './components/pages/EmailTeam';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AlertState from './context/alert/AlertState';
import AlertDialogState from './context/alertDialog/AlertDialogState';
import DataAndMethodsState from './context/dataAndMethods/dataAndMethodsState';
import './App.css';

const App = () => {
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
                        <AlertDialog />
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
                        <AlertDialog />
                        <EmailTeam />{' '}
                      </Fragment>
                    )}
                  />{' '}
                  <Route
                    exact
                    path='/myDynamoTable'
                    render={() => (
                      <Fragment>
                        <AlertDialog />
                        <FetchAWS />{' '}
                        <MyDynamoTable />{' '}
                      </Fragment>
                    )}
                  />{' '}
                  <Route
                    exact
                    path='/user/:login'
                    render={props => (
                      <UserDetailsCard {...props} />
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
