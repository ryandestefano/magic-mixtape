import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.renderItemAction = this.renderItemAction.bind(this);
  }

  renderItemAction() {
    if (this.props.addItem) {
      this.props.addItem(this.props.item);
    } else {
      this.props.removeItem(this.props.item);
    }
  } 

  render() {
    return (
      <li className={`Item ${this.props.item.tag}`} onClick={this.renderItemAction}>
        <div>
          <span>
            <img src={`/../images/${this.props.item.tag}.png`} title={this.props.name} alt={this.props.name} />
            <p>{this.props.item.name}</p>
            <p className="description">{this.props.item.description}</p>
          </span>
        </div>
      </li>
    );
  }
}

export default Item;
