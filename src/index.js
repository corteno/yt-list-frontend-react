import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router';

import App from './components/app';
import Login from './components/login';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/">

            <IndexRoute component={Login}/>
            <Route path="/music" component={App}/>

        </Route>
    </Router>
), document.querySelector('.container'));