import React, { useContext, memo } from "react";
import { useHistory, Link } from "react-router-dom";

import MemberContext from "../../contexts/member-context/context";

import "./styles.scss";

const Card = ({ member }) => {
  const { removeMember } = useContext(MemberContext);
  const history = useHistory();

  return (
    <article className="card">
      <div
        className="card-content"
        onClick={() => {
          history.push("member/" + member.id);
        }}
      >
        <div className="img-container">
          <img src={"https://robohash.org/" + member.id} alt="member profile" />
        </div>

        <h3 className="name">{member.name}</h3>
        <p className="catch-phrase">{member.catchPhrase}</p>
      </div>
      <div className="btn-container">
        <Link className="btn" to={"members/edit/" + member.id}>
          Edit
        </Link>
        <span className="divider"></span>

        <button className="btn" onClick={() => removeMember(member)}>
          Remove
        </button>
      </div>
    </article>
  );
};

export default memo(Card);
