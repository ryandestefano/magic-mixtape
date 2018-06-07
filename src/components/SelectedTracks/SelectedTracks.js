import React from 'react';
import TrackList from '../TrackList/TrackList';

class SelectedTracks extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <TrackList trackList={this.props.trackList} removeTrack={this.props.removeTrack} playPreview={this.props.playPreview} stopPreview={this.props.stopPreview} currentPreview={this.props.currentPreview} />
      </div>
    );
  }
}

export default SelectedTracks;
