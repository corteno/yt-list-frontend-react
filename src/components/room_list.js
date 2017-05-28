import React from 'react';
import RoomListItem from './room_list_item';

const RoomList = (props) => {
    const roomListItems = props.rooms.map((roomItem) => {
        return (
            <RoomListItem
                key={roomItem._id}
                id={roomItem.id}
                roomName={roomItem.name}
                owner={roomItem.owner}
                isPublic={roomItem.isPublic}
                onRoomClick={props.onRoomClick}
            />
        );
    });
    return(
        <ul className="room-list">
            {roomListItems}
        </ul>
    );
};

export default RoomList;