import React from 'react';
import RoomListItem from './room_list_item';

const RoomList = (props) => {

    return(
        <ul className="room-list">
            <RoomListItem/>
            <RoomListItem/>
        </ul>
    );
};

export default RoomList;