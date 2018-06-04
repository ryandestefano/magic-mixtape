import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handlePlayPreview = this.handlePlayPreview.bind(this);
    this.handleStopPreview = this.handleStopPreview.bind(this);
  }

  renderTrackAction(randomColor) {
    if (this.props.addTrack) {
      return (
        <a className={`add track-inclusion-action track-action-color-${randomColor}`} onClick={this.addTrack}>
          <i className="add fas fa-plus"></i>
          <i className="remove fas fa-minus"></i>
        </a>
      );
    } else if (this.props.removeTrack) {
      return (
        <a className={`remove track-inclusion-action track-action-color-${randomColor}`}  onClick={this.removeTrack}>
          <i className="add fas fa-plus"></i>
          <i className="remove fas fa-minus"></i>
        </a>
      );
    }
  }

  renderPreviewAction(randomColor) {
    if (this.props.preview !== this.props.currentPreview) {
      return (
        <a className={`play track-preview-action track-action-color-${randomColor}`} onClick={this.handlePlayPreview}>
          <i className="play fas fa-play"></i>
          <i className="stop fas fa-stop"></i>
        </a>
      );
    } else {
      return (
        <a className={`stop track-preview-action track-action-color-${randomColor}`} onClick={this.handleStopPreview}>
          <i className="play fas fa-play"></i>
          <i className="stop fas fa-stop"></i>
        </a>
      );
    }
  }

  addTrack() {
    this.props.addTrack(this.props.track);
  }

  removeTrack() {
    this.props.removeTrack(this.props.track);
  }

  handlePlayPreview() {
    this.props.playPreview(this.props.preview);
  }

  handleStopPreview() {
    this.props.stopPreview();
  }

  render() {
    const randomColor = this.props.id.match(/\d/g).join("")  % 20 + 1;
    return (
      <div className="Track">
        <div className="track-information">
          <h3 className={`color-${randomColor}`}>{this.props.name}</h3>
          <p className={`color-${randomColor}`}>{this.props.artist} | {this.props.album}</p>
        </div>
        {this.renderPreviewAction(randomColor)}
        {this.renderTrackAction(randomColor)}
      </div>
    );
  }
}

export default Track;
