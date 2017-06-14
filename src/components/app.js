import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
import YTFormat from 'youtube-duration-format';
import {browserHistory} from 'react-router';
import io from 'socket.io-client';

import SearchBar from './search_bar';
import VideoList from './video_list';
import PlayList from './playlist';
import YoutubePlayer from './youtube_player';
import Header from './header';
import AuthService from '../utils/AuthService';
import UserList from './UserList';

const API_KEY = 'AIzaSyDKSHOjEWO3fWq5MWLrJmavVJd7MucgtuQ';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
const ROOT_URL_VIDEOS = 'https://www.googleapis.com/youtube/v3/videos';
const MAX_RESULTS = 20;


//make it so it's localhost:3000 for local testing
import RootApiUrl from '../utils/RootApiUrl';
//const socket = io.connect(RootApiUrl);
//Try having socket here

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            playlist: [],
            currentVideo: {},
            roomDetails: {},
            socket: io.connect(RootApiUrl),
            userList: [],
            userDetails: {
                username: AuthService.getUserDetails()
            }
        };

    }


    //Video searching function
    videoSearch(term) {
        var params = {
            part: 'snippet',
            key: API_KEY,
            q: term,
            type: 'video',
            maxResults: MAX_RESULTS
        };

        //Searches for the videos with the Youtube API
        axios.get(ROOT_URL, {params: params})
            .then((response) => {
                var videosArray = [];


                //Search result
                response.data.items.map((video) => {
                    var videoDetails = {};

                    videoDetails.title = video.snippet.title;
                    videoDetails.thumbnail = video.snippet.thumbnails.default.url;
                    videoDetails.id = video.id.videoId;

                    videosArray.push(videoDetails);
                });


                //Getting Video durations
                var IDs = '';
                videosArray.map((video) => {
                    IDs += video.id + ',';
                });

                var videoParams = {
                    part: 'contentDetails',
                    key: API_KEY,
                    id: IDs
                };

                axios.get(ROOT_URL_VIDEOS, {params: videoParams})
                    .then((response) => {

                        for (var i = 0; i < videosArray.length; i++) {
                            videosArray[i].duration = YTFormat(response.data.items[i].contentDetails.duration);
                        }

                        //console.log(videosArray);
                        this.setState({
                            videos: videosArray
                        });

                    });

            })
            .catch((error) => {
                console.error(error);
            });


    }

    getPlayListItems() {

        axios.get(`${RootApiUrl}/songs/${this.props.params.roomId}`)
            .then((response) => {
                let songsArray = [];
                response.data.songs.map((song) => {
                    songsArray.push(song);
                });

                this.setState({playlist: songsArray});
                //Set the current video to the first one
                this.setState({currentVideo: this.state.playlist[0]});
                //console.log(this.state.playlist);

            })
            .catch((e) => {
                return console.log(e);
            });


    };

    getRoomDetails() {
        axios.get(`${RootApiUrl}/room/${this.props.params.roomId}`)
            .then((res) => {
                this.setState({roomDetails: res.data[0]});

            })
            .catch((e) => {
                console.log(e);
            });
    };

    setUserDetails() {
        this.setState({userDetails: {username: AuthService.getUserDetails()}});
    }

    setInitialSpeakerValue = () => {
        if(this.state.roomDetails.speakers.includes(this.state.userDetails.username)){
            this.setState({isSpeaker: true}, () => {
                //console.log("Setting initial isSpeaker", this.state.isSpeaker);
            });
        } else {
            this.setState({isSpeaker: false}, () => {
                //console.log("Setting initial isSpeaker", this.state.isSpeaker);
            });
        }
    };

    setSpeakers = (speakersArray) => {
        let currentRoomDetails = this.state.roomDetails;
        //console.log(currentRoomDetails.speakers);
        currentRoomDetails.speakers = speakersArray;

        //console.log('Before state set:', this.state.roomDetails);
        this.setState({roomDetails: currentRoomDetails}, () => {
            if (this.state.roomDetails.speakers.includes(this.state.userDetails.username)) {
                this.setState({isSpeaker: true}, () => {
                    //console.log("Setting isSpeaker", this.state.isSpeaker);
                    this.onSpeakerChange(this.state.isSpeaker);
                });
            } else {
                this.setState({isSpeaker: false}, () => {
                    //console.log("Setting isSpeaker", this.state.isSpeaker);
                    this.onSpeakerChange(this.state.isSpeaker);
                });
            }
        });
    };


    //Use an arrow function if you need to use another function in the same scope
    onVideoSelect = (video) => {
        video.roomId = this.props.params.roomId;
        axios.post(`${RootApiUrl}/song`, video)
            .then((response) => {
                if (response.status !== 200) {
                    return console.error(response.status);
                }

                //console.log('Success');
                //Refresh playlist - Need for an arrow function
                this.getPlayListItems();

                this.refreshPlaylistForOthers();

            })
            .catch((e) => {
                console.error(e);
            });
    };

    refreshPlaylistForOthers = () => {
        this.state.socket.emit('refresh', {
            type: 'playlist',
            roomId: this.state.roomDetails.id
        });
    };



    //Deleting
    onPlayListItemDelete = (playlistItem) => {
        console.log();
        axios.delete(`${RootApiUrl}/song/${this.props.params.roomId}/${playlistItem._id}`)
            .then((response) => {
                if (response.status !== 200) {
                    return console.error(response);
                }

                this.getPlayListItems();

                this.refreshPlaylistForOthers();
                //console.log(response);
            })
            .catch((e) => {
                console.error(e);
            });


        //console.log('Should delete ' + playlistItem.id, playlistItem.title);
    };

    playNextInList = () => {
        this.onPlayListItemDelete(this.state.currentVideo);
        //console.log('Play next');
    };

    setUserList = (userArray) => {
        this.setState({userList: userArray});
    };

    onNavBackClick = () => {
        this.state.socket.emit('unsubscribe', {
            roomId: this.state.roomDetails.id,
            username: AuthService.getUserDetails()
        }, () => {
            console.log('Disconnect');
        });


        browserHistory.push('/');
    };

    onSpeakerClick = (user) => {
        //console.log('Speaker clicked', this.state.roomDetails.speakers, this.state.userDetails.username);

        //Checking if the client is speaker
        if (this.state.roomDetails.speakers.includes(this.state.userDetails.username) && user === this.state.userDetails.username) {
            //If the client is a speaker
            //console.log(`Toggle speaker off for ${user}`, this.state.roomDetails.speakers);
            this.state.socket.emit('removeSpeaker', {
                roomId: this.state.roomDetails.id,
                username: this.state.userDetails.username
            });

        } else if (user === this.state.userDetails.username) {
            //If the client is not a speaker
            //console.log(`Toggle speaker on for ${user}`, this.state.roomDetails.speakers);
            this.state.socket.emit('addSpeaker', {
                roomId: this.state.roomDetails.id,
                username: this.state.userDetails.username
            });
        }

    };

    onSpeakerChange = (isSpeaker) => {
        return isSpeaker;
    };

    //Getting playlist items on startup
    componentWillMount() {
        this.getPlayListItems();
        this.getRoomDetails();
        this.setUserDetails();

    };

    componentDidMount() {
        const checkVariable = () => {
            if (this.state.roomDetails !== undefined) {
                /*console.log(this.state.roomDetails.id);*/
                //console.log("Room details", this.state.roomDetails);

                this.state.socket.emit('subscribe', {
                    roomId: this.state.roomDetails.id,
                    username: this.state.userDetails.username
                });

                this.state.socket.on(`refresh-${this.state.roomDetails.id}`, (data) => {
                    //console.log(`refresh-${this.state.roomDetails.id}`);
                    if (data.type === 'userlist') {
                        //Refreshing the userlist
                        //console.log("Refresh userlist", data.userlist);
                        this.setUserList(data.userlist);
                    } else if (data.type === 'playlist') {
                        //Refresing playlist
                        //console.log('playlist refresh');
                        this.getPlayListItems();
                    } else if (data.type === 'speakers') {
                        //Refreshing speakers list
                        //console.log("Speakers list", data.speakers);
                        this.setSpeakers(data.speakers)
                    }


                });

                /*this.state.socket.emit(this.state.roomDetails.id, {
                 message: `Hello from the Client`
                 });*/
                //console.log("RoomID:", this.state.roomDetails.id);
                this.state.socket.on(this.state.roomDetails.id, (data) => {
                    //const userlist = data.room.userlist;
                    //console.log("From server:", data);
                    this.setUserList(data.userlist);
                });

            }
            //Setting the initial isSpeaker state
            this.setInitialSpeakerValue();

        };
        setTimeout(checkVariable, 500);


    };


    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term);
        }, 300);

        /*if(this.state.userList.length > 0){
         console.log(this.state.userList);
         }*/


        return (
            <div className="app-wrapper">
                <Header
                    roomDetails={this.state.roomDetails}
                    location={'app'}
                    onNavBackClick={this.onNavBackClick}
                >
                    <SearchBar onSearchTermChange={videoSearch}/>
                </Header>

                <div className="content-wrapper">
                    <UserList
                        userList={this.state.userList}
                        speakers={this.state.roomDetails.speakers}
                        onSpeakerClick={this.onSpeakerClick}
                        clientUsername={this.state.userDetails.username}
                    />
                    <div className="playlist-container">
                        <YoutubePlayer
                            currentVideo={this.state.currentVideo}
                            playNextInList={this.playNextInList}
                            isSpeaker={this.state.isSpeaker}
                            onNextClick={this.onPlayListItemDelete}
                            currentSong={this.state.currentVideo}
                        />
                        <PlayList
                            playlist={this.state.playlist}
                            onPlayListItemDelete={this.onPlayListItemDelete}
                        />
                    </div>

                    <VideoList
                        onVideoSelect={this.onVideoSelect}
                        videos={this.state.videos}
                    />


                </div>

            </div>
        );
    }
}
;


export default App;