import React from 'react';

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
      return (
        <a className="add track-inclusion-action" onClick={this.addTrack}>
          <i className="add fas fa-plus" />
          <i className="remove fas fa-minus" />
        </a>
      );
    } else if (this.props.removeTrack) {
      return (
        <a className="remove track-inclusion-action" onClick={this.removeTrack}>
          <i className="add fas fa-plus" />
          <i className="remove fas fa-minus" />
        </a>
      );
    }
  }

  renderPreviewAction() {
    if (
      this.props.preview &&
      this.props.preview !== this.props.currentPreview
    ) {
      return (
        <a
          className="play track-preview-action"
          onClick={this.handlePlayPreview}
        >
          <i className="play fas fa-play" />
          <i className="stop fas fa-stop" />
        </a>
      );
    } else if (this.props.preview) {
      return (
        <a
          className="stop track-preview-action"
          onClick={this.handleStopPreview}
        >
          <i className="play fas fa-play" />
          <i className="stop fas fa-stop" />
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
    const randomColor = (this.props.id.match(/\d/g).join('') % 20) + 1;
    return (
      <div className={`Track color-${randomColor}`}>
        <div className="track-information">
          <h3>{this.props.name}</h3>
          <p>
            {this.props.artist} | {this.props.album}
          </p>
        </div>
        {this.renderPreviewAction()}
        {this.renderTrackAction()}
      </div>
    );
  }
}

export default Track;
