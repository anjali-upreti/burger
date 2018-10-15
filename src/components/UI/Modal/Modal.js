import React from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
const modal = (props) => (
    <Aux>
        <Backdrop ordered = {props.ordered}/>
        <div className="Modal">
            {props.children}
         </div>
    </Aux>
);

export default modal;