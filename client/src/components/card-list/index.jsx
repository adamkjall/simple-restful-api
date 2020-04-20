import React, { memo } from "react";
import { Link } from "react-router-dom";

import Card from "../card";

import "./styles.scss";

const CardList = ({ members }) => {
  if (!members || !members.length) return <h1>Loading...</h1>;

  return (
    <div className="card-list">
      {members.map((member) => (
        <Card key={member.id} member={member} />
      ))}
      <Link className="add-btn" to={"members/add"}>
        <span className="icon">+</span>
      </Link>
    </div>
  );
};

export default memo(CardList);
