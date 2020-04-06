import React from "react";

const EditModal = (props) => {
  return (
    <article className="mw7 center ph3 ph5-ns tc br2 pv5 bg-washed-green dark-green mb5">
      <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
        This is a tagline. For x.
      </h1>
      {props.children}
    </article>
  );
};

export default EditModal;
