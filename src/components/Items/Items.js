import React from 'react';
import Item from '../Item/Item';
import './Items.css';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedItems: this.props.displayedItems
    }
    this.updateItems = this.updateItems.bind(this);
  }

  updateItems() {
    const availableItems = this.props.availableItems;
    const numberOfAvailableItems = availableItems.length;
    const numberOfDisplayedItems = 5;
    const displayedItems = []; 
    let itemStrings = []; 

    while (displayedItems.length < numberOfDisplayedItems) {
      let newItemIndex = Math.floor(Math.random() * numberOfAvailableItems);
      if (!displayedItems.find(itemIndex => itemIndex === newItemIndex)) {
        displayedItems.push(newItemIndex);
      }
    }   

    itemStrings = displayedItems.map(itemIndex => {
      return this.props.availableItems[itemIndex];
    })  

    this.props.updateDisplayedItems(itemStrings);
  }

  render() {
    return (
      <div className="Items">
        <h2>Select Some Items</h2>
        <ul>
          { 
            this.props.displayedItems.map(item => { 
              return <Item item={item} addItem={this.props.addItem} />; 
            }) 
          } 
        </ul>
        <button onClick={this.updateItems}>Update Items</button>
      </div>
    );
  }
}

export default Items;
