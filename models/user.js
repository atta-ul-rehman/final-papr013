var mongoose = require("mongoose");
const Joi = require("joi");


var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
function validateUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(10).required(),
    password: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
const User = mongoose.model("User", UserSchema);
module.exports = User;
module.exports.validate = validateUser; //for sign up
module.exports.validateUserLogin = validateUserLogin; 
