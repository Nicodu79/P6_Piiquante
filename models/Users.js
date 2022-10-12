const mongoose = require("mongoose");
const { isEmail } = require("validator");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email : { type : String, required : true, validate: [isEmail], unique : true},
    password : { type : String, minLength : 6, required : true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", userSchema);