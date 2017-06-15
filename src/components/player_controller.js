import React, {Component} from 'react';
import SeekBar from './seek_bar';
import VolumeController from './volume_controller';


class PlayerController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false
        }
    }

    formatTime(time) {
        //console.log(time);
        let minutes = Math.floor(time / 60);
        let seconds = time;


        if (seconds <= 9) {
            return `${minutes}:0${seconds}`
        } else if (seconds > 60) {
            seconds = seconds % 60;

            if (seconds <= 9) {
                return `${minutes}:0${seconds}`
            } else {
                return `${minutes}:${seconds}`
            }

        }


        return `${minutes}:${seconds}`

    };



    componentWillReceiveProps(nextProps) {
        this.setState({isPlaying: nextProps.isPlaying});
    }


    render() {
        let pauseStartButtonClass;
        if (!this.state.isPlaying) {
            pauseStartButtonClass = "play-button player-button";
        } else {
            pauseStartButtonClass = "pause-button player-button";
        }

        return (
            <div className="player-controller-wrapper">
                <div className="player-controller-seek-bar-wrapper">
                    <SeekBar
                        value={this.props.currentTime}
                        max={this.props.videoDuration}
                        seekTo={this.props.seekTo}
                    />
                </div>
                <div className="player-controller-controls">
                    <button
                        className={pauseStartButtonClass}
                        onClick={this.props.onPlayPauseClick}
                    />
                    <button
                        className="next-button player-button"
                        onClick={() => {
                            if (this.props.currentSong) this.props.onNextClick(this.props.currentSong)
                        }}
                    />
                    <VolumeController
                        setVolume={this.props.setVolume}
                        onSpeakerClick={this.props.onSpeakerClick}
                        isSpeaker={this.props.isSpeaker}
                        currentVolume={this.props.currentVolume}
                    >
                        <div className="time-display">
                            {this.formatTime(this.props.currentTime)}
                            <span className="divider">/</span>
                            {this.formatTime(this.props.videoDuration)}
                        </div>
                    </VolumeController>

                </div>

            </div>
        );
    }
}

export default PlayerController;