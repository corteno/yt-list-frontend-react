import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        }
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    };

    render() {

        if(this.props.isMobile){
            return (
                <div className="search-bar-mobile">
                    <img src="../img/search.svg" alt="" className="search-input-icon"/>
                    <input
                        className="search-input"
                        value={this.state.term}
                        onChange={event => this.onInputChange(event.target.value)}
                        placeholder="Search"
                    />
                </div>
            );
        } else {
            return (
                <div className="search-bar">
                    <input
                        className="search-input"
                        value={this.state.term}
                        onChange={event => this.onInputChange(event.target.value)}
                        placeholder="Search"
                    />
                </div>
            );
        }



    }


}

export default SearchBar;