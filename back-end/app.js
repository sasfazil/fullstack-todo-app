const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const bcrypt = require("bcryptjs");
const { format } = require("date-fns");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "todo.db");

const corsOptions = {
  origin: "https://todobyfazil.netlify.app", // Replace with your frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

let db = null;

const intializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => console.log("Server Running...."));
  } catch (err) {
    console.log(`DB error ${err.message}`);
  }
};

intializeDBandServer();

const authenticationToken = (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401);
    res.send("Invalid JWT token");
  } else {
    jwt.verify(jwtToken, "SECRET_CODE", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        req.username = payload.username;
        next();
      }
    });
  }
};

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userQuery = `SELECT * FROM users WHERE username = '${username}'`;
  const userDb = await db.get(userQuery);
  if (userDb === undefined) {
    res.status(400);
    res.send("Invalid user");
  } else {
    const comparePassword = await bcrypt.compare(password, userDb.password);
    if (comparePassword) {
      const payload = { username: username };
      const jwtToken = jwt.sign(payload, "SECRET_CODE");
      res.send({ jwtToken });
    } else {
      res.status(400);
      res.send(`Invalid password`);
    }
  }
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const userNameQuery = `SELECT * FROM users WHERE username='${username}'`;
  const userMailQuery = `SELECT * FROM users WHERE email='${email}'`;
  const userNameDb = await db.get(userNameQuery);
  const userMailDb = await db.get(userMailQuery);
  if (userNameDb === undefined && userMailDb === undefined) {
    const bcryptPwd = await bcrypt.hash(password, 10);
    const newUserQuery = `INSERT INTO users(id,username,email,password) VALUES ('${uuidv4()}','${username}'
    ,'${email}','${bcryptPwd}')`;
    await db.run(newUserQuery);
    const payload = { username: username };
    const jwtToken = jwt.sign(payload, "SECRET_CODE");
    res.send({ jwtToken });
  } else {
    res.status(409);
    res.send("user already exists...");
  }
});

// get tasks data

app.get("/", authenticationToken, async (req, res) => {
  const { username } = req;
  const userQuery = `SELECT * FROM users WHERE username='${username}'`;
  const getUserDb = await db.get(userQuery);
  const tasksQuery = `
    SELECT *
    FROM tasks
    WHERE userId = '${getUserDb.id}'
  `;
  const tasksDb = await db.all(tasksQuery);
  res.send([{ username: username, email: getUserDb.email }, tasksDb]);
});

app.post("/addtask", authenticationToken, async (req, res) => {
  const { title, description, status } = req.body;
  const { username } = req;
  const userQuery = `SELECT * FROM users WHERE username='${username}'`;
  const getUserDb = await db.get(userQuery);

  const presentDate = format(new Date(), "EEE do MMM yyyy");
  const taskQuery = `
    INSERT INTO tasks(id,userId,title,description,status,createdDate)
    VALUES (
    '${uuidv4()}',
    '${getUserDb.id}',
    '${title}',
    '${description}',
    '${status}',
    '${presentDate}'
    )
  `;
  await db.run(taskQuery);
  res.send("task updated successfully");
});

app.put("/updatetask/:id", authenticationToken, async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  const taskQuery = `
    UPDATE tasks
    SET 
    title = '${title}',
    description = '${description}',
    status = '${status}'
    WHERE id = '${id}';
  `;
  await db.run(taskQuery);
  res.send("task updated successfully");
});

app.delete("/deletetask/:id", authenticationToken, async (req, res) => {
  const { id } = req.params;
  const taskQuery = `
    DELETE FROM
      tasks
    WHERE
      id = "${id}"
  `;
  await db.run(taskQuery);
  res.send("task deleted");
});

app.put("/updateuser/", authenticationToken, async (req, res) => {
  const { newUsername, email, password } = req.body;
  const { username } = req;

  const userNameQuery = `SELECT * FROM users WHERE username='${newUsername}'`;
  const oldUserQuery = `SELECT * FROM users WHERE username='${username}'`;
  const userMailQuery = `SELECT * FROM users WHERE email='${email}'`;

  const userNameDb = await db.get(userNameQuery);
  const oldUserDb = await db.get(oldUserQuery);
  const userMailDb = await db.get(userMailQuery);
  if (
    (userNameDb === undefined || oldUserDb.username === newUsername) &&
    (userMailDb === undefined || oldUserDb.email === email)
  ) {
    const bcryptPwd = await bcrypt.hash(password, 10);
    const newUserQuery = `UPDATE users SET 
    username = '${newUsername}',
    email = '${email}',
    password = '${bcryptPwd}'
    WHERE username = '${username}';`;
    await db.run(newUserQuery);
    const payload = { username: newUsername };
    const jwtToken = jwt.sign(payload, "SECRET_CODE");
    res.send({ jwtToken });
  } else {
    res.status(409);
    res.send(`user already exists... ${username}`);
  }
});

module.exports = app;
