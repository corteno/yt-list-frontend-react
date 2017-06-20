import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
    let videoItems;
    if (props.videos.length > 0) {
        videoItems = props.videos.map((video) => {
            return (
                <VideoListItem
                    onVideoSelect={props.onVideoSelect}
                    key={video.id}
                    video={video}
                />
            );

        });
    } else {
        videoItems = (
            <div className="no-items-wrapper">
                <h1 className="no-items-title">Search list is empty.</h1>
                <p className="no-items-subtitle">Search for a song!</p>
            </div>
        );
    }


    return (
        <ul className="video-list">
            {videoItems}
        </ul>
    );
};

export default VideoList;