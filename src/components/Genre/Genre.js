import React from 'react';

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.renderGenreAction = this.renderGenreAction.bind(this);
  }

  renderGenreAction() {
    if (this.props.addGenre) {
      this.props.addGenre(this.props.genre);
    } else {
      this.props.removeGenre(this.props.genre);
    }
  } 

  render() {
    let genreColorIndex = this.props.genre[1] % 20 + 1;
    return (
      <li className={`genre-color-${genreColorIndex}`} onClick={this.renderGenreAction}>
        {this.props.genre[0]}
      </li>
    );
  }
}

export default Genre;
