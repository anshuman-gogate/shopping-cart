import React, { useContext, useState, useEffect } from 'react';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context';

function HeaderCartButton({ onClick }) {
  const [btnHighlighted, setButtonHighlighted] = useState(false);
  const { items } = useContext(CartContext);
  console.log(items);

  const numberOfCartItems = items.reduce((total, item) => total + item.amount, 0)

  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`

  useEffect(() => {
      if(items.length === 0) return;
        setButtonHighlighted(true);

        const timer = setTimeout(() => setButtonHighlighted(false), 300);

        return () => {
            clearTimeout(timer);
        }
  }, [items])

  return (
      <button className={btnClasses} onClick={onClick}>
          <span className={classes.icon}>
              <CartIcon />
          </span>
          <span>
              Your Cart
          </span>
          <span className={classes.badge}>
              {numberOfCartItems}
          </span>
      </button>
  );
}

export default HeaderCartButton;
