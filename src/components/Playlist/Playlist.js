import React from 'react';
import TrackList from '../TrackList/TrackList';
import SelectedGenres from '../SelectedGenres/SelectedGenres';
import SelectedItems from '../SelectedItems/SelectedItems';
import SelectedTracks from '../SelectedTracks/SelectedTracks';

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
          <button className="close-playlist" onClick={this.handleTogglePlaylistDisplay}>Close playlist</button>
          <TrackList trackList={this.props.trackList} removeTrack={this.props.removeTrack} playPreview={this.props.playPreview} stopPreview={this.props.stopPreview} currentPreview={this.props.currentPreview}/>
          <div className="playlist-info">
            <h1>Your mixtape is ready!</h1>
            <p>Give your mixtape a name and save it to Spotify!</p>
            <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
            <button className="Playlist-save" onClick={this.props.onSave}>Save to Spotify</button>
            <div>
              <SelectedGenres genreSeeds={this.props.genreSeeds} mixtape />
              <SelectedItems itemSeeds={this.props.itemSeeds} mixtape />
              <SelectedTracks trackList={this.props.songSeeds} playPreview={this.props.playPreview} stopPreview={this.props.stopPreview} currentPreview={this.props.currentPreview} mixtape />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>There is nothing in this playlist!</p>
          <p onClick={this.handleTogglePlaylistDisplay}>Close playlist</p>
        </div>
      );
    }
  }
}

export default Playlist;
