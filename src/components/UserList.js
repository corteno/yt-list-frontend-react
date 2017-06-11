import React, {Component} from 'react';
import UserListItem from './UserListItem';
import shortid from 'shortid';

const UserList = (props) => {
    let userListItems;

    userListItems = props.userList.map((user) => {
        return (
            <UserListItem
                key={shortid.generate()}
                username={user}
            />
        );
    });


    return (
        <ul className="user-list-wrapper">
            {userListItems}
        </ul>
    );


};

export default UserList;