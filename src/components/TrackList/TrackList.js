import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
  const trackList = this.props.trackList; 
    return (
      <div className="track-list">
        {
          trackList.map(track => {
            return <Track key={track.id} track={track} name={track.name} artist={track.artist} album={track.album} uri={track.uri} addTrack={this.props.addTrack} removeTrack={this.props.removeTrack} />;
          })
        }
      </div>
    );
  }
}

export default TrackList;
