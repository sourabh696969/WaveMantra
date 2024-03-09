const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
    },
    slugUrl: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaKeyword: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
