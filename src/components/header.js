import React from 'react';
import AuthService from '../utils/AuthService';

const Header = (props) => {
    // console.log("Props.roomDetails: ", props.roomDetails.name);
    let header;
    let headerButton;

    if(props.location === 'app'){
        if(props.isMobile){
            headerButton = (
                <div className="header-menu header-main-button" onClick={props.onMenuClick}>
                    <img className="header-menu-icon" src="../img/menu.svg" alt=""/>
                </div>
            );
        } else {
            headerButton = (
                <div className="header-back-nav header-main-button" onClick={props.onNavBackClick}>
                    <img className="header-chevron" src="../img/chevron-left.svg" alt=""/>
                </div>
            );
        }
        header = (
            <div className="header-wrapper">
                <div className="header-left-wrapper">
                    {headerButton}
                    <h1 className="header-title">{props.roomDetails.name}</h1>
                </div>

                {props.children}
                <div className="user-details" onClick={AuthService.logout}>
                    <img src="../img/user.svg" alt="" className="user-icon"/>
                </div>
            </div>
        );
    } else {
        header = (
            <div className="header-wrapper">
                <h1 className="header-title">{props.title}</h1>
                <div className="user-details" onClick={AuthService.logout}>
                    <img src="../img/user.svg" alt="" className="user-icon"/>
                </div>
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