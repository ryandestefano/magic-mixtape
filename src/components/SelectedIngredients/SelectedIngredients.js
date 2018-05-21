import React from 'react';
import Ingredient from '../Ingredient/Ingredient';

class SelectedIngredients extends React.Component {
  render() {

    const displayedIngredients = this.props.ingredientSeeds.map(ingredient => {
      return <Ingredient ingredient={ingredient} name={ingredient.name} dance={ingredient.dance} removeIngredient={this.props.removeIngredient} />;
    });

    return (
      <div className="SelectedIngredients">
        <ul>
          {displayedIngredients}
        </ul>
      </div>
    );
  }
}

export default SelectedIngredients;
