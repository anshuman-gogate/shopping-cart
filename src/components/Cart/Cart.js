import React, { useContext } from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context';
import { currencyFormatter } from '../../utils/currencyFormatter';

function Cart({ handleHideCart }) {
  const { items, totalAmount, addItem, removeItem } = useContext(CartContext);

  const totalAmt = currencyFormatter.format(totalAmount);
  const hasItems = items.length !== 0;

  function cartItemRemovehandler (id) {
    removeItem(id);
  }

  function cartItemAddHandler (item) {
    addItem({ ...item, amount: 1 });
  }

  const cartItems = <ul className={classes['cart-items']}>
      {
          items.map(item => {
              return <CartItem 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        price={item.price} 
                        amount={item.amount}
                        onRemove={cartItemRemovehandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null, item)}
                    />
          })
      }
  </ul>

  return (
      <Modal handleClose={handleHideCart}>
          {cartItems}
          <div className={classes.total}>
              <span>Total Amount : </span>
              <span>{totalAmt}</span>
          </div>
          <div className={classes.actions}>
            <button 
                className={classes['button--alt']}
                onClick={handleHideCart}
            >Close</button>
            {hasItems && <button className={classes.button}>Order Now</button>}
          </div>
      </Modal>
  );
}

export default Cart;
