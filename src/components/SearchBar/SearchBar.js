import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.foo = this.foo.bind(this);
  }

  search() {
    this.props.onSearch(document.getElementById('search-bar').value);
  }

  foo(e) {
    if (e.which === 13) {
      this.search();
    }
  }

  render() {
    return (
      <div className={this.props.numberOfSearchResults > 0 ? "SearchBar" : "SearchBar no-search-results"}>
        <div className="input-container">
          <input id="search-bar" onKeyPress={this.foo} placeholder="Enter A Song Title" />
        </div>
        <a onClick={this.search}>Search</a>
      </div>
    );
  }
}

export default SearchBar;
