import React from 'react';

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
  }

  renderIngredientAction() {
    if (this.props.addIngredient) {
      return (
        <li className="Ingredient" onClick={this.handleAddIngredient}>
          {this.props.name}
        </li>
      );
    } else {
      return (
        <li className="Ingredient" onClick={this.handleRemoveIngredient}>
          {this.props.name}
        </li>
      );
    }
  } 

  handleAddIngredient() {
    this.props.addIngredient(this.props.ingredient);
  }

  handleRemoveIngredient() {
    this.props.removeIngredient(this.props.ingredient);
  }

  render() {
    return this.renderIngredientAction();
  }
}

export default Ingredient;
