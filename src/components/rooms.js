import React, {Component} from 'react';
import axios from 'axios';
import Prompt from './prompt';


import Header from './header';
import RoomList from './room_list';



class Rooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createRoom: false
        };
    }

    onCreateRoom = () => {
        this.setState({createRoom: true});
    };

    onPromptClose = () => {
        this.setState({createRoom: false});
    };

    render() {
        let prompt;
        if(this.state.createRoom){
            prompt = (
                <Prompt
                    onPromptClose={this.onPromptClose}
                />
            );
        } else {
            prompt = '';
        }

        return (
            <div className="rooms-wrapper">
                {prompt}
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