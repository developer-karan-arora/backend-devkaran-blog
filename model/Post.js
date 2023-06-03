const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  shortdesc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: false,
  },
  likeArray: {
    type: Array,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});
module.exports = mongoose.model("post", postSchema);
