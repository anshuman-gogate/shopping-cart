import React, { useContext } from 'react';
import { currencyFormatter } from '../../../utils/currencyFormatter';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

function MealItem({ name, price, description, id }) {
  const { addItem } = useContext(CartContext);

  function onAddToCart (amount) {
    addItem({
      id: id,
      name: name,
      amount: amount,
      price: price
    })
  }

  const formattedPrice = currencyFormatter.format(price);

  return (
      <li className={classes.meal}>
        <div>
            <h3>{name}</h3>
            <div className={classes.description}>{description}</div>
            <div className={classes.price}>{formattedPrice}</div>
        </div>
        <div>
          <MealItemForm 
            id={id}
            onAddToCart={onAddToCart}
          />
        </div>
      </li>
  );
}

export default MealItem;
