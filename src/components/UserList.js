import React, {Component} from 'react';
import UserListItem from './UserListItem';
import shortid from 'shortid';
import AuthService from '../utils/AuthService'

const UserList = (props) => {
    let userListItems;
    userListItems = props.userList.map((user) => {
        //Other users can see who the speaker is
        if(props.speakers.includes(user)){
            //console.log('Speaker', user);
            return (
                <UserListItem
                    key={shortid.generate()}
                    username={user}
                    speaker={true}
                    onUserClick={props.onUserClick}
                />
            );
        } else if(AuthService.getUserDetails() == user){
            //console.log('Not speaker but user', user);
            //You can see your own status as a speaker
            return (
                <UserListItem
                    key={shortid.generate()}
                    username={user}
                    speaker={false}
                    onUserClick={props.onUserClick}
                />
            );
        } else {
            //console.log('Not speaker and not local user', user);
            //Can't see other's people status as a not speaker, so you can't change it
            return (
                <UserListItem
                    key={shortid.generate()}
                    username={user}
                    onUserClick={props.onUserClick}
                    speaker={null}
                />
            );
        }



    });


    return (
        <ul className="user-list-wrapper">
            {userListItems}
        </ul>
    );


};

export default UserList;