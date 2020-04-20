import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import MemberContext from "../../contexts/member-context/context";

import "./styles.scss";

const Form = () => {
  const [inputs, setInputs] = useState({
    name: "",
    catchPhrase: "",
  });
  const [memberToEdit, setMemberToEdit] = useState(null);
  const { addMember, editMember } = useContext(MemberContext);
  const { mode, id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (mode === "add") return;
    fetch("http://localhost:8080/" + id)
      .then((res) => res.json())
      .then((data) => setMemberToEdit(data));
  }, [id]);

  useEffect(() => {
    if (mode === "add" || !memberToEdit) return;
    setInputs({
      name: memberToEdit.name || "",
      catchPhrase: memberToEdit.catchPhrase || "",
    });
  }, [memberToEdit, mode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = (event) => {
    event.preventDefault();
    const member = {
      name: inputs.name,
      catchPhrase: inputs.catchPhrase,
    };

    if (!inputs.name.length || !inputs.catchPhrase.length) return;

    if (mode === "edit") {
      editMember({ id, ...member });
    } else {
      addMember(member);
    }

    history.goBack();
  };

  return (
    <form className="form" onSubmit={submit} acceptCharset="utf-8">
      <h1>{mode === "edit" ? "Edit robot" : "Add robot"}</h1>
      <div className="row">
        <label className="" htmlFor="name">
          Name:
        </label>
        <input
          className="input"
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={inputs.name}
        />
      </div>
      <div className="row">
        <label className="" htmlFor="catchPhrase">
          Catch phrase:
        </label>
        <textarea
          className="input"
          name="catchPhrase"
          id="catchPhrase"
          rows="6"
          cols="40"
          onChange={handleChange}
          value={inputs.catchPhrase}
        />
      </div>

      <div className="row">
        <input className="submit" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Form;
