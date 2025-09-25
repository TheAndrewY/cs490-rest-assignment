const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
let data = [];

app.post("/users", (req, res) => {
  if (req.body.name == null || req.body.email == null) {
    res.status(400).json("Missing Email and/or Name");
  } else {
    const uuid = crypto.randomUUID();
    const createdUser = {
      id: uuid,
      name: req.body.name,
      email: req.body.email,
    };
    data.push(createdUser);
    res.status(201).json(createdUser);
  }
});

app.get("/users/:id", (req, res) => {
  const reqId = req.params.id;
  const user = data.find((user) => user.id === reqId);
  if (user == null) {
    res.status(404).json("User Not Found");
  } else {
    res.status(200).json(user);
  }
});

app.put("/users/:id", (req, res) => {
  const reqId = req.params.id;
  const user = data.find((user) => user.id === reqId);

  if (user == null) {
    res.status(404).json("User Doesnt Exist");
  } else if (req.body.name == null || req.body.email == null) {
    res.status(400).json("Missing Email and/or Name");
  } else {
    const index = data.findIndex((user) => user.id === reqId);
    if (index !== -1) {
      data.splice(index, 1);
    }
    user.name = req.body.name;
    user.email = req.body.email;
    data.push(user);
    res.status(200).json(user);
  }
});

app.delete("/users/:id", (req, res) => {
  const reqId = req.params.id;
  const index = data.findIndex((user) => user.id === reqId);
  if (index !== -1) {
    data.splice(index, 1);
    res.status(204).json();
  } else {
    res.status(404).json("No User found with that ID");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app; // Export the app for testing
