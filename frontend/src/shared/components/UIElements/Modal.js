import React from "react";
import ReactDOM from "react-dom";
import Backdrops from "./Backdrops";
import { CSSTransition } from "react-transition-group";

const ModalOverlay = (props) => {
  const content = (
    <div className="">
      <header className="">
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className="">{props.children}</div>
        <footer className="">{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrops onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
