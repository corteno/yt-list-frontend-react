import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

const SideMenu = (props) => {

        let sideMenu;
        let sideMenuBg;
        if (props.isSideMenuOpen) {
            sideMenu = (
                <div className="side-menu col" key={'side-menu'}>
                    <h1 className="side-menu-title">
                        {props.roomName}
                    </h1>
                    <ul className="side-menu-list col">
                        <li className="side-menu-item" onClick={() => {
                            props.onNavBackClick()
                        }}>
                            <img src="../img/list.svg" alt="" className="side-menu-item-icon"/>
                            <p>Rooms</p>
                        </li>
                        <li className="side-menu-item" onClick={() => {
                            console.log('bring up users');
                        }}>
                            <img src="../img/users.svg" alt="" className="side-menu-item-icon users-icon"/>
                            <p>Users</p>
                        </li>
                    </ul>
                </div>
            );


            sideMenuBg = (
                <div className="side-menu-bg" onClick={() => {
                    props.toggleSideMenu()
                }}>
                </div>
            );
        }




        return (
            <div className="side-menu-wrapper">

                <ReactCSSTransitionGroup
                    transitionName="side-menu"
                    /*transitionAppear={true}
                     transitionAppearTimeout={500}*/
                    transitionEnter={true}
                    transitionEnterTimeout={500}
                    transitionLeave={true}
                    transitionLeaveTimeout={500}
                    component='div'
                    className='side-menu-container'
                >
                    {sideMenu}

                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName="side-menu-bg"
                    transitionEnter={true}
                    transitionEnterTimeout={500}
                    transitionLeave={true}
                    transitionLeaveTimeout={500}
                    component='div'
                    className='side-menu-bg-wrapper'
                >
                    {sideMenuBg}

                </ReactCSSTransitionGroup>
            </div>

        );


    }
;

export default SideMenu;