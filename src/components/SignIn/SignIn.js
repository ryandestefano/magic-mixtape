import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleGetAccessToken = this.handleGetAccessToken.bind(this);
  }

  handleGetAccessToken() {
    this.props.getAccessToken();
  }

  render() {
    return (
      <div className="SignIn">
        <p>Please grant access to Spotify to use this app!</p>
        <div onClick={this.handleGetAccessToken}>Click to get Access Token</div>
      </div>
    );
  }
}

export default SignIn;
