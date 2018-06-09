import React from 'react';
import Genre from '../Genre/Genre';

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
      return [this.props.availableGenres[genreIndex], genreIndex];
    })

    this.props.updateDisplayedGenres(genreStrings);
  }

  renderMaxedOutMessage() {
    if (this.props.genreSeeds.length > 2) {
      return (
        <div className="message">
          <h1>There are aleady three genres in the manifest</h1>
          <p>Try adding items or songs, or generating your mixtape!</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={this.props.genreSeeds.length < 3 ? "Genres" : "Genres maxed-out"}>
        <span>
          <ul>
            {
              this.props.displayedGenres.map(genre => {
                return <Genre genre={genre} addGenre={this.props.addGenre} numberOfColors={this.props.numberOfColors} />;
              })
            }
          </ul>
          <button onClick={this.updateGenres}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </span>
        {this.renderMaxedOutMessage()}
      </div>
    );
  }
}

export default Genres;
