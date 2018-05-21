import React from 'react';
import Ingredient from '../Ingredient/Ingredient';

class Ingredients extends React.Component {
  render() {

    const displayedIngredients = this.props.availableIngredients.map(ingredient => {
      return <Ingredient ingredient={ingredient} name={ingredient.name} dance={ingredient.dance} addIngredient={this.props.addIngredient} />;
    });

    return (
      <div className="Ingredients">
        <ul>
          {displayedIngredients}
        </ul>
      </div>
    );
  }
}

export default Ingredients;
