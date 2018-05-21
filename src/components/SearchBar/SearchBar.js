import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  search(searchTerm) {
    this.props.onSearch(searchTerm);
  }

  handleSearchTermChange(e) {
    this.search(e.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleSearchTermChange} placeholder="Enter A Song Title" />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
