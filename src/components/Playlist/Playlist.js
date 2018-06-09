import React from 'react';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleTogglePlaylistDisplay = this.handleTogglePlaylistDisplay.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleTogglePlaylistDisplay() {
    this.props.togglePlaylistDisplay();
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    if (this.props.trackList.length > 0) {
      return (
        <div className="Playlist">
          <button className="close-playlist" onClick={this.handleTogglePlaylistDisplay}>Close playlist</button>
          <TrackList trackList={this.props.trackList} removeTrack={this.props.removeTrack} playPreview={this.props.playPreview} stopPreview={this.props.stopPreview} currentPreview={this.props.currentPreview}/>
          <div className="playlist-info">
            <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
            <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
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
