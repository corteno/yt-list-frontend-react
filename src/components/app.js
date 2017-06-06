import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
import YTFormat from 'youtube-duration-format';
import {browserHistory} from 'react-router';


import SearchBar from './search_bar';
import VideoList from './video_list';
import PlayList from './playlist';
import YoutubePlayer from './youtube_player';
import Header from './header';

const API_KEY = 'AIzaSyDKSHOjEWO3fWq5MWLrJmavVJd7MucgtuQ';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
const ROOT_URL_VIDEOS = 'https://www.googleapis.com/youtube/v3/videos';
const MAX_RESULTS = 20;


//make it so it's localhost:3000 for local testing
import RootApiUrl from '../utils/RootApiUrl';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            playlist: [],
            currentVideo: {},
            roomDetails: {},
            socket: this.props.route.socket,
            userList: []
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

            })
            .catch((e) => {
                console.error(e);
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

    onNavBackClick = () => {
        this.state.socket.emit('leaveRoom', {room: this.state.roomDetails.id});

        browserHistory.goBack();
    };


    //Getting playlist items on startup
    componentWillMount() {
        this.getPlayListItems();
        this.getRoomDetails();


        this.state.socket.on('test', (data) => {
            console.log("test", data);
        });

    };

    componentDidMount() {
        const checkVariable = () => {
            if (this.state.roomDetails !== undefined) {
                //console.log("Room details loaded");

                this.state.socket.emit('enterRoom', this.state.roomDetails.id);
                this.state.socket.on('enterRoom', (data) => {
                    console.log("Room ID", data);
                    //Sender
                    this.state.socket.emit(this.state.roomDetails.id, {
                        message: `User entered room ${this.state.roomDetails.id}`
                    });

                    //Listener
                    this.state.socket.on(this.state.roomDetails.id, (data) => {
                        console.log("Custom ID", data);
                    });

                });


            }
        };
        setTimeout(checkVariable, 500);
    };


    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term);
        }, 300);

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
                    <div className="spacer"></div>
                    <div className="playlist-container">
                        <YoutubePlayer
                            currentVideo={this.state.currentVideo}
                            playNextInList={this.playNextInList}
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