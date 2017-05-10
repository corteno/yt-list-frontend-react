import React, {Component} from 'react';
import axios from 'axios';

const ROOT_URL = 'https://yt-music-api.herokuapp.com';

class PlayList extends Component {
    constructor(props) {
        super(props);


    }


    render() {

        return (
            <ul className="playlist-wrapper">
                <li>Song 1</li>
                <li>Song 2</li>
            </ul>
        );
    }

}

export default PlayList;