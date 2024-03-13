const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");

const createBlog = asyncHandler(async (req, res) => {
  const {
    blogTitle,
    slugUrl,
    metaTitle,
    metaKeyword,
    metaDescription,
    description,
  } = req.body;

  if (
    (!blogTitle,
    !slugUrl,
    !metaDescription,
    !metaKeyword,
    !metaTitle,
    !metaDescription,
    !description)
  ) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;

  const blog = await Blog.create({
    blogTitle,
    slugUrl,
    metaDescription,
    metaTitle,
    metaKeyword,
    description,
    image,
  });

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json({ message: "Blog created successfully!" });
});

const updateBlog = asyncHandler(async (req, res) => {
  const {
    blogTitle,
    slugUrl,
    metaTitle,
    metaKeyword,
    metaDescription,
    description,
  } = req.body;
  const blogId = req.params.id;

  if (
    (!blogTitle,
    !slugUrl,
    !metaDescription,
    !metaKeyword,
    !metaTitle,
    !metaDescription,
    !description)
  ) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;
  const blogImage = await Blog.findById(blogId);

  const blog = await Blog.findByIdAndUpdate(blogId, {
    blogTitle,
    slugUrl,
    metaDescription,
    metaTitle,
    metaKeyword,
    description,
    image: image == null ? blogImage.image : image,
  });

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json({ message: "Blog updated successfully!" });
});

const getAllBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().select(
    "image blogTitle status updatedAt createdAt"
  );

  if (blogs.length === 0) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  // Get total blogs created in this month
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const blogsThisMonth = await Blog.find({
    createdAt: {
      $gte: new Date(currentYear, currentMonth - 1, 1),
      $lt: new Date(currentYear, currentMonth, 1),
    },
  }).countDocuments();

  // Get total blogs created today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const blogsToday = await Blog.find({
    createdAt: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  }).countDocuments();

  const response = {
    blogs,
    blogsThisMonth,
    blogsToday,
  };

  res.status(200).json(response);
});

const getSingleBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json(blog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findByIdAndDelete(blogId);

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json({ message: "Blog deleted successfully!" });
});

const updateBlogStatus = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const { status } = req.body;

  if (status === undefined || status === null || status === "") {
    res.status(404);
    throw new Error("All fields required!");
  }

  const blog = await Blog.findByIdAndUpdate(blogId, {
    status,
  });

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  res.status(200).json({ message: "Blog Status Updated successfully!" });
});

module.exports = {
  createBlog,
  updateBlog,
  getAllBlog,
  getSingleBlog,
  deleteBlog,
  updateBlogStatus,
};
