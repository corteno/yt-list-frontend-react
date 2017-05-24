import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
import YTFormat from 'youtube-duration-format';


import SearchBar from './search_bar';
import VideoList from './video_list';
import PlayList from './playlist';
import YoutubePlayer from './youtube_player';

const API_KEY = 'AIzaSyDKSHOjEWO3fWq5MWLrJmavVJd7MucgtuQ';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
const ROOT_URL_VIDEOS = 'https://www.googleapis.com/youtube/v3/videos';
const MAX_RESULTS = 15;

const ROOT_API_URL = 'https://yt-music-api.herokuapp.com';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            playlist: [],
            currentVideo: {}
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
        axios.get(`${ROOT_API_URL}/songs`)
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


    //Use an arrow function if you need to use another function in the same scope
    onVideoSelect = (video) => {
        axios.post(`${ROOT_API_URL}/song`, video)
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

        axios.delete(`${ROOT_API_URL}/song/${playlistItem._id}`)
            .then((response) => {
                if (response.status !== 200) {
                    return console.error(response);
                }

                this.getPlayListItems();
                //console.log(response);
            })
            .catch((e) => {
                //console.error(e);
            });


        //console.log('Should delete ' + playlistItem.id, playlistItem.title);
    };

    playNextInList = () => {
        this.onPlayListItemDelete(this.state.currentVideo);
        console.log('Play next');
    };




    //Getting playlist items on startup
    componentWillMount() {
        this.getPlayListItems();
    };


    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term);
        }, 300);



        return (
            <div className="app-wrapper">
                <SearchBar onSearchTermChange={videoSearch}/>
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