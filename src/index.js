import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router';

import App from './components/app';
import Login from './components/login';
import Rooms from './components/rooms';



ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" >
            <IndexRoute component={Login}/>
            <Route path="music" component={App}/>
            <Route path="rooms" component={Rooms}/>
        </Route>

    </Router>
), document.querySelector('.container'));