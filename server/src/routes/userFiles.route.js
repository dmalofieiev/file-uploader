const router = require("express").Router();
const { File } = require("../../db/models");
const fs = require("fs");
const path = require("path");

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
    const file = await File.findOne({ where: { id } });

    if (!file) {
      res.status(404).json({ msg: "File not found" });
      return;
    }

    const filePath = `fileStorage/${req.session.user.id}/${file.title}`;

    fs.unlinkSync(filePath);

    const deletedFile = await File.destroy({ where: { id } });
    if (deletedFile) {
      res.json({ msg: "File deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const file = await File.findOne({ where: { id } });
    const oldPath = `fileStorage/${req.session.user.id}/${file.title}`;

    const newFile = await file.update({ title });
    console.log(newFile);

    const newPath = `fileStorage/${req.session.user.id}/${newFile.title}`;

    fs.renameSync(oldPath, newPath);

    res.json({ msg: "Updated!" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/:id/download", async (req, res) => {
  const { id } = req.params;
  try {
    const file = await File.findOne({ where: { id } });
    const filePath = `fileStorage/${req.session.user.id}/${file.title}`;

    res.download(filePath);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
