import './App.css';
import React, { Component } from 'react';
import Login from './pages/login';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard'

class App extends Component {
  render() {
    let routes = null;
    if(!this.props.isAuthenticated)
    {

      routes =(
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Redirect from="/" to="/login"/>
        </Switch>
      )
    }
    else
    {
      routes =(
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Redirect from="/" to="/dashboard"/>
        </Switch>
      )
    }
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token  
  }
}
export default connect(mapStateToProps)(App);
