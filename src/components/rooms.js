import React, {Component} from 'react';
import axios from 'axios';

import Header from './header';
import RoomList from './room_list';


class Rooms extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onCreateRoom = () => {
        console.log('Create room!');
    };

    render() {
        return (
            <div className="rooms-wrapper">
                <Header
                    title='Rooms'
                    onCreateRoom={this.onCreateRoom}
                />
                <div className="rooms-content-wrapper">
                    <RoomList/>
                </div>

            </div>
        );
    }

}

export default Rooms;