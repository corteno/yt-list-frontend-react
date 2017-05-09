import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import axios from 'axios';
import YTFormat from 'youtube-duration-format';


import SearchBar from './components/search_bar';
import VideoList from './components/video_list';

const API_KEY = 'AIzaSyDKSHOjEWO3fWq5MWLrJmavVJd7MucgtuQ';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
const ROOT_URL_VIDEOS = 'https://www.googleapis.com/youtube/v3/videos';
const MAX_RESULTS = 10;


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: []
        };


    }


    videoSearch(term) {
        var params = {
            part: 'snippet',
            key: API_KEY,
            q: term,
            type: 'video',
            maxResults: MAX_RESULTS
        };


        axios.get(ROOT_URL, {params: params})
            .then((response) => {
                var videosArray = [];


                //Search result
                response.data.items.map((video) => {
                    var videoDetails = {
                        etag: '',
                        id: '',
                        title: '',
                        duration: '',
                        thumbnail: ''
                    };

                    videoDetails.etag = video.etag;
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

                        for(var i = 0; i < videosArray.length; i++){
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

    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term);
        }, 300);

        return (
            <div className="app-wrapper">
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoList
                    videos={this.state.videos}
                />
            </div>
        );
    }
}
;


ReactDOM.render(<App />, document.querySelector('.container'));