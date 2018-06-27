import React from 'react';

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.renderGenreAction = this.renderGenreAction.bind(this);
    this.renderGenreActionIcon = this.renderGenreActionIcon.bind(this);
  }

  renderGenreAction() {
    if (this.props.addGenre) {
      this.props.addGenre(this.props.genre);
    } else if (this.props.removeGenre) {
      this.props.removeGenre(this.props.genre);
    }
  }

  renderGenreActionIcon() {
    if (this.props.addGenre) {
      return <i className="fas fa-plus" />;
    } else if (this.props.removeGenre) {
      return <i className="fas fa-minus" />;
    }
  }

  render() {
    let genreColorIndex = (this.props.genre[1] % 20) + 1;
    return (
      <li
        className={`genre-color-${genreColorIndex}`}
        onClick={this.renderGenreAction}
      >
        <p>{this.props.genre[0]}</p>
        <span>{this.renderGenreActionIcon()}</span>
      </li>
    );
  }
}

export default Genre;
