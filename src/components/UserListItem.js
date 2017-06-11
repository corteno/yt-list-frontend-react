import React from 'react';

const UserListItem = (props) => {
    return (
        <li className="user-list-item">
            <div className="user-list-avatar">

            </div>
            <p className="user-list-username">
                {props.username}
            </p>
        </li>
    );

};

export default UserListItem;