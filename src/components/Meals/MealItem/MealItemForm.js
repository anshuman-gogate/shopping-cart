import React, { useRef, useState } from 'react';
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';

function MealItemForm({ id, onAddToCart }) {
  const inputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  function submitHandler(e) {
      e.preventDefault();
      const enteredAmount = inputRef.current.value;
      const enteredAmountNumber = +enteredAmount; // + converts string in number
      
      if(enteredAmount.trim().length === 0 || enteredAmountNumber > 10 || enteredAmountNumber < 1) {
          setAmountIsValid(false);
          return;
      }

      onAddToCart(enteredAmountNumber)
  }

  return (
      <form className={classes.form} onSubmit={submitHandler}>
          <Input label="Amount" ref={inputRef} input={{
              type: "number",
              id: 'amount_' + id,
              min: '1',
              max: '10',
              step: '1',
              defaultValue: '1'
          }}/>
          <button>+ add</button>
          {!amountIsValid && <p>Please enter a valid amount (1-10).</p>}
      </form>
  );
}

export default MealItemForm;
