import React from 'react';

const UserListItem = (props) => {

    let userlistSpeaker;


    if (props.speaker) {
        //console.log(props.speaker);
        userlistSpeaker = (
            <div className="user-list-speaker" onClick={props.onUserClick}>
                <img src="../img/volume-2.svg" alt=""/>
            </div>
        );
    } else if(props.speaker == false) {
        //console.log(props.speaker);
        userlistSpeaker = (
            <div className="user-list-speaker">
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