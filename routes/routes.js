const express = require("express");
const router = express.Router();

router.use("/admin", require("./adminRoute"));
router.use("/blog", require("./blogRoute"));

module.exports = router;
