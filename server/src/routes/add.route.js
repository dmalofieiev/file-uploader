const router = require("express").Router();
const { File } = require("../../db/models");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userDirectory = `fileStorage/${req.session.user.id}`; // create a directory named after the user
    fs.mkdirSync(userDirectory, { recursive: true }); // create the directory if it does not exist
    cb(null, userDirectory);
    // cb(null, `fileStorage/${req.session.user.id}`);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    console.log(req.session.user);

    const newFile = await File.create({
      title: file.originalname,
      file_size: file.size.toString(),
      file_link: `fileStorage/${req.session.user.id}/${file.filename}`,
      userId: req.session.user.id,
    });

    res.json(newFile);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
