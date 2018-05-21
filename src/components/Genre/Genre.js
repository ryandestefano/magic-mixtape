import React from 'react';

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.addGenre = this.addGenre.bind(this);
    this.removeGenre = this.removeGenre.bind(this);
  }

  renderGenreAction() {
    if (this.props.addGenre) {
      return (
        <li onClick={this.addGenre}>
          {this.props.genre}
        </li>
      );
    } else {
      return (
        <li onClick={this.removeGenre}>
          {this.props.genre}
        </li>
      );
    }
  }

  addGenre() {
    this.props.addGenre(this.props.genre);
  }

  removeGenre() {
    this.props.removeGenre(this.props.genre);
  }

  render() {
    return this.renderGenreAction();
  }
}

export default Genre;
