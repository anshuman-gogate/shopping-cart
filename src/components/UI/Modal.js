import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css'

function Backdrop({ handleClose }) {
    return <div className={classes.backdrop} onClick={ handleClose } />
}

function ModalOverlay({ children }) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    );
}

const portalElement = document.getElementById('overlays');

function Modal({ children, handleClose }) {
  return (
      <>
        {ReactDOM.createPortal(<Backdrop handleClose={handleClose}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
      </>
  );
}

export default Modal;
