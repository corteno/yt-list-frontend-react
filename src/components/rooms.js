import React, {Component} from 'react';
import axios from 'axios';
import Prompt from './prompt';
import AuthService from '../utils/AuthService';
import shortid from 'shortid';
import {browserHistory} from 'react-router';

import Header from './header';
import RoomList from './room_list';


const ROOT_API_URL = 'https://yt-music-api.herokuapp.com';

class Rooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createRoom: false,
            rooms: [],
            socket: this.props.route.socket
        };
    }


    onCreateRoom = () => {
        this.setState({createRoom: true});
    };

    onPromptClose = () => {
        this.setState({createRoom: false});
    };

    onPromptSubmit = (data) => {
        let roomData = {
            name: data.roomDetails.roomName,
            password: data.roomDetails.password,
            owner: AuthService.getUserDetails(),
            isPublic: !data.privateRoom,
            id: shortid.generate()
        };

        axios.post(`${ROOT_API_URL}/room`, roomData)
            .then((response) => {
                this.updateRoomsState(response.data);

                this.state.socket.emit('createRoom', {refresh: true});


            })
            .catch((error) => {
                console.log(error);
            });


        //console.log(roomData);
    };

    updateRoomsState = (data) => {
        let currentRoomState = this.state.rooms;
        currentRoomState.push(data);
        this.setState({rooms: currentRoomState});

        /*let roomsArray = [];
         roomsArray.push(room);
         this.setState({rooms: roomsArray});
         console.log("Update rooms state: ", this.state.rooms);*/

    };

    getRooms = () => {
        axios.get(`${ROOT_API_URL}/rooms`)
            .then((response) => {

                let roomsArray = [];
                response.data.rooms.map((room) => {
                    roomsArray.push(room);
                });

                //console.log("get rooms:", roomsArray);
                this.setState({rooms: roomsArray});
            })
            .catch((error) => {
                console.log(error);
            });

    };

    onRoomClick = (id) => {
        browserHistory.push(`/room/${id}`);
        console.log(`Clicked on room ${id}`);
    };


    componentWillMount() {
        //Changing the title of the page
        document.title = "Rooms - Youtube Playlist";
    }

    componentDidMount() {
        //Socket.io listener
        this.state.socket.on('rooms', (data) => {
            console.log(data);

            if(data.refresh){
                this.getRooms();
            }


        });
        this.getRooms();
    }

    render() {
        let prompt;
        if (this.state.createRoom) {
            prompt = (
                <Prompt
                    onPromptClose={this.onPromptClose}
                    onPromptSubmit={this.onPromptSubmit}
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
                    <RoomList
                        rooms={this.state.rooms}
                        onRoomClick={this.onRoomClick}
                    />
                </div>

            </div>
        );
    }

}

export default Rooms;