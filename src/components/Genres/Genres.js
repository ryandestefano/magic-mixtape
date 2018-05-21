import React from 'react';
import Genre from '../Genre/Genre';
import './Genres.css';

class Genres extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedGenres: this.props.displayedGenres
    }
    this.updateGenres = this.updateGenres.bind(this);
  }

  updateGenres() {
    const availableGenres = this.props.availableGenres;
    const numberOfAvailableGenres = availableGenres.length;
    const numberOfDisplayedGenres = 5;
    const displayedGenres = [];
    let genreStrings = [];

    while (displayedGenres.length < numberOfDisplayedGenres) {
      let newGenreIndex = Math.floor(Math.random() * numberOfAvailableGenres);
      if (!displayedGenres.find(genreIndex => genreIndex === newGenreIndex)) {
        displayedGenres.push(newGenreIndex);
      }
    }

    genreStrings = displayedGenres.map(genreIndex => {
      return this.props.availableGenres[genreIndex];
    })

    this.props.updateDisplayedGenres(genreStrings);
  }

  render() {
    return (
      <div className="Genres">
        <h2>Select Some Genres</h2>
        <ul>
          {
            this.props.displayedGenres.map(genre => {
              return <Genre genre={genre} addGenre={this.props.addGenre} />;
            })
          }
        </ul>
        <button onClick={this.updateGenres}>Update Genres</button>
      </div>
    );
  }
}

export default Genres;
