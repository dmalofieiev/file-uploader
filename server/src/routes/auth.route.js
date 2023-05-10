const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

router.post("/register", async (req, res) => {
  console.log("$$$$$$$$$$$$$");
  const { user_name, email, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await User.findOrCreate({
    where: { email },
    defaults: { user_name, password: hashPass },
  });
  console.log("^^^^^^^newUser^^^^^^^", newUser);
  if (newUser[1]) {
    req.session.user = newUser[0];
    res.json({ msg: "Пользователь зарегистрирован" });
  } else {
    res.json({ msg: "Пользователь уже существует" });
  }
});

module.exports = router;
