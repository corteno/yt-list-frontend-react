import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import io from 'socket.io-client';

import App from './components/app';
import Login from './components/login';
import Rooms from './components/rooms';
import NotFound from'./components/404';

import AuthService from './utils/AuthService';
import RootApiUrl from './utils/RootApiUrl';

let routes;
/*let isMobile;

if(window.innerWidth <= 600){
    isMobile = true;
} else {
    isMobile = false;
}

window.addEventListener("resize", () => {
    if(window.innerWidth <= 600){
        isMobile = true;
    } else {
        isMobile = false;
    }
    console.log(isMobile);
});*/

if (AuthService.isLoggedIn()) {
    routes = (
        <Route path="/">
            <IndexRoute component={Rooms} />
            <Route path="/rooms" component={Rooms} />
            <Route path="/room/:roomId" component={App} />

            {/*Only for testing*/}
            <Route path="/login" component={Login}/>
            {/*Only for testing*/}
            <Route path="/*" component={NotFound}/>

        </Route>
    );
} else {
    routes = (
        <Route path="/">
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