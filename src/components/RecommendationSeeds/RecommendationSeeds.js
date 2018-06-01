import React from 'react';
import TrackList from '../TrackList/TrackList';
import './RecommendationSeeds.css';

class RecommendationSeeds extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <TrackList trackList={this.props.trackList} removeTrack={this.props.removeTrack} playPreview={this.props.playPreview} stopPreview={this.props.stopPreview} currentPreview={this.props.currentPreview} />
        <a className="Playlist-save" onClick={this.props.getRecommendations}>Get mixtape</a>
      </div>
    );
  }
}

export default RecommendationSeeds;
