import React from 'react';
import AuthService from '../utils/AuthService';

const Header = (props) => {
    return (
        <header className="header">
            <h1 className="header-title">{props.title}</h1>
            <div className="user-details" onClick={AuthService.logout}>{AuthService.getUserDetails()}</div>
            <div
                className="header-create-room"
                onClick={props.onCreateRoom}
            > + </div>
        </header>

    );
};

export default Header;