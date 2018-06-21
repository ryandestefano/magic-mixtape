import React from 'react'
import Genre from '../Genre/Genre'

class SelectedGenres extends React.Component {
  render() {
    if (this.props.genreSeeds.length > 0) {
      return (
        <div className="SelectedGenres">
          <h2>
            {this.props.mixtape
              ? 'Your mixtape was influenced by these genres:'
              : 'Your Selected Genres'}
          </h2>
          <ul>
            {this.props.genreSeeds.map(genre => {
              return (
                <Genre genre={genre} removeGenre={this.props.removeGenre} />
              )
            })}
          </ul>
        </div>
      )
    } else {
      return null
    }
  }
}

export default SelectedGenres
