import React, {Component} from 'react';
import AuthService from '../utils/AuthService';


class VolumeController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            min: 0,
            max: 100
        }
    }

    onChange = (event) => {
        //console.log(event.target.value);
        this.setState({value: event.target.value}, () => {
            //console.log(this.state.value);
            this.props.setVolume(this.state.value);
        });
    };

    onHover = (event) => {
        //console.log('hovering');
        event.target.addEventListener('wheel', (e) => {
            //console.log('wheel event', e);
            console.log(this.props.currentVolume);

            let wDelta = e.wheelDelta < 0 ? 'down' : 'up';
            if(wDelta === 'down'){
                //Scrolling down
                if(this.props.currentVolume - 10 >= 0){
                    this.setState({value: (this.props.currentVolume - 10)}, () => {
                        console.log(this.state.value);
                        this.props.setVolume(this.state.value);
                    });
                }


            } else if (wDelta === 'up'){
                //Scrolling up
                if(this.props.currentVolume + 10 <= 100){
                    this.setState({value: (this.props.currentVolume + 10)}, () => {
                        console.log(this.state.value);
                        this.props.setVolume(this.state.value);
                    });
                }

            }
        })
    };


    render() {
        //console.log(this.state.value);
        let speakerClass;
        if (this.props.isSpeaker) {
            speakerClass = "volume-icon volume-speaker player-button"
        } else {
            speakerClass = "volume-icon volume-mute player-button"
        }

        return (
            <div
                className="volume-controller-wrapper"
                onMouseOver={this.onHover}
            >
                <div
                    className={speakerClass}
                    onClick={() => {
                        this.props.onSpeakerClick(AuthService.getUserDetails());
                    }}
                />
                <div className="volume-input-wrapper">
                    <input
                        type="range"
                        className="volume-bar"
                        min={this.state.min}
                        max={this.state.max}
                        defaultValue={this.props.currentVolume}
                        value={this.props.currentVolume}
                        onChange={this.onChange}

                    />
                    <div className="progress-bar" style={{width: `${(this.state.value/this.state.max) *100}%`}}></div>
                </div>

                {this.props.children}
            </div>

        );
    }
}

export default VolumeController;