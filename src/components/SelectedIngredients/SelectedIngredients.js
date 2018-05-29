import React from 'react';
import Ingredient from '../Ingredient/Ingredient';

class SelectedIngredients extends React.Component {
  render() {
    if (this.props.ingredientSeeds.length > 0) {
      const displayedIngredients = this.props.ingredientSeeds.map(ingredient => {
        return <Ingredient ingredient={ingredient} removeIngredient={this.props.removeIngredient} />;
      });

      return (
        <div className="SelectedIngredients">
        <h2>Your Selected Ingredients</h2>
          <ul>
            {displayedIngredients}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SelectedIngredients;
