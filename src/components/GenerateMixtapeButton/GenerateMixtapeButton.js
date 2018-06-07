import React from 'react';

class GenerateMixtapeButton extends React.Component {
  render() {
    return <a className="get-mixtape" onClick={this.props.getRecommendations}>Get mixtape</a>;
  }
}

export default GenerateMixtapeButton;
