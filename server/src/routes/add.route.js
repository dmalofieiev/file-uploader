const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    const file = req.file
      ? `/files/${req.file.filename}`
      : "/files/default.jpg";
    const { title } = req.body;
  } catch (error) {
    console.log("error: -------->", error);
  }
});

module.exports = router;
