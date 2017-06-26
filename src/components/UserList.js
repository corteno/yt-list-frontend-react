import React, {Component} from 'react';
import UserListItem from './UserListItem';
import shortid from 'shortid';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';


const UserList = (props) => {
    let userListItems;
    userListItems = props.userList.map((user) => {
        //Other users can see who the speaker is
        if (props.speakers.includes(user) && props.clientUsername === user) {
            //console.log('Speaker', user);
            return (
                <UserListItem
                    key={shortid.generate()}
                    username={user}
                    speaker={true}
                    onSpeakerClick={props.onSpeakerClick}
                    speakerClickable={true}
                />
            );
        } else if (props.clientUsername === user) {
            //console.log('Not speaker but user', user);
            //You can see your own status as a speaker
            return (
                <UserListItem
                    key={shortid.generate()}
                    username={user}
                    speaker={false}
                    onSpeakerClick={props.onSpeakerClick}
                />
            );
        } else if (props.speakers.includes(user)) {
            return (
                <UserListItem
                    key={shortid.generate()}
                    username={user}
                    speaker={true}
                    speakerClickable={false}
                />
            );
        } else {
            //console.log('Not speaker and not local user', user);
            //Can't see other's people status as a not speaker, so you can't change it
            return (
                <UserListItem
                    key={shortid.generate()}
                    username={user}
                    onSpeakerClick={props.onSpeakerClick}
                    speaker={null}
                />
            );
        }


    });

    let userList;
    if (props.isMobile && props.isUserListOpen) {
        console.log('runs');
        userList = (
                <ReactCSSTransitionGroup
                    transitionName="userlist"
                    transitionEnter={true}
                    transitionEnterTimeout={500}
                    transitionLeave={true}
                    transitionLeaveTimeout={500}
                    component='ul'
                    className='user-list-wrapper'
                >
                    {userListItems}
                </ReactCSSTransitionGroup>

        );
    } else if (!props.isMobile) {
        userList = (
            <ul className="user-list-wrapper">
                {userListItems}
            </ul>

        );
    }


    return (
        <div className="user-list-container">
            {userList}
        </div>
    );


};

export default UserList;