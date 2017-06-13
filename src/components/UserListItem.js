import React from 'react';

const UserListItem = (props) => {

    let userlistSpeaker;


    if (props.speaker) {
        //console.log(props.speaker);
        if(!props.speakerClickable){
            userlistSpeaker = (
                <div className="user-list-speaker not-clickable" >
                    <img src="../img/volume-2.svg" alt=""/>
                </div>
            );
        } else {
            userlistSpeaker = (
                <div className="user-list-speaker" onClick={() => {props.onSpeakerClick(props.username)}} >
                    <img src="../img/volume-2.svg" alt=""/>
                </div>
            );
        }
    } else if(props.speaker == false) {
        //console.log(props.speaker);
        userlistSpeaker = (
            <div className="user-list-speaker" onClick={() => {props.onSpeakerClick(props.username)}} >
                <img src="../img/volume-x.svg" alt=""/>
            </div>
        );
    } else if(props.speaker === null){
        //console.log('Null', props.speaker);
    }




    return (
        <li className="user-list-item" >
            <div className="user-list-avatar">
            </div>
            <p className="user-list-username">
                {props.username}
            </p>
            {userlistSpeaker}
        </li>
    );

};

export default UserListItem;