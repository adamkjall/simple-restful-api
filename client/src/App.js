import React, { useEffect, useState } from "react";

import Card from "./components/card.jsx";
import Form from "./components/form.jsx";

import "tachyons";
import EditModal from "./components/edit.jsx";

function App() {
  const [members, setMembers] = useState([]);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080")
      .then((resp) => resp.json())
      .then((data) => setMembers(data));
  }, []);

  const addMember = (member) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: member.name,
        company: { catchPhrase: member.catchPhrase },
      }),
    };
    fetch("http://localhost:8080", requestOptions)
      .then((response) => response.json())
      .then((data) => setMembers(data));
  };

  const removeMember = (id) => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch("http://localhost:8080/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => setMembers(data));
  };

  const editMember = (member) => {
    setShowModal(false);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: member.name,
        company: { catchPhrase: member.catchPhrase },
      }),
    };
    if (memberToEdit) {
      fetch("http://localhost:8080/" + memberToEdit.id, requestOptions)
        .then((response) => response.json())
        .then((data) => setMembers(data));
    }
  };

  return (
    <div className="App flex flex-wrap">
      {showModal && (
        <EditModal>
          <Form
            handleSubmit={editMember}
            name={memberToEdit.name}
            catchPhrase={memberToEdit.company.catchPhrase}
          />
        </EditModal>
      )}
      <div className="Gallery mw7 pa2-ns flex flex-wrap justify-center">
        {members.map((member) => (
          <Card
            key={member.id}
            member={member}
            removeMember={() => removeMember(member.id)}
            editMember={() => {
              setShowModal(true);
              setMemberToEdit(member);
            }}
          />
        ))}
      </div>
      <Form handleSubmit={addMember} name="" catchPhrase="" />
    </div>
  );
}

export default App;
