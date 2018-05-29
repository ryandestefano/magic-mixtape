import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import './Ingredients.css';

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedIngredients: this.props.displayedIngredients
    }
    this.updateIngredients = this.updateIngredients.bind(this);
  }

  updateIngredients() {
    const availableIngredients = this.props.availableIngredients;
    const numberOfAvailableIngredients = availableIngredients.length;
    const numberOfDisplayedIngredients = 5;
    const displayedIngredients = []; 
    let ingredientStrings = []; 

    while (displayedIngredients.length < numberOfDisplayedIngredients) {
      let newIngredientIndex = Math.floor(Math.random() * numberOfAvailableIngredients);
      if (!displayedIngredients.find(ingredientIndex => ingredientIndex === newIngredientIndex)) {
        displayedIngredients.push(newIngredientIndex);
      }
    }   

    ingredientStrings = displayedIngredients.map(ingredientIndex => {
      return this.props.availableIngredients[ingredientIndex];
    })  

    this.props.updateDisplayedIngredients(ingredientStrings);
  }

  render() {
    return (
      <div className="Ingredients">
        <h2>Select Some Ingredients</h2>
        <ul>
          { 
            this.props.displayedIngredients.map(ingredient => { 
              return <Ingredient ingredient={ingredient} addIngredient={this.props.addIngredient} />; 
            }) 
          } 
        </ul>
        <button onClick={this.updateIngredients}>Update Ingredients</button>
      </div>
    );
  }
}

export default Ingredients;
