import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ModalContext from "./context";

const ModalContextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const history = useHistory();

  /**
   * Toggle the modal to show/hide, and also set memberToEdit
   * @param {boolean} showModal true for show, false for hide
   * @param {object} member member to edit
   */
  const toggleModal = (show, member = null) => {
    setShowModal(show);
    setMemberToEdit(member);
    if (!show) history.goBack();
  };

  return (
    <ModalContext.Provider
      value={{ showModal, toggleModal, memberToEdit }}
      {...props}
    />
  );
};

export default ModalContextProvider;
