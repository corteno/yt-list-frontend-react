import React, {Component} from 'react';
import PlayListItem from './playlist_item';

const PlayList = (props) => {
    let playlistItems;
    if(props.playlist.length !== 0) {
        playlistItems = props.playlist.map((plItem) => {
            return (
                <PlayListItem
                    key={plItem._id}
                    playlistItem={plItem}
                    onPlayListItemDelete={props.onPlayListItemDelete}
                />
            );
        });
    } else {
        playlistItems = (
            <div className="no-items-wrapper">
                <h1 className="no-items-title">Playlist is empty!</h1>
                <p className="no-items-subtitle">Search for a song to play!</p>
                <p className="no-items-text">Meanwhile listen to <b>Illenium - Sound of Walking Away</b> as the daily staff pick!</p>
            </div>

        );
    }



    return (
        <ul className="playlist-wrapper">
            {playlistItems}
        </ul>
    );


};

export default PlayList;