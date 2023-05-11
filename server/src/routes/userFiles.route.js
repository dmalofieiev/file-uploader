const router = require("express").Router();
const { File } = require("../../db/models");

router.get("/", async (req, res) => {
  const userId = req.session?.user?.id;
  try {
    const files = await File.findAll({ where: { userId }, raw: true });
    res.json(files);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
