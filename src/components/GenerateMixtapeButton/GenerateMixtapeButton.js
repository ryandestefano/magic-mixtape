import React from 'react';

class GenerateMixtapeButton extends React.Component {
  render() {
    return <a className="get-mixtape" onClick={this.props.getRecommendations}>Create Mixtape</a>;
  }
}

export default GenerateMixtapeButton;
