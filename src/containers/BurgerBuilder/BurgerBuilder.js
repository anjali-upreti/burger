import React, {
    Component
} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing : false,
            loading: false
        }
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(
            response => {
                this.setState({ingredients: response.data})
            }).catch(error => {
                
            });
    }

    
    updatePurchasedState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum,el) => {
            return sum+el;
        },0);
        this.setState({purchasable: sum>0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice= this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchasedState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice= this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchasedState(updatedIngredients);
    }

    purchaseHandler= () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You Continue');
        this.setState({loading: true});
        const order= {
            ingredients : this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Anjali',
                address: {
                    street: 'TestStreet1',
                    zipCode: '226022',
                    country: 'India'
                },
                email: 'anjaliupreti59@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json',order).then(response => {
            this.setState({loading: false, purchasing: false});
            console.log(response)
        }).catch(error => {
            this.setState({loading: false, purchasing: false});
            console.log(error);
        });
    }
    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        let burger = <Spinner />;
        let orderSummary = null;
         if(this.state.ingredients) {
            burger= (
                <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls  
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved= {this.removeIngredientHandler}
                disabled={disabledInfo}
                totalprice= {this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered= {this.purchaseHandler}/>
                </Aux>
                    )
        orderSummary = <OrderSummary ingredients={this.state.ingredients} 
        purchaseCancelled= {this.purchaseCancelHandler} 
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice.toFixed(2)} />
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
         }
        
        return ( <Aux> 
            {(this.state.purchasing) ?
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
               {orderSummary} 
            </Modal> : null}
            {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
