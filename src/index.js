import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './components/app';
import Login from './components/login';
import Rooms from './components/rooms';
import NotFound from'./components/404';

import AuthService from './utils/AuthService';

let routes;

//console.log(AuthService.isLoggedIn());

if(AuthService.isLoggedIn()){
    routes = (
        <Route path="/" >
            <IndexRoute component={Rooms}/>
            <Route path="music" component={App}/>
            <Route path="rooms" component={Rooms}/>
            <Route path="*" component={NotFound}/>

            {/*Only for testing*/}
            <Route path="login" component={Login}/>
            {/*Only for testing*/}



        </Route>
    );
} else {
    routes = (
        <Route path="/" >
            <IndexRoute component={Login}/>
            <Route path="*" component={NotFound}/>
        </Route>
    );
}


ReactDOM.render((
    <Router history={browserHistory}>
        {routes}
    </Router>
), document.querySelector('.container'));