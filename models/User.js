const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters long"],
    required: [true, "Please provide a password"],
    validate: {
      validator: function (value) {
        // Regular expression to check for at least one uppercase, one lowercase, and one digit
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(value);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
    },
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  website: {
    type: String,
  },
  place: {
    type: String,
  },
  age: {
    type: Number,
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
