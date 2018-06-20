import React from 'react';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleTogglePlaylistDisplay = this.handleTogglePlaylistDisplay.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.renderSelectedItems = this.renderSelectedItems.bind(this);
    this.renderSelectedTracks = this.renderSelectedTracks.bind(this);
  }

  handleTogglePlaylistDisplay() {
    this.props.togglePlaylistDisplay();
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  renderSelectedItems() {
    if (this.props.itemSeeds.length > 0) {
      return (
        <div>
          <p>Your mixtape's danceability, energy, instrumentalness, and song length were influenced by the powers of:</p>
        </div>
      );
    }
  }

  renderSelectedTracks() {
    if (this.props.songSeeds.length > 0) {
      return (
        <div>
          <p>Your mixtape was influenced by these songs:</p>
        </div>
      );
    }
  }

  render() {
    if (this.props.trackList.length > 0) {
      return (
        <div className="Playlist">
          <button className="close-playlist" onClick={this.handleTogglePlaylistDisplay}>
            <svg className="svg-inline--fa fa-times fa-w-11" aria-hidden="true" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" data-fa-i2svg=""><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
          </button>
          <div className="playlist-info">
            <h1>Your mixtape is ready!</h1>
            <p>Give your mixtape a name and save it to Spotify!</p>
            <input defaultValue="My New Mixtape" onChange={this.handleNameChange} />
            <button className="Playlist-save" onClick={this.props.onSave}>Save Mixtape to Spotify</button>
            <a className="close-playlist" onClick={this.handleTogglePlaylistDisplay}>Or create a new mixtape</a>
          </div>
          <TrackList trackList={this.props.trackList} removeTrack={this.props.removeTrack} playPreview={this.props.playPreview} stopPreview={this.props.stopPreview} currentPreview={this.props.currentPreview}/>
        </div>
      );
    } else if (!this.props.getRecommendationsWasSuccessful) {
      return (
        <div className="empty-playlist">
          <h1>Your playlist is empty!</h1>
          <p>Spotify was unable to create a mixtape that meets your requirements. Try selecting different genres or songs.</p>
          <button onClick={this.handleTogglePlaylistDisplay}>Try again</button>
        </div>
      );
    } else {
      return (
        <div className="loading-playlist">
          <div onClick={this.handleTogglePlaylistDisplay}>
            <svg className="svg-inline--fa fa-sync-alt fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="sync-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path></svg>
          </div>
        </div>
      );
    }
  }
}

export default Playlist;
