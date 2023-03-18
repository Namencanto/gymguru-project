const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    unique: true,
    default: "",
  },
  gender: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
    default: "John",
  },
  surname: {
    type: String,
    required: false,
    default: "Doe",
  },
  avatar: {
    type: String,
    required: false,
    default: "https://static.thenounproject.com/png/4035892-200.png",
  },
  todoList: [{ itemText: String, checkedOff: String, deleted: String }],

  date: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //do not reveal passwordHash
    delete returnedObject.password;
  },
});

UserSchema.plugin(uniqueValidator, { message: "Email already in use." });

const User = mongoose.model("user", UserSchema);
module.exports = User;
