import React, { useState } from "react";

const Form = ({ handleSubmit, name, catchPhrase }) => {
  const [inputs, setInputs] = useState({
    name: name,
    catchPhrase: catchPhrase,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = (event) => {
    event.preventDefault();
    handleSubmit({ name: inputs.name, catchPhrase: inputs.catchPhrase });
  };

  return (
    <article className="pa4 black-80">
      <form onSubmit={submit} acceptCharset="utf-8">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="name">
              Name
            </label>
            <input
              className="pa2 input-reset ba bg-transparent w-100 measure"
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={inputs.name}
            />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="catchPhrase">
              Catch phrase
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent"
              type="text"
              name="catchPhrase"
              id="catchPhrase"
              onChange={handleChange}
              value={inputs.catchPhrase}
            />
          </div>
        </fieldset>
        <div className="mt3">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </article>
  );
};

export default Form;
