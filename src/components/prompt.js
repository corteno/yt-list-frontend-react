import React, {Component} from 'react';

class Prompt extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="prompt-wrapper">
                <div className="prompt-background" onClick={this.props.onPromptClose}></div>
                <form className="prompt-window login-form">
                    <h1>Create a room</h1>

                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="roomname"
                            className="login-username login-input"
                            required="required"


                        />
                        <label htmlFor="roomname">Room name</label>
                        <div className="bar"></div>
                    </div>

                    <div className=" input-wrapper radio-wrapper">
                        <input type="checkbox" name="private-radio" onChange={console.log("check'em")} />
                        <label htmlFor="private-radio">Private</label>
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