import React from 'react';

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.renderIngredientAction = this.renderIngredientAction.bind(this);
  }

  renderIngredientAction() {
    if (this.props.addIngredient) {
      this.props.addIngredient(this.props.ingredient);
    } else {
      this.props.removeIngredient(this.props.ingredient);
    }
  } 

  render() {
    return (
      <li className={`Ingredient ${this.props.ingredient.tag}`} onClick={this.renderIngredientAction}>
        <div>
          <span>
            <img src={`/../images/${this.props.ingredient.tag}.png`} title={this.props.name} alt={this.props.name} />
            <p>{this.props.ingredient.name}</p>
            <p className="description">{this.props.ingredient.description}</p>
          </span>
        </div>
      </li>
    );
  }
}

export default Ingredient;
