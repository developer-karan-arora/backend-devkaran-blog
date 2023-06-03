let mongoose = require("mongoose");
let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    userImage: {
      type: String,
      required: true,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-A4JS9aARS6AERDVncZQHGeu8Zn3-Uzctw&usqp=CAU"
    }
  },
  {timestamps: true}
);
module.exports = mongoose.model("USER", userSchema);
