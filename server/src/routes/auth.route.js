const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

router.get("/", (req, res) => {
  console.log(" session =>", req.session);
  res.json({ user: req.session?.user || "" });
});

router.post("/register", async (req, res) => {
  const { user_name, email, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await User.findOrCreate({
    where: { email },
    defaults: { user_name, password: hashPass },
  });
  if (newUser[1]) {
    req.session.user = newUser[0];
    req.session.save();
    res.json({ msg: "Пользователь зарегистрирован" });
  } else {
    res.json({ msg: "Пользователь уже существует" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
    plain: true,
  });
  if (user) {
    const passCheck = await bcrypt.compare(password, user.password);
    if (passCheck) {
      req.session.user = user;
      res.json({ msg: "Удача!" });
    } else {
      res.json({ msg: "Неверный пароль!" });
    }
  } else {
    res.json({ msg: "Такого юзера не существует" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("Cookie");
    res.json({ user: "" });
  });
});

module.exports = router;
