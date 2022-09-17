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

/**
 *  Here we are creating and setting an id property and 
    removing _id, __v, and the password hash which we do not need 
    to send back to the client.
 */
UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //do not reveal passwordHash
    delete returnedObject.password;
  },
});

/**
 * 1. The userSchema.plugin(uniqueValidator) method won’t let duplicate email id to be stored in the database.
 * 2. The unique: true property in email schema does the internal optimization to enhance the performance.
 */
UserSchema.plugin(uniqueValidator, { message: "Email already in use." });

const User = mongoose.model("user", UserSchema);
module.exports = User;
