import React from 'react';

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
      <div className={this.props.numberOfSearchResults > 0 ? "SearchBar" : "SearchBar no-search-results"}>
        <div className="input-container">
          <input onChange={this.handleSearchTermChange} placeholder="Enter A Song Title" />
        </div>
        <a>Search</a>
      </div>
    );
  }
}

export default SearchBar;
