import React from 'react';
import mealImage from '../../assets/meals.jpg';
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

function Header({ onClick }) {
  return (
      <>
        <header className={classes.header}>
            <h1>Meals App</h1>
            <HeaderCartButton onClick={onClick}/>
        </header>

        <div className={classes['main-image']}>
            <img src={mealImage} alt="banner of the application" />
        </div>
      </>
  );
}

export default Header;
