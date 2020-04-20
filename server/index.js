const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

const filename = "./data.json";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET
app.get("/", async (req, res) => {
  fs.readFile(filename, (err, data) => {
    if (err) return res.status(400).send("Error reading file");
    const members = JSON.parse(data);
    res.send(members);
  });
});

// GET with id
app.get("/:id", (req, res) => {
  fs.readFile(filename, (err, data) => {
    if (err) return res.status(400).send("Error reading file");
    const members = JSON.parse(data);
    const memberToFind = members.find(
      (member) => member.id === Number(req.params.id)
    );

    if (!memberToFind) {
      return res
        .status(400)
        .send(`Member with id: ${req.params.id} not found.`);
    }

    res.send(memberToFind);
  });
});

// EDIT
app.put("/:id", (req, res) => {
  fs.readFile(filename, (err, data) => {
    if (err) return res.status(400).send("Error reading file");

    let updatedMember = null;
    let members = JSON.parse(data);

    members = members.map((member) => {
      if (member.id === Number(req.params.id)) {
        updatedMember = {
          ...member,
          ...req.body,
        };
        return updatedMember;
      }
      return member;
    });

    fs.writeFile(filename, JSON.stringify(members), (err) => {
      if (err) return res.status(400).send("Error writing to file");

      res.send(updatedMember);
    });
  });
});

// ADD
app.post("/", (req, res) => {
  fs.readFile(filename, (err, data) => {
    if (err) return res.status(400).send("Error reading file");

    const members = JSON.parse(data);
    const member = {
      id: calculateNextId(members),
      ...req.body,
      createdAt: new Date().toString(),
    };

    if (member) {
      members.push(member);

      fs.writeFile(filename, JSON.stringify(members), (err) => {
        if (err) return res.status(400).send("Error writing to file");

        res.send(member);
      });
    }
  });
});

// DELETE
app.delete("/:id", (req, res) => {
  fs.readFile(filename, (err, data) => {
    if (err) return res.status(400).send("Error reading file");

    let members = JSON.parse(data);
    const memberToDelete = members.find(
      (member) => member.id === Number(req.params.id)
    );

    if (!memberToDelete) {
      return res
        .status(400)
        .json({ msg: `No member with the id: ${req.params.id}` });
    }

    members = members.filter((member) => member.id !== memberToDelete.id);

    fs.writeFile(filename, JSON.stringify(members), (err) => {
      if (err) return res.status(400).send("Error writing to file");

      res.send(memberToDelete);
    });
  });
});

const calculateNextId = (members) => {
  return (
    members.reduce((acc, member) => (acc < member.id ? member.id : acc), 0) + 1
  );
};

const PORT = 8080;

app.listen(PORT);
