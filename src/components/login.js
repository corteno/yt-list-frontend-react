import React, {Component} from 'react';
import { IndexLink } from 'react-router'


class Login extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        

        return (
            <div className="login-wrapper">
                <form className="login-form">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="username"
                            className="login-username login-input"
                            required="required"
                        />
                        <label htmlFor="username">Username</label>
                        <div className="bar"></div>
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="password"
                            name="password"
                            className="login-password login-input"
                            required="required"
                        />
                        <label htmlFor="password">Password</label>
                        <div className="bar"></div>
                    </div>

                    <input
                        type="submit"
                        value="Login"
                        className="login-submit"
                    />

                    <div>
                        <IndexLink to="/music"> Music</IndexLink>
                    </div>
                </form>
            </div>

        );
    }
}

export default Login;