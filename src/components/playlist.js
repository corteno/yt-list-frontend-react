import React, {Component} from 'react';
import PlayListItem from './playlist_item';

const PlayList = (props) => {
    const playlistItems = props.playlist.map((plItem) => {
        return (
            <PlayListItem
                key={plItem._id}
                playlistItem={plItem}
                onPlayListItemDelete={props.onPlayListItemDelete}
            />
        );
    });


    return (
        <ul className="playlist-wrapper">
            {playlistItems}
        </ul>
    );


}

export default PlayList;