import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../Button/Button';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}</li>
        })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <strong>Total Price : {props.price}</strong>
            <p>
                Continue to checkout?
            </p>
            <Button btnType="Danger" clicked={props.ordered}>CANCEL</Button>
            <Button btnType="Success">CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;
