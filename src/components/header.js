import React from 'react';
import AuthService from '../utils/AuthService';

const Header = (props) => {
    // console.log("Props.roomDetails: ", props.roomDetails.name);
    let header;

    if(props.location === 'app'){
        header = (
            <div className="header-wrapper">
                <div className="header-left-wrapper">
                    <div className="header-back-nav" onClick={props.onNavBackClick}>
                        <img className="header-chevron" src="../img/chevron-left.svg" alt=""/>
                    </div>
                    <h1 className="header-title">{props.roomDetails.name}</h1>
                </div>

                {props.children}
                <div className="user-details" onClick={AuthService.logout}>{AuthService.getUserDetails()}</div>
            </div>
        );
    } else {
        header = (
            <div className="header-wrapper">
                <h1 className="header-title">{props.title}</h1>
                <div className="user-details" onClick={AuthService.logout}>{AuthService.getUserDetails()}</div>
                <div
                    className="header-create-room"
                    onClick={props.onCreateRoom}
                > + </div>
            </div>

        );
    }

    return (
        <header className="header">
            {header}
        </header>
    );
};

export default Header;