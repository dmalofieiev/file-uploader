const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

router.post("/register", async (req, res) => {
  const { user_name, email, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await User.findOrCreate({
    where: { email },
    defaults: { user_name, password: hashPass },
  });
  if (newUser[1]) {
    req.session.user = newUser[0];
    console.log("req.session: -------->", req.session);
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
      console.log(req.session);
      res.json({ msg: "Удача!" });
    } else {
      res.json({ msg: "Неверный пароль!" });
    }
  } else {
    res.json({ msg: "Такого юзера не существует" });
  }
});

module.exports = router;
