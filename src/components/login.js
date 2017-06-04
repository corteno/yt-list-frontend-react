import React, {Component} from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import io from 'socket.io-client';

import AuthService from '../utils/AuthService';

const ROOT_API_URL = 'https://yt-music-api.herokuapp.com';
var socket = io.connect(ROOT_API_URL);



class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            user: {
                username: '',
                password: '',
                email: ''
            },
            statusMessage: ''
        }
    }

    onLogin = (e) => {
        e.preventDefault();
        var userCredentials = {
            username: this.state.user.username,
            password: this.state.user.password
        };

        AuthService.login(userCredentials)
            .then((response) => {
                //No need to push it only to refresh the page upon login which is done in the AuthService.login function
                //browserHistory.push('/rooms');
            }, (err) => {
                this.resetForm();
                this.setState({
                    statusMessage: 'Wrong username or password!'
                });
            });

    };

    onRegister = (e) => {
        e.preventDefault();
        console.log('register');

        var userToRegister = {
            username: this.state.user.username,
            password: this.state.user.password,
            email: this.state.user.email
        };

        console.log(userToRegister);

        axios.post(`${ROOT_API_URL}/user`, userToRegister)
            .then((response) => {
                this.resetForm();

                this.setState({
                    statusMessage: 'Thank you for registering! Please log in!'
                });
                this.changeForm();
                console.log(response);
            })
            .catch((error) => {
                this.setState({
                    statusMessage: 'This username is taken!'
                });
                console.log(error);
            });


    };

    //Reseting the form
    resetForm = () => {
        this.setState({
            user: {
                username: '',
                password: '',
                email: ''
            }
        });
    };

    changeForm = () => {
        this.setState({login: !this.state.login});
    };

    onRegisterClick = () => {
        this.changeForm();
        this.resetForm();

        //console.log(this.state.user);
    };

    onInputChange = (e) => {
        var currentUserState = this.state.user;

        if (e.target.name === 'username') {
            currentUserState.username = e.target.value;

        } else if (e.target.name === 'password') {
            currentUserState.password = e.target.value

        } else if (e.target.name === 'email') {
            currentUserState.email = e.target.value;
        }

        this.setState({user: currentUserState});
        //console.log(this.state.user);
    };

    componentWillMount(){
        socket.on('test', (data) => {
            console.log(data);
        });
    };


    render() {
        let title;
        let email;
        let submit;
        let submitButton;
        let registerOrLogin;

        //Conditional rendering based on the state of the form, register or login
        if (this.state.login) {
            title = "Login";
            submit = this.onLogin;
            submitButton = (
                <input
                    type="submit"
                    value="Login"
                    className="form-submit"
                />
            );
            registerOrLogin = (
                <p
                    className="login-register"
                    onClick={this.onRegisterClick}>
                    Click here to register

                </p>
            );
        }
        else {
            title = "Register"
            submit = this.onRegister;
            email = (
                <div className="input-wrapper">
                    <input
                        type="email"
                        name="email"
                        className="login-password login-input"
                        required="required"
                        onChange={this.onInputChange}
                        value={this.state.user.email}
                    />
                    <label htmlFor="password">E-mail</label>
                    <div className="bar"></div>
                </div>
            );
            submitButton = (
                <input
                    type="submit"
                    value="Register"
                    className="form-submit"
                />
            );

            registerOrLogin = (
                <p
                    className="login-register"
                    onClick={this.onRegisterClick}>
                    Click here to login

                </p>
            );

        }

        return (
            <div className="login-bg">
                <div className="login-wrapper">

                    <form className="login-form" onSubmit={submit}>
                        <h1>{title}</h1>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="username"
                                className="login-username login-input"
                                required="required"
                                value={this.state.user.username}
                                onChange={this.onInputChange}

                            />
                            <label htmlFor="username">Username</label>
                            <div className="bar"></div>
                        </div>

                        {email}

                        <div className="input-wrapper">
                            <input
                                type="password"
                                name="password"
                                className="login-password login-input"
                                required="required"
                                onChange={this.onInputChange}
                                value={this.state.user.password}
                            />
                            <label htmlFor="password">Password</label>
                            <div className="bar"></div>
                        </div>

                        {submitButton}
                        {registerOrLogin}

                        {/*<div>
                         <IndexLink to="/music"> Music</IndexLink>
                         </div>*/}

                    </form>
                </div>
            </div>
        );

    }
}

export default Login;