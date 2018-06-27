import React from 'react';
import TrackList from '../TrackList/TrackList';

class SelectedTracks extends React.Component {
  render() {
    if (this.props.trackList.length > 0) {
      return (
        <div className="Playlist">
          <h2>
            {this.props.mixtape
              ? 'Your mixtape was influenced by these tracks:'
              : 'Your Selected Tracks'}
          </h2>
          <TrackList
            trackList={this.props.trackList}
            removeTrack={this.props.removeTrack}
            playPreview={this.props.playPreview}
            stopPreview={this.props.stopPreview}
            currentPreview={this.props.currentPreview}
          />
        </div>
      );
    } else {
    }
    return null;
  }
}

export default SelectedTracks;
