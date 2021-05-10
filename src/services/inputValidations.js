"use strict";

const mongoose = require("mongoose");
const EResponseValidate = require("../Enums/EResponseValidate");
const User = mongoose.model("users");

exports.emailAlreadyRegistered = async (email) => {
  const query = User.where({ email: email });
  const _user = await query.findOne();
  if (_user == null) return EResponseValidate.valid;
  return EResponseValidate.invalid;
};

exports.nameValidation = (name) => {
  if (name.length >= 3) return EResponseValidate.valid;
  return EResponseValidate.invalid;
};

exports.emailValidation = (email) => {
  const regex = /\S+@\S+\.\S+/;

  if (regex.test(email)) return EResponseValidate.valid;

  return EResponseValidate.invalid;
};

exports.passwordValidation = (password) => {
    if(password.length > 5) return EResponseValidate.valid;
    return EResponseValidate.invalid;
}
