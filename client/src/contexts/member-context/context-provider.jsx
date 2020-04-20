// @flow
import React from "react";

import MemberContext from "./context";
import { useAPI } from "../../hooks/useAPI";

const MemberContextProvider = (props) => {
  const {
    members,
    loading,
    error,
    getMembers,
    getMember,
    addMember,
    removeMember,
    editMember,
  } = useAPI();

  return (
    <MemberContext.Provider
      value={{
        members,
        loading,
        error,
        getMembers,
        getMember,
        addMember,
        removeMember,
        editMember,
      }}
      {...props}
    />
  );
};

export default MemberContextProvider;
