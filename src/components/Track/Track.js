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

  renderTrackAction() {
    if (this.props.addTrack) {
      return <a className='Track-action' onClick={this.addTrack}>+</a>;
    } else {
      return <a className='Track-action' onClick={this.removeTrack}>-</a>;
    }
  }

  renderPreviewAction() {
    if (this.props.preview !== this.props.currentPreview) {
      return <a className="Track-preview-action" onClick={this.handlePlayPreview}>&#9658;</a>;
    } else {
      return <a className="Track-preview-action" onClick={this.handleStopPreview}>&#9724;</a>;
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
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        {this.renderPreviewAction()}
        {this.renderTrackAction()}
      </div>
    );
  }
}

export default Track;
