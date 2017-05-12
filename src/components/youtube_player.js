import React, {Component} from 'react';
import youtubePlayer from 'youtube-player';


class YoutubePlayer extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        function ytPlayer() {
            let ytPlayer = youtubePlayer('video-player');
             ytPlayer.loadVideoById('f4kqIruQcvQ');
             ytPlayer.playVideo();

             console.log(ytPlayer);
             ytPlayer
             .stopVideo()
             .then(() => {
    
             });
            console.log('asd');


        }


        return (
            <div className="youtube-player">
                <div id="video-player"></div>
                {ytPlayer()}
            </div>
        );
    }
}

export default YoutubePlayer;