import React from 'react';

const RoomListItem = (props) => {
    return (
        <li className="room-list-item list-item">
            <div className="room-details">
                <div className="room-name">{props.roomName}</div>
                <div className="room-owner">{props.owner}</div>
                {/* MAKE PRIVATE LOCK AND PASSWORD PROMPT*/}
            </div>

        </li>
    );
};


export default RoomListItem;