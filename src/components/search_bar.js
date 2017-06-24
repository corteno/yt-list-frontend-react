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

    /*onBlur() {
        this.setState({term: ''});
    };*/

    render() {
        let searchIconClass;
        if(!this.props.isSearchOpen){
            searchIconClass = 'search-input-icon search-icon-open';
        } else {
            searchIconClass = 'search-input-icon search-icon-close';
        }

        if(this.props.isMobile){
            return (
                <div className="search-bar-mobile">
                    <div
                        className={searchIconClass}
                        onClick={() => {this.props.onSearchClick(false)}}
                    />

                    <input
                        className="search-input"
                        value={this.state.term}
                        onChange={event => this.onInputChange(event.target.value)}
                        onFocus={() => {this.props.onSearchClick(true)}}
                        /*onBlur={() => {this.onBlur()}}*/
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