const express = require("express");
const uploadToCloudinary = require("../middleware/uploadToCloudnary");
const { createBlog, updateBlog, getAllBlog, getSingleBlog, deleteBlog, updateBlogStatus } = require("../controllers/blogController");

const router = express.Router();

router.post("/create", uploadToCloudinary("image"), createBlog);
router.put("/update/:id", uploadToCloudinary("image"), updateBlog);
router.get("/all", getAllBlog);
router.get("/:id", getSingleBlog);
router.delete("/:id", deleteBlog);
router.patch("/status/:id", updateBlogStatus);

module.exports = router;
