import React from 'react';
import Navbar from './components/layout/Navbar';
import UserDetailsCard from './components/users/UserDetailsCard';
import About from './components/pages/About';
import FindDevelopers from './components/pages/FindDevelopers';
import MyTeam from './components/pages/MyTeam';
import MyDynamoTable from './components/pages/MyTable';
import Footer from './components/layout/Footer';
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
                  <Route exact path='/findDevelopers' component={FindDevelopers} />{' '}
                  <Route exact path='/about' component={About} />{' '}
                  <Route exact path='/' component={MyTeam} />{' '}
                  <Route exact path='/myEmail' component={EmailTeam} />{' '}
                  <Route exact path='/myDynamoTable' component={MyDynamoTable} />{' '}
                  <Route exact path='/user/:login' component={UserDetailsCard} />{' '}
                  <Route component={MyTeam} />
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
