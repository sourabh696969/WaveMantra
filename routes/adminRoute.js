const express = require("express");
const uploadToCloudinary = require("../middleware/uploadToCloudnary");
const { registerAdmin, loginAdmin, forgotPasswordAdmin } = require("../controllers/adminController");

const router = express.Router();

///// POST Routes /////
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

///// PUT & PATCH Routes /////
router.put("/forgotPassword", forgotPasswordAdmin);

///// GET Routes /////

///// DELETE Routes /////

module.exports = router;
