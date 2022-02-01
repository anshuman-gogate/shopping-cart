import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    amount: 0
}

// Always update state in immutable way
function cartReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            {
                const index = state.items.findIndex(item => item.id === action.item.id);
                const existingCartItem = state.items[index];
                let updatedItems = [];

                if (existingCartItem) {
                    const updatedItem = {
                        ...existingCartItem,
                        amount: existingCartItem.amount + action.item.amount
                    }

                    updatedItems = [...state.items];
                    updatedItems[index] = updatedItem
                }
                else {
                    updatedItems = state.items.concat(action.item); // concat returns a new array
                }
                const updatedTotalAmount = state.amount + (action.item.price * action.item.amount)
                return {
                    items: updatedItems,
                    amount: updatedTotalAmount
                }
            }
        
        case 'REMOVE' :
            {
                const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
                const existingCartItem = state.items[existingCartItemIndex];
                const updatedTotalAmount = state.amount - existingCartItem.price;
                let updatedItems;
                
                if (existingCartItem.amount === 1) {
                    updatedItems = state.items.filter(item => item.id !== action.id);
                } else {
                    const updatedItem = {
                        ...existingCartItem,
                        amount: existingCartItem.amount-1
                    }
                    updatedItems = [...state.items];
                    updatedItems[existingCartItemIndex] = updatedItem
                }

                return {
                    items: updatedItems,
                    amount: updatedTotalAmount
                }
            }

        default :
            return state
    }
}

function CartProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  function addItemToCartHandler (item) {
      dispatchCartAction({ type: 'ADD', item: item })
  }

  console.log(cartState.items)

  function removeItemFromCartHandler (id) {
      dispatchCartAction({ type: 'REMOVE', id: id })
  }

  const cartContext = {
      items: cartState.items,
      totalAmount: cartState.amount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler
  }

  return (
      <CartContext.Provider value={cartContext}>
          { children }
      </CartContext.Provider>
  );
}

export default CartProvider;
