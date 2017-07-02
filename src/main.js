import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Login from './components/Login'
import Homepage from './components/Homepage'
require("./../css/style.css");
import * as jwt from 'jsonwebtoken'; 

const checkAuth=function check_auth(nextState, replace) {
	let loggedUser = jwt.decode(sessionStorage.getItem('loggedUser'));
  	if (!loggedUser || loggedUser === null) {
	    replace({
	      pathname: '/login',
	      state: { nextPathname: nextState.location.pathname }
	    })
	}
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={Login} >
    	<IndexRoute component={Login}/> 
      	<Route path="/login" component={Login}/>
    </Route>
    <Route path="/homepage/:username" component={Homepage} onEnter={checkAuth} />
  </Router>
), document.getElementById('root'))
