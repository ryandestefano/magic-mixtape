import React from 'react'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.renderItemAction = this.renderItemAction.bind(this)
    this.renderItemActionIcon = this.renderItemActionIcon.bind(this)
  }

  renderItemAction() {
    if (this.props.addItem) {
      this.props.addItem(this.props.item)
    } else if (this.props.removeItem) {
      this.props.removeItem(this.props.item)
    }
  }

  renderItemActionIcon() {
    if (this.props.addItem) {
      return <i className="fas fa-plus" />
    } else if (this.props.removeItem) {
      return <i className="fas fa-minus" />
    }
  }

  render() {
    const imagePath = process.env.REACT_APP_IMAGE_PATH
    return (
      <li
        className={`Item ${this.props.item.tag}`}
        onClick={this.renderItemAction}
      >
        <div>
          <span>
            <img
              src={`${imagePath}/${this.props.item.tag}.png`}
              title={this.props.name}
              alt={this.props.name}
            />
            {this.renderItemActionIcon()}
            <p>{this.props.item.name}</p>
          </span>
        </div>
      </li>
    )
  }
}

export default Item
