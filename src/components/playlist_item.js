import React from 'react';

const PlayListItem = ({playlistItem, onPlayListItemDelete}) => {

    return (
        <li className="list-item">
            <div className="video-thumbnail">
                <img src={playlistItem.thumbnail} alt=""/>
            </div>
            <div className="video-details">
                <div className="video-title">
                    {playlistItem.title}
                </div>
                <div className="video-duration subtitle">
                    {playlistItem.duration}
                </div>
            </div>
            <div
                className="video-delete"
                onClick={() => {onPlayListItemDelete(playlistItem)}}
            >&times;</div>
        </li>
    );

}

export default PlayListItem;