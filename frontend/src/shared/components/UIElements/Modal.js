import React from "react";
import ReactDOM from "react-dom";
import Backdrops from "./Backdrops";
import { CSSTransition } from "react-transition-group";

const ModalOverlay = (props) => {
  const content = (
    <div
      className={
        props.delete
          ? "z-[100] fixed top-[22vh] left-[50%] transform -translate-x-1/2  w-[40%]  bg-white rounded-lg"
          : "z-[100] fixed top-5 lg:top-[22vh] left-[10%] w-[80%]  bg-white rounded-lg"
      }
    >
      <header className="w-full bg-purple-500 text-center rounded-t-lg ">
        <h2 className="p-1">{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div>{props.children}</div>
        <footer className="p-2 flex flex-row-reverse gap-1">
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrops onClick={props.onCancel} viewMap />}
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
