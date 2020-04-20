import { createContext } from "react";

export default createContext({
  showModal: false,
  toggleModal: () => {},
  memberToEdit: {},
});
