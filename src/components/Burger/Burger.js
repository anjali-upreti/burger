import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey => {
        console.log("igkey=",igkey);
        return [...Array(props.ingredients[igkey])].map((_,i) => {
            console.log("igkey+i",igkey+i);
            return <BurgerIngredient key={igkey + i} type={igkey} />
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)},[]);

        if(transformedIngredients.length === 0)
        {
            transformedIngredients=<p>Please start adding ingredients!</p>
        }

    console.log(Object.keys(props.ingredients)
    .map(igkey => {
        return [...Array(props.ingredients[igkey])]}));

    return(
        <div className="Burger">
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;