import React from 'react'
import Track from '../Track/Track'

class TrackList extends React.Component {
  render() {
    const trackList = this.props.trackList
    return (
      <div className="track-list">
        {trackList.map(track => {
          return (
            <Track
              key={track.id}
              id={track.id}
              track={track}
              name={track.name}
              artist={track.artist}
              album={track.album}
              preview={track.preview}
              uri={track.uri}
              addTrack={this.props.addTrack}
              removeTrack={this.props.removeTrack}
              playPreview={this.props.playPreview}
              stopPreview={this.props.stopPreview}
              currentPreview={this.props.currentPreview}
            />
          )
        })}
      </div>
    )
  }
}

export default TrackList
