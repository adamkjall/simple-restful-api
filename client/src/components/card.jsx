import React from "react";

const Card = ({ member, removeMember, editMember }) => (
  <article className="bg-white bg-light-green pointer grow shadow-2 br3 pa2-ns ma3 ba b--black-10 w-50 w-25-m w-25-l">
    <div className="flex flex-column justify-between h-100">
      <img
        src={"https://robohash.org/" + member.name}
        className="br-100 dib"
        title="Photo of a kitty staring at you"
      />
      <h1 className="f4 tc center">{member.name}</h1>
      <p className="lh-copy tc f6 black-70 self-end ">
        {member.company.catchPhrase}
      </p>
      <div className="flex justify-center h-auto">
        <a
          className="f6 link dim br2 ph2 pv1 mb2 dib white bg-blue"
          onClick={editMember}
        >
          Edit
        </a>
        <a
          className="f6 link dim br2 ph2 pv1 mb2 dib white bg-red"
          onClick={removeMember}
        >
          Remove
        </a>
      </div>
    </div>
  </article>
);

export default Card;
