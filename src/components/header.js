import React from 'react';

const Header = (props) => {
    return (
        <header className="header">
            <h1 className="header-title">{props.title}</h1>
            <div
                className="header-create-room"
                onClick={props.onCreateRoom}
            > + </div>
        </header>

    );
};

export default Header;