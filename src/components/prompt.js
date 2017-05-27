import React, {Component} from 'react';

class Prompt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            privateRoom: false,
            roomDetails: {
                roomName: '',
                password: undefined
            }
        };
    }

    handleCheckboxChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        if(value){
            this.setState({privateRoom: target.checked});
        } else {
            this.setState({privateRoom: target.checked});
        }
    };

    handleInputChange = (e) => {
        let currentDetailsState = this.state.roomDetails;

        if(e.target.name === "roomname"){
            currentDetailsState.roomName = e.target.value;
        } else if (e.target.name === "room-password"){
            currentDetailsState.password = e.target.value;
        }

        this.setState({roomDetails: currentDetailsState});

    };

    onSubmit = (e) => {
        e.preventDefault();

        this.props.onPromptSubmit(this.state);
        this.props.onPromptClose();

    };


    render() {
        let passwordInput;
        //Conditional rendering
        if(this.state.privateRoom){
            passwordInput = (
                <div className="input-wrapper">
                    <input
                        type="password"
                        name="room-password"
                        className="login-password login-input"
                        required="required"
                        onChange={this.handleInputChange}
                        value={this.state.roomDetails.password}
                    />
                    <label htmlFor="room-password">Password</label>
                    <div className="bar"></div>
                </div>
            );
        }


        return (
            <div className="prompt-wrapper">
                <div className="prompt-background" onClick={this.props.onPromptClose}></div>
                <form className="prompt-window login-form" onSubmit={this.onSubmit}>
                    <h1>Create a room</h1>

                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="roomname"
                            className="login-username login-input"
                            required="required"
                            onChange={this.handleInputChange}
                            value={this.state.roomDetails.roomName}
                        />
                        <label htmlFor="roomname">Name</label>
                        <div className="bar"></div>
                    </div>

                    {passwordInput}

                    <div className=" input-wrapper radio-wrapper">
                        <input type="checkbox"
                               name="private-radio"
                               className="private-radio-checkbox"
                               onChange={this.handleCheckboxChange}
                        />
                        <div className="checkmark"></div>
                        <label htmlFor="private-radio" className="private-radio-label">
                            Private
                        </label>
                    </div>

                    <input
                        type="submit"
                        value="Create"
                        className="form-submit"
                    />
                </form>
            </div>
        );
    }
}

export default Prompt;