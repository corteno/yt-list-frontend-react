import React, {Component} from 'react';
import Youtube from 'react-youtube';


class YoutubePlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSpeaker: this.props.isSpeaker
        }
    }

    onReady = (event) =>{
        this.setState({player: event.target}, () => {
            //console.log(this.state.player);
        });
    };

    onChange = () => {
        event.target.mute();
    };


    
    componentDidMount() {
        //console.log("isSpeaker", this.props.isSpeaker);
    }

    componentDidUpdate(){

        if(this.props.isSpeaker !== undefined && this.state.player !== undefined){
            if(this.props.isSpeaker === true){
                this.state.player.unMute();
                //console.log("Speaker:");
            } else {
                this.state.player.mute();
                //console.log("Muted");
            }

        }
    }

    render() {
        let opts = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                //Enable once done testing
                //autoplay: 1
            }
        };

        let currentVideoId;
        if(!this.props.currentVideo){
            currentVideoId = 'eVtNcCwMY58';
        } else {
            currentVideoId = this.props.currentVideo.id;
        }




        return (
            <Youtube
                videoId={currentVideoId}
                opts={opts}
                className={'youtube-player'}
                onEnd={this.props.playNextInList}
                onReady={this.onReady}
                onChange={this.onChange}
            />

        );
    }
}

export default YoutubePlayer;