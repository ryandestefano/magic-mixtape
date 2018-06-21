import React from 'react'

class PreviewPlayer extends React.Component {
  render() {
    return (
      <div className="PreviewPlayer">
        <iframe id="iframe" title="Preview Player" src={this.props.preview} />
      </div>
    )
  }
}

export default PreviewPlayer
