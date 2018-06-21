import React from 'react'

class MobileToggle extends React.Component {
  constructor(props) {
    super(props)
    this.handleMobileShowOptions = this.handleMobileShowOptions.bind(this)
    this.handleMobileShowSelections = this.handleMobileShowSelections.bind(this)
  }

  handleMobileShowOptions() {
    this.props.showOptions()
  }

  handleMobileShowSelections() {
    this.props.showSelections()
  }

  render() {
    return (
      <div className="mobile-toggle">
        <a
          className={this.props.mobileDisplaySelections ? '' : 'active'}
          onClick={this.handleMobileShowOptions}
        >
          <p>Options</p>
        </a>
        <a
          className={this.props.mobileDisplaySelections ? 'active' : ''}
          onClick={this.handleMobileShowSelections}
        >
          <p>Selections</p>
          <span>{this.props.numberOfSeeds}</span>
        </a>
      </div>
    )
  }
}

export default MobileToggle
