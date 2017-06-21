import React, {Component} from 'react';
import Youtube from 'react-youtube';
import PlayerController from './player_controller';


class YoutubePlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSpeaker: this.props.isSpeaker,
            isPlaying: false,
            currentTime: 0,
            videoDuration: 0,
            currentVolume: 0
        }
    }

    onReady = (event) => {
        this.setState({player: event.target}, () => {
            //console.log(this.state.player);
        });
    };

    onPlay = (event) => {
        //console.log('playing');
        this.setState({isPlaying: true}, () => {
        });
        this.setState({videoDuration: Math.round(this.state.player.getDuration())});


        //Setting Initial volume
        this.setState({currentVolume: this.state.player.getVolume()}, () => {
            //console.log("Current volume YT", this.state.currentVolume);
        });

        this.setCurrentTime(Math.round(this.state.player.getCurrentTime()));
        //Checking for the current time of the video every 500ms
        this.interval = setInterval(() => {
            //console.log("Current time", this.state.currentTime);
            this.setCurrentTime(Math.round(this.state.player.getCurrentTime()));
        }, 1000);


    };

    onPause = (event) => {
        //console.log('paused');
        this.setState({isPlaying: false});
        clearInterval(this.interval);
    };

    onPlayPauseClick = () => {
        if (this.state.isPlaying) {
            this.setState({isPlaying: false}, () => {
                this.state.player.pauseVideo();
            });
        } else {
            this.setState({isPlaying: true}, () => {
                this.state.player.playVideo();
            });
        }
        /*console.log(this.state.isPlaying);*/
    };

    /*onStateChange = () => {
     console.log('change');
     };*/

    setCurrentTime = (currentTime) => {
        this.setState({currentTime}, () => {
            //console.log(this.state.currentTime);
        });
    };

    onEnd = () => {
        this.props.playNextInList();

        this.setState({isPlaying:false});
    };

    seekTo = (value) => {
        //console.log("Seek to:", value);
        this.state.player.seekTo(value);
    };

    setVolume = (value) => {
        //console.log(value);
        if(this.state.player){
            if(value > 0){
                this.setState({currentVolume: value}, () => {
                    this.state.player.unMute();
                    this.state.player.setVolume(value);
                });

            } else if(value === 0) {
                this.setState({currentVolume: value}, () => {
                    this.state.player.mute();
                    this.state.player.setVolume(value);
                });

            }
        }


    };


    componentDidMount() {
        //console.log("isSpeaker", this.props.isSpeaker);
    }

    componentDidUpdate() {
        if (this.props.isSpeaker !== undefined && this.state.player !== undefined) {
            if (this.props.isSpeaker === true) {
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
                //autoplay: 1,
                controls: 0,
                showinfo: 0,
                autohide: 1,
                rel: 0,
                iv_load_policy: 3
            }
        };

        let currentVideoId;
        if (!this.props.currentVideo) {
            currentVideoId = 'eVtNcCwMY58'; //Daily staff pick
        } else {
            currentVideoId = this.props.currentVideo.id;
        }


        return (
            <div className="youtube-player-wrapper">
                <Youtube
                    videoId={currentVideoId}
                    opts={opts}
                    className={'youtube-player'}
                    onEnd={this.onEnd}
                    onReady={this.onReady}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onStateChange={this.onStateChange}
                />
                <PlayerController
                    isPlaying={this.state.isPlaying}
                    isSpeaker={this.props.isSpeaker}
                    onPlayPauseClick={this.onPlayPauseClick}
                    onNextClick={this.props.onNextClick}
                    currentSong={this.props.currentSong}
                    currentTime={this.state.currentTime}
                    currentVolume={this.state.currentVolume}
                    videoDuration={this.state.videoDuration}
                    seekTo={this.seekTo}
                    setVolume={this.setVolume}
                    onSpeakerClick={this.props.onSpeakerClick}
                />
            </div>
        );
    }
}

export default YoutubePlayer;