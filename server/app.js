require("dotenv").config();
require("@babel/register");
const cors = require('cors')
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const session = require("express-session");
// const cors = require("./src/middlewares/cors");

const FileStore = require("session-file-store")(session);

const express = require("express");

const dbCheck = require("./src/middlewares/dbCheck");

const authRouter = require("./src/routes/auth.route");

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
// app.use(cors());
// app.use(cors({
//   origin: [
//     "http://localhost:3003",
//     "http://localhost:3000",
//     "http://localhost:3001",
//     "http://localhost:3002",
//   ],
//   credentials: true,
// }))
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions))

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
