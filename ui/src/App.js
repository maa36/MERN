import React, { Component } from "react";
import "./App.css";
import {Redirector} from 'react-router-redirect';
import {
  Route,
  Switch,
  BrowserRouter
} from "react-router-dom";
import Dashboard from "./login/dashbords";
import Signup from "./login/signup"

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./Store";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./";
  }
}
class App extends Component {
 
  
  render() {

    return (
      <div>
        <BrowserRouter>
        <Redirector />
        
            <Route path="/" exact component={Signup}  />
            
            <Switch>     
            <Route path="/Dashboard" exact component={Dashboard}  />        
          </Switch>
        </BrowserRouter>
       
   
      </div>
    );
  }
}

export default App;