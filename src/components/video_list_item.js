import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
    const imgURL = video.thumbnail;
    
    return (
        <li className="video-list-item" onClick={() => {onVideoSelect(video)}}>
            <div className="video-thumbnail">
                <img src={imgURL} alt=""/>
            </div>
            <div className="video-details">
                <div className="video-title">
                    {video.title}
                </div>
                <div className="video-duration subtitle">
                    {video.duration}
                </div>
            </div>

        </li>
    );
};


export default VideoListItem;