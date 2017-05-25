import axios from 'axios';
import jwt from 'jsonwebtoken';
import router, {browserHistory} from 'react-router';

const ROOT_API_URL = 'https://yt-music-api.herokuapp.com';


function login(user) {
    return new Promise((resolve, reject) => {
        axios.post(`${ROOT_API_URL}/login`, user)
            .then((response) => {


                localStorage.setItem('user', createToken(user));

                refreshPage();
                resolve("Everything worked!");
            })
            .catch((error) => {
                reject(Error("Invalid credentials"));
            });
    });
}


function logout(){
    destoryToken('user');
    browserHistory.push('/');
    refreshPage();
}

function isLoggedIn(){
    //console.log("Logged in: ", loggedIn);
    if(localStorage.getItem('user')){
        return true;
    } else {
        return false;
    }
}

function getUserDetails(){
    let token = jwt.decode(localStorage.getItem('user'));
    if(token){
        return token.data.username;
    } else {
        return 'No user data';
    }

}

function refreshPage(){
    window.location.reload();
}


function createToken(data){
    let token = jwt.sign({
        data
    }, 'secret', { expiresIn: '1h' });

    console.log(token);
    return token;
}

function destoryToken(token){
    localStorage.removeItem(token);
}



module.exports = {
    login,
    logout,
    isLoggedIn,
    getUserDetails
};