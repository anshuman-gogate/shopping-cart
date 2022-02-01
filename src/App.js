import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [showCart, setShowCart] = useState(false);

  function handleShowCart() {
    setShowCart(true);
  }

  function handleHideCart() {
    setShowCart(false);
  }

  return (
    <CartProvider>
      {showCart && <Cart handleHideCart={handleHideCart}/>}
      <Header onClick={handleShowCart}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
