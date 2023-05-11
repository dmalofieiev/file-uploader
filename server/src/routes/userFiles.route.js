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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFile = await File.destroy({ where: { id } });
    if (deletedFile) {
      res.json({ msg: "deleted" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
