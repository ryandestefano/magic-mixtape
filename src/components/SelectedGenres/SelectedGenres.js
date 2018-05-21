import React from 'react';
import Genre from '../Genre/Genre';

class SelectedGenres extends React.Component {
  render() {
    return (
      <div className="SelectedGenres">
        <h2>Your Selected Genres</h2>
        <ul>
          {
            this.props.genreSeeds.map(genre => {
              return <Genre genre={genre} removeGenre={this.props.removeGenre} />;
            })
          }
        </ul>
      </div>
    );
  }
}

export default SelectedGenres;
