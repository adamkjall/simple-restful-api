import { createContext } from "react";

export default createContext({
  members: [],
  getMembers: () => {},
  getMember: () => {},
  addMember: () => {},
  removeMember: () => {},
  editMember: () => {},
});
