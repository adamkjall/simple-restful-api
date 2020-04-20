import React, { useContext, useEffect, useCallback, useRef } from "react";

import ModalContext from "../../contexts/modal-context/context";

import "./styles.scss";

const Modal = (props) => {
  const { toggleModal } = useContext(ModalContext);
  const ref = useRef(null);

  const clickListener = useCallback(
    (event) => {
      if (!ref.current.contains(event.target)) toggleModal(false);
    },
    [ref]
  );

  const escapeListener = useCallback((event) => {
    if (event.key === "Escape") toggleModal(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", clickListener);
    document.addEventListener("keyup", escapeListener);

    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keyup", escapeListener);
    };
  }, []);

  return (
    <article className="modal">
      <div className="container" ref={ref}>
        <div className="header">
          <span className="close" onClick={() => toggleModal(false)}>
            X
          </span>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </article>
  );
};

export default Modal;
