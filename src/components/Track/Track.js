import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderTrackAction() {
    if (this.props.addTrack) {
      return <a className='Track-action' onClick={this.addTrack}>+</a>;
    } else {
      return <a className='Track-action' onClick={this.removeTrack}>-</a>;
    }
  }

  addTrack() {
    this.props.addTrack(this.props.track);
  }

  removeTrack() {
    this.props.removeTrack(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        {this.renderTrackAction()}
      </div>
    );
  }
}

export default Track;
