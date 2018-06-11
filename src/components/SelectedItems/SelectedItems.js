import React from 'react';
import Item from '../Item/Item';

class SelectedItems extends React.Component {
  render() {
    if (this.props.itemSeeds.length > 0) {
      const displayedItems = this.props.itemSeeds.map(item => {
        return <Item item={item} removeItem={this.props.removeItem} />;
      });

      return (
        <div className="SelectedItems">
        <h2>{this.props.mixtape ? 'Your mixtape\'s danceability, energy, instrumentalness, and song length were influenced by the powers of:' : 'Your Selected Items'}</h2>
          <ul>
            {displayedItems}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SelectedItems;
