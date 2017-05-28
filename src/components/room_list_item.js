import React from 'react';

const RoomListItem = (props) => {
    let PasswordProtected;
    if(!props.isPublic){
        PasswordProtected = (
            <div className="private-lock"></div>
        );
    }

    return (
        <li className="room-list-item list-item" onClick={() => {props.onRoomClick(props.id)}}>
            <div className="room-details">
                <div className="room-name">{props.roomName}</div>
                <div className="room-owner">{props.owner}</div>
            </div>
            <div className="room-private">{PasswordProtected}</div>
        </li>
    );
};


export default RoomListItem;