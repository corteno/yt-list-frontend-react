import React, {Component} from 'react';


class Seekbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            min: 0,
            max: 0
        }
    }



    onChange = (event) => {
        //console.log(event.target.value);
        this.setState({value: event.target.value}, () => {
            this.props.seekTo(this.state.value);
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            max: nextProps.max
        });
    };


    render() {

        return (
            <input
                type="range"
                className="seek-bar"
                min={this.state.min}
                max={this.state.max}
                defaultValue={this.state.value}
                value={this.state.value}
                onChange={this.onChange}
            />
        );
    }
}

export default Seekbar;