import { useState, useEffect } from "react";

import { useFetch } from "./useFetch";

const SERVER_URL = "http://localhost:8080";

export const useAPI = () => {
  const [members, setMembers] = useState([]);
  const [request, setRequest] = useState({
    url: SERVER_URL,
    options: {
      method: "GET",
    },
  });
  const [response, error, loading] = useFetch(request);

  useEffect(() => {
    if (!request || !response) return;

    const method = request.options.method;
    switch (method) {
      case "GET":
        setMembers(response);
        break;
      case "POST":
        setMembers((members) => [...members, response]);
        break;
      case "PUT":
        // const updatedMembers = members.map((member) => {
        //   if (member.id === response.id) return response;
        //   else return member;
        // });
        setMembers((members) =>
          members.map((member) => {
            if (member.id === response.id) return response;
            else return member;
          })
        );
        break;
      case "DELETE":
        // const filteredMembers = members.filter(
        //   (member) => member.id !== response.id
        // );
        setMembers((members) =>
          members.filter((member) => member.id !== response.id)
        );
        break;
      default:
        setMembers([]);
    }
  }, [response, request]);

  const getMembers = () => {
    setRequest({
      url: SERVER_URL,
      options: {
        method: "GET",
      },
    });
  };

  const getMember = (id) => {
    if (isNaN(id)) return;

    setRequest({
      url: SERVER_URL + "/" + id,
      options: {
        method: "GET",
      },
    });
  };

  const addMember = (member) => {
    if (!member) return;

    setRequest({
      url: SERVER_URL,
      options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: member.name,
          catchPhrase: member.catchPhrase,
        }),
      },
    });
  };

  const removeMember = (member) => {
    if (!member) return;

    setRequest({
      url: SERVER_URL + "/" + member.id,
      options: { method: "DELETE" },
    });
  };

  const editMember = (member) => {
    if (!member) return;

    setRequest({
      url: SERVER_URL + "/" + member.id,
      options: {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: member.name,
          catchPhrase: member.catchPhrase,
        }),
      },
    });
  };

  return {
    members,
    loading,
    error,
    getMembers,
    getMember,
    addMember,
    removeMember,
    editMember,
  };
};
