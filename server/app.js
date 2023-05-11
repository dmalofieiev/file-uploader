require("dotenv").config();
require("@babel/register");
const cors = require("cors");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const express = require("express");
const dbCheck = require("./src/middlewares/dbCheck");

const authRouter = require("./src/routes/auth.route");
const addFileRouter = require("./src/routes/add.route");
const userFilesRouter = require("./src/routes/userFiles.route");

const app = express();
const PORT = process.env.PORT || 3000;

const sessionConfig = {
  name: "Cookie",
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? "Секретное слово",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};
app.use(session(sessionConfig));
app.use("/login", (req, res, next) => {
  console.log("session=>", req.session);
  next();
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dbCheck);
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3002"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/auth", authRouter);
app.use("/file", addFileRouter);
app.use("/userfiles", userFilesRouter);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
