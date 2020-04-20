import React from "react";

import MemberContextProvider from "./member-context/context-provider";
import ModalContextProvider from "./modal-context/context-provider";

const ApplicationContextProvider = (props) => (
  <MemberContextProvider>
    <ModalContextProvider>{props.children}</ModalContextProvider>
  </MemberContextProvider>
);

export default ApplicationContextProvider;
