import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAPI } from "../../hooks/useAPI";

import "./styles.scss";

const MemberDetails = () => {
  const { id } = useParams();
  const { members: member, getMember, loading } = useAPI();

  useEffect(() => {
    getMember(id);
  }, [id, getMember]);

  if (loading || !member) return <h1>Loading... </h1>;

  return (
    <div className="member-details">
      <img src={"https://robohash.org/" + member.id} alt="member profile" />
      <div className="content">
        <h3 className="name">{member.name}</h3>
        <p className="catch-phrase">{member.catchPhrase}</p>
      </div>
    </div>
  );
};

export default MemberDetails;
