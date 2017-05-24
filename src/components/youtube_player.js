import React, {Component} from 'react';
import ReactYoutube from 'react-youtube';


class YoutubePlayer extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const opts = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                //Enable once done testing
                autoplay: 1
            }
        };

        let currentVideoId;
        if(!this.props.currentVideo){
            currentVideoId = 'eVtNcCwMY58';
        } else {
            currentVideoId = this.props.currentVideo.id;
        }


        return (
            <ReactYoutube
                videoId={currentVideoId}
                opts={opts}
                className={'youtube-player'}
                onEnd={this.props.playNextInList}
            />

        );
    }
}

export default YoutubePlayer;