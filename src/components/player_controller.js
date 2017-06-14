import React, {Component} from 'react';


class PlayerController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false
        }
    }

    formatTime(time){
        //console.log(time);
        let minutes = Math.floor(time/60);
        let seconds = time;


        if(seconds <= 9){
            return `${minutes}:0${seconds}`
        } else if(seconds > 60){
            seconds = seconds % 60;

            if(seconds <= 9){
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
                <button
                    className={pauseStartButtonClass}
                    onClick={this.props.onPlayPauseClick}
                />
                <button
                    className="next-button player-button"
                    onClick={()=> {if(this.props.currentSong) this.props.onNextClick(this.props.currentSong)}}
                />
                <div className="time-display">{this.formatTime(this.props.currentTime)} <span className="divider">/</span>{this.formatTime(this.props.videoDuration)}</div>
            </div>
        );
    }
}

export default PlayerController;