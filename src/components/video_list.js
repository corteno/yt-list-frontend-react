import React from 'react';
import VideoListItem from './video_list_item';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';


const VideoList = (props) => {
    let videoItems;
    let videoList;
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

    if (props.isMobile && props.isVisible) {
        videoList = (
            <ReactCSSTransitionGroup
                transitionName="search"
                transitionEnter={true}
                transitionEnterTimeout={500}
                transitionLeave={true}
                transitionLeaveTimeout={500}
                component="div"
                className="video-list-wrapper"
            >
                <ul className="video-list">
                    {videoItems}
                </ul>
            </ReactCSSTransitionGroup>
        );
    }
    else if (!props.isMobile) {
        return (
            <ul className="video-list">
                {videoItems}
            </ul>
        );
    }


    return (
        <ReactCSSTransitionGroup
            transitionName="search"
            transitionEnter={true}
            transitionEnterTimeout={500}
            transitionLeave={true}
            transitionLeaveTimeout={500}
            component="div"
            className="video-list-wrapper"
        >
            {videoList}
        </ReactCSSTransitionGroup>


    );
};

export default VideoList;