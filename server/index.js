const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET
app.get("/", (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

// UPDATE
app.put("/:id", (req, res) => {
  let rawData = fs.readFileSync("./data.json");
  const members = JSON.parse(rawData);

  let member = members.find((member) => member.id === Number(req.params.id));
  const newMemberData = req.body;

  if (member) {
    member = {
      ...member,
      ...newMemberData,
    };

    const indexOfMember = members.findIndex(
      (member) => member.id === member.id
    );

    members[indexOfMember] = member;

    res.send(members);
    fs.writeFileSync("./data.json", JSON.stringify(members));
  }
});

// POST
app.post("/", (req, res) => {
  let rawData = fs.readFileSync("./data.json");
  const members = JSON.parse(rawData);
  const member = req.body;

  if (member) {
    members.push({
      id: calculateNextId(),
      ...member,
    });

    res.send(members);
    fs.writeFileSync("./data.json", JSON.stringify(members));
  }
});

// DELETE
app.delete("/:id", (req, res) => {
  let rawData = fs.readFileSync("./data.json");
  let members = JSON.parse(rawData);

  const memberToDelete = members.find(
    (member) => member.id === Number(req.params.id)
  );

  if (memberToDelete) {
    members = members.filter((member) => member.id !== memberToDelete.id);
    res.send(members);
    fs.writeFileSync("./data.json", JSON.stringify(members));
  } else {
    res.status(400).json({ msg: `No member with the id: ${req.params.id}` });
  }
});

const calculateNextId = () => {
  let rawData = fs.readFileSync("./data.json");
  const members = JSON.parse(rawData);
  if (members) {
    return (
      members.reduce((acc, member) => (acc < member.id ? member.id : acc), 0) +
      1
    );
  }
  return 0;
};

const PORT = 3000;

app.listen(PORT);
