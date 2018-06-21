import React from 'react'
import Item from '../Item/Item'

class Items extends React.Component {
  constructor(props) {
    super(props)
    this.updateItems = this.updateItems.bind(this)
    this.renderMaxedOutMessage = this.renderMaxedOutMessage.bind(this)
  }

  componentWillMount() {
    if (this.props.displayedItems.length === 0) {
      this.updateItems()
    }
  }

  updateItems() {
    const availableItems = this.props.availableItems
    const numberOfAvailableItems = availableItems.length
    const numberOfDisplayedItems = 5
    const displayedItems = []
    let itemStrings = []

    while (displayedItems.length < numberOfDisplayedItems) {
      let newItemIndex = Math.floor(Math.random() * numberOfAvailableItems)
      if (!displayedItems.find(itemIndex => itemIndex === newItemIndex)) {
        displayedItems.push(newItemIndex)
      }
    }

    itemStrings = displayedItems.map(itemIndex => {
      return this.props.availableItems[itemIndex]
    })

    this.props.updateDisplayedItems(itemStrings)
  }

  renderMaxedOutMessage() {
    if (this.props.itemSeeds.length > 1) {
      return (
        <div className="message">
          <h1>You have added the maximum number of magic items!</h1>
          <p>Try adding genres or songs, or creating your mixtape</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div
        className={
          this.props.itemSeeds.length < 2 ? 'Items' : 'Items maxed-out'
        }
      >
        <span>
          <ul>
            {this.props.displayedItems.map(item => {
              return <Item item={item} addItem={this.props.addItem} />
            })}
          </ul>
          <button onClick={this.updateItems}>
            <i className="fas fa-sync-alt" />
          </button>
        </span>
        {this.renderMaxedOutMessage()}
      </div>
    )
  }
}

export default Items
