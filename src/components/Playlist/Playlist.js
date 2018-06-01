import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

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
    return (
      <div className="Playlist">
        <p onClick={this.handleTogglePlaylistDisplay}>Close playlist</p>
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList trackList={this.props.trackList} removeTrack={this.props.removeTrack} playPreview={this.props.playPreview} stopPreview={this.props.stopPreview} currentPreview={this.props.currentPreview}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
